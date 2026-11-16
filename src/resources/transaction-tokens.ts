import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import {
  enableTokenThreeDsRequestInternalSchema,
  type EnableTokenThreeDsRequest,
} from "../models/enable-token-three-ds-request.js";
import { modeQuerySchema, type ModeQuery } from "../models/mode-query.js";
import {
  threeDsIssuerTokenInternalSchema,
  type ThreeDsIssuerToken,
} from "../models/three-ds-issuer-token.js";
import {
  TransactionTokenActiveFilter,
  transactionTokenActiveFilterSchema,
} from "../models/transaction-token-active-filter.js";
import {
  transactionTokenCreateRequestInternalSchema,
  type TransactionTokenCreateRequest,
} from "../models/transaction-token-create-request.js";
import {
  transactionTokenListTypeSchema,
  type TransactionTokenListType,
} from "../models/transaction-token-list-type.js";
import { transactionTokenListSchema, type TransactionTokenList } from "../models/transaction-token-list.js";
import {
  transactionTokenUpdateRequestSchema,
  type TransactionTokenUpdateRequest,
} from "../models/transaction-token-update-request.js";
import { transactionTokenInternalSchema, type TransactionToken } from "../models/unions/transaction-token.js";
import type { Servers } from "../servers.js";

/**
 * 消費者の決済情報（カード、コンビニ、QR）を安全に保存・管理するためのエンドポイント。
 */
export class TransactionTokens {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * トランザクション・トークンの作成
   *
   * @remarks
   * 生の決済データを安全なトークンと交換します。生のカード番号を送信する場合は、**PCI DSS への準拠が必須**です。
   *
   * @returns トークン作成完了
   *
   * @throws {@link TransactionTokens.CreateTransactionTokenError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createTransactionToken(
    request: TransactionTokens.CreateTransactionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, TransactionTokens.CreateTransactionTokenError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/tokens"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: transactionTokenCreateRequestInternalSchema },
      },
      {
        success: { kind: "json", schema: transactionTokenInternalSchema },
        errorFactory: TransactionTokens.CreateTransactionTokenError,
      },
      options,
    );
  }

  /**
   * トランザクション・トークンの削除
   *
   * @remarks
   * 特定のトランザクション・トークンを削除します。⚠️ **警告: リンクされている定期課金への影響**
   * トランザクション・トークンを削除すると、そのトークンにリンクされている継続課金や定期課金の処理が即座に行えなくなります。十分にご注意の上、実行してください。
   *
   * @returns トークンは正常に削除されました。コンテンツなし。
   *
   * @throws {@link TransactionTokens.DeleteTransactionTokenError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  deleteTransactionToken(
    request: TransactionTokens.DeleteTransactionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, TransactionTokens.DeleteTransactionTokenError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: TransactionTokens.DeleteTransactionTokenError,
      },
      options,
    );
  }

  /**
   * リカーリングトークンの 3DS 無効化
   *
   * @remarks
   * 既存の継続（recurring）トランザクション・トークンに対して3Dセキュアを無効化します。`recurring` トークンにのみ適用されます。
   *
   * @returns 3DS の無効化に成功しました。更新されたトークンを返します。
   *
   * @throws {@link TransactionTokens.DisableTokenThreeDsError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  disableTokenThreeDs(
    request: TransactionTokens.DisableTokenThreeDsRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, TransactionTokens.DisableTokenThreeDsError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens/{id}/three_ds"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: transactionTokenInternalSchema },
        errorFactory: TransactionTokens.DisableTokenThreeDsError,
      },
      options,
    );
  }

  /**
   * リカーリングトークンの 3DS 有効化
   *
   * @remarks
   * 3DS なしで作成された既存の継続（recurring）トランザクション・トークンに対して3Dセキュアを有効化します。`recurring` トークンにのみ適用され、すでに 3DS
   * が有効な場合はエラーを返します。このエンドポイントを呼び出した後、トークンをポーリングして `data.three_ds.status` が `awaiting` になるのを待ち、トークン
   * 3DS イシュアートークンエンドポイントを使用して認証を完了してください。
   *
   * @returns 3DS の有効化に成功しました。更新されたトークンを返します。
   *
   * @throws {@link TransactionTokens.EnableTokenThreeDsError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  enableTokenThreeDs(
    request: TransactionTokens.EnableTokenThreeDsRequestParams,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, TransactionTokens.EnableTokenThreeDsError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens/{id}/three_ds"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => enableTokenThreeDsRequestInternalSchema)),
        },
      },
      {
        success: { kind: "json", schema: transactionTokenInternalSchema },
        errorFactory: TransactionTokens.EnableTokenThreeDsError,
      },
      options,
    );
  }

  /**
   * 3Dセキュアイシュアートークンの取得 (リカーリングトークン)
   *
   * @remarks
   * 継続（recurring）用のトランザクション・トークンを作成する際に、3Dセキュア認証を実行するために必要な情報を取得します。**⚠️ 重要な注意点:** 1. **PCI DSS
   * 準拠:** このエンドポイントは、API 経由で直接生のカードデータを送信してトークンを作成することを許可されている、PCI DSS に準拠した加盟店のみが利用できます。 2.
   * **対象トークン:** これは `type` が `recurring`（継続用）のトークンにのみ適用されます。`one_time`（ワンタイム）や
   * `subscription`（定期課金専用）のトークンについては、トークン作成時ではなく課金作成時に3Dセキュアがリクエストされます。 3. **実行フロー:** -
   * トークンを作成した後、トークンオブジェクトをポーリングし、`data.three_ds.status` が `awaiting` になるまで待ちます。 - `awaiting`
   * になったら、このエンドポイントを使用してイシュアートークンの詳細を取得します。 - 返された `payload` を `content_type` に合わせて（例：URL
   * エンコード形式に）フォーマットし、消費者のブラウザから `issuer_token` の URL に対して `http_post` リクエストを実行します。
   *
   * @returns 3Dセキュア認証の詳細が正常に取得されました。
   *
   * @throws {@link TransactionTokens.GetTokenThreeDsIssuerTokenError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getTokenThreeDsIssuerToken(
    request: TransactionTokens.GetTokenThreeDsIssuerTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<ThreeDsIssuerToken, TransactionTokens.GetTokenThreeDsIssuerTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens/{id}/three_ds/issuer_token"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: threeDsIssuerTokenInternalSchema },
        errorFactory: TransactionTokens.GetTokenThreeDsIssuerTokenError,
      },
      options,
    );
  }

  /**
   * トークン詳細の取得 - 3DS ステータスの確認
   *
   * @remarks
   * 既存のトランザクション・トークンの詳細を取得します。
   *
   * @returns トークンの詳細
   *
   * @throws {@link TransactionTokens.GetTransactionTokenError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getTransactionToken(
    request: TransactionTokens.GetTransactionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, TransactionTokens.GetTransactionTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [{ name: "polling", value: request.polling, schema: s.optional(s.boolean()) }],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: transactionTokenInternalSchema },
        errorFactory: TransactionTokens.GetTransactionTokenError,
      },
      options,
    );
  }

  /**
   * トークン一覧の取得 (全店舗)
   *
   * @remarks
   * すべての店舗にわたるすべてのトランザクション・トークンの一覧を取得します。
   *
   * @returns トークンのリスト
   *
   * @throws {@link TransactionTokens.ListAllTransactionTokensError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listAllTransactionTokens(
    request: TransactionTokens.ListAllTransactionTokensRequest = {},
    options?: RequestOptions,
  ): ApiPromise<TransactionTokenList, TransactionTokens.ListAllTransactionTokensError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/tokens"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [
          { name: "search", value: request.search, schema: s.optional(s.string()) },
          { name: "customer_id", value: request.customerId, schema: s.optional(s.string()) },
          {
            name: "type",
            value: request.type,
            schema: s.optional(s.lazy(() => transactionTokenListTypeSchema)),
          },
          { name: "mode", value: request.mode, schema: s.optional(s.lazy(() => modeQuerySchema)) },
          {
            name: "active",
            value: request.active,
            schema: s.defaulted(transactionTokenActiveFilterSchema, TransactionTokenActiveFilter.Active),
          },
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: transactionTokenListSchema },
        errorFactory: TransactionTokens.ListAllTransactionTokensError,
      },
      options,
    );
  }

  /**
   * トークン一覧の取得 (特定の店舗)
   *
   * @remarks
   * 特定の店舗のすべてのトランザクション・トークンの一覧を取得します。
   *
   * @returns トークンのリスト
   *
   * @throws {@link TransactionTokens.ListStoreTransactionTokensError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listStoreTransactionTokens(
    request: TransactionTokens.ListStoreTransactionTokensRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionTokenList, TransactionTokens.ListStoreTransactionTokensError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [
          { name: "search", value: request.search, schema: s.optional(s.string()) },
          { name: "customer_id", value: request.customerId, schema: s.optional(s.string()) },
          {
            name: "type",
            value: request.type,
            schema: s.optional(s.lazy(() => transactionTokenListTypeSchema)),
          },
          { name: "mode", value: request.mode, schema: s.optional(s.lazy(() => modeQuerySchema)) },
          {
            name: "active",
            value: request.active,
            schema: s.defaulted(transactionTokenActiveFilterSchema, TransactionTokenActiveFilter.Active),
          },
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: transactionTokenListSchema },
        errorFactory: TransactionTokens.ListStoreTransactionTokensError,
      },
      options,
    );
  }

  /**
   * トランザクション・トークンの更新 (レガシー)
   *
   * @remarks
   * ⚠️ **レガシー警告: 非推奨の操作**
   * 技術的にはトランザクション・トークンを更新することは可能ですが、この運用は強く非推奨とされており、過去の互換性（レガシーな理由）のためだけに維持されています。**生のカード詳細を更新するには、サーバー環境が完全に
   * PCI DSS に準拠している必要があります。****推奨されるアプローチ:** 既存のトークンを更新する代わりに、Univapay
   * のフロントエンド統合機能（**リンクフォーム**、**ウィジェット**、または**インラインフォーム**）を使用して、完全に新しいトランザクション・トークンを作成するのがベストプラクティスです。これにより、お客様の決済データが貴社のサーバーを一切通過することなく、Univapay
   * が安全に処理できます。--- **レガシーな使用方法:** CVV、住所、メールアドレス、またはカードの詳細を更新します。*注意:
   * `RECURRING_USAGE_REQUIRES_CVV` エラーを解消するために CVV のみを更新する場合、アプリケーション・トークンのシークレットは不要です。*
   *
   * @returns トークンの更新に成功しました
   *
   * @throws {@link TransactionTokens.UpdateTransactionTokenError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateTransactionToken(
    request: TransactionTokens.UpdateTransactionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, TransactionTokens.UpdateTransactionTokenError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/tokens/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => transactionTokenUpdateRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: transactionTokenInternalSchema },
        errorFactory: TransactionTokens.UpdateTransactionTokenError,
      },
      options,
    );
  }
}

export namespace TransactionTokens {
  export type CreateTransactionTokenRequest = {
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** トランザクション・トークン作成用のリクエスト・ペイロード。 */
    body: TransactionTokenCreateRequest;
  };

  export class CreateTransactionTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateTransactionTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type DeleteTransactionTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class DeleteTransactionTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<DeleteTransactionTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type DisableTokenThreeDsRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class DisableTokenThreeDsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<DisableTokenThreeDsError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type EnableTokenThreeDsRequestParams = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 任意のリクエスト・ペイロード。リダイレクトが不要な場合は、本文全体、または `redirect_endpoint` を省略してください。 */
    body?: EnableTokenThreeDsRequest;
  };

  export class EnableTokenThreeDsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<EnableTokenThreeDsError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetTokenThreeDsIssuerTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class GetTokenThreeDsIssuerTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetTokenThreeDsIssuerTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetTransactionTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /**
     * true に設定すると、トークンの 3DS または CVV 認証のサブステータスが別のステータスに変わるか、サーバー側の約 3 秒のタイムアウトに達するまで、API
     * が内部でポーリングを行うよう指示します。
     */
    polling?: boolean;
  };

  export class GetTransactionTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetTransactionTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListAllTransactionTokensRequest = {
    /** 大文字と小文字を区別しないフリーテキスト検索。 */
    search?: string;
    /** 消費者 ID でフィルタリングします。 */
    customerId?: string;
    /**
     * トークンタイプでフィルタリングします。`one_time` トークンは一覧から除外されており、フィルタリング対象にはできません。`recurring`
     * でフィルタリングするにはアプリケーション・トークンのシークレットが必要です。
     */
    type?: TransactionTokenListType;
    /** 環境モード（本番/テスト）でフィルタリングします。 */
    mode?: ModeQuery;
    /** 継続（recurring）トークンをアクティブかどうかでフィルタリングします。 @default TransactionTokenActiveFilter.Active */
    active?: TransactionTokenActiveFilter;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listAllTransactionTokensRequestSchema: Schema<ListAllTransactionTokensRequest> = s.lazySchema(
    () =>
      s.object<ListAllTransactionTokensRequest>({
        search: s.optional(s.string()),
        customerId: s.optional(s.string()),
        type: s.optional(s.lazy(() => transactionTokenListTypeSchema)),
        mode: s.optional(s.lazy(() => modeQuerySchema)),
        active: s.defaulted(transactionTokenActiveFilterSchema, TransactionTokenActiveFilter.Active),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string()),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      }),
  );

  export class ListAllTransactionTokensError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListAllTransactionTokensError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListStoreTransactionTokensRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 大文字と小文字を区別しないフリーテキスト検索。 */
    search?: string;
    /** 消費者 ID でフィルタリングします。 */
    customerId?: string;
    /**
     * トークンタイプでフィルタリングします。`one_time` トークンは一覧から除外されており、フィルタリング対象にはできません。`recurring`
     * でフィルタリングするにはアプリケーション・トークンのシークレットが必要です。
     */
    type?: TransactionTokenListType;
    /** 環境モード（本番/テスト）でフィルタリングします。 */
    mode?: ModeQuery;
    /** 継続（recurring）トークンをアクティブかどうかでフィルタリングします。 @default TransactionTokenActiveFilter.Active */
    active?: TransactionTokenActiveFilter;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listStoreTransactionTokensRequestSchema: Schema<ListStoreTransactionTokensRequest> =
    s.lazySchema(() =>
      s.object<ListStoreTransactionTokensRequest>({
        storeId: s.string(),
        search: s.optional(s.string()),
        customerId: s.optional(s.string()),
        type: s.optional(s.lazy(() => transactionTokenListTypeSchema)),
        mode: s.optional(s.lazy(() => modeQuerySchema)),
        active: s.defaulted(transactionTokenActiveFilterSchema, TransactionTokenActiveFilter.Active),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string()),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      }),
    );

  export class ListStoreTransactionTokensError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListStoreTransactionTokensError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type UpdateTransactionTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** トランザクション・トークン更新用のリクエスト・ペイロード。 */
    body?: TransactionTokenUpdateRequest;
  };

  export class UpdateTransactionTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateTransactionTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
