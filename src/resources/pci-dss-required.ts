import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import {
  threeDsIssuerTokenInternalSchema,
  type ThreeDsIssuerToken,
} from "../models/three-ds-issuer-token.js";
import {
  transactionTokenCreateRequestInternalSchema,
  type TransactionTokenCreateRequest,
} from "../models/transaction-token-create-request.js";
import {
  transactionTokenUpdateRequestSchema,
  type TransactionTokenUpdateRequest,
} from "../models/transaction-token-update-request.js";
import { transactionTokenInternalSchema, type TransactionToken } from "../models/unions/transaction-token.js";
import type { Servers } from "../servers.js";

/**
 * ⚠️ **セキュリティ警告**: このタグが付いたエンドポイントは、クレジットカードデータ（カード番号や CVV
 * など）を処理できます。クレジットカード決済にこれらのエンドポイントを使用する場合、サーバー環境は MUST で PCI DSS に準拠している必要があります。
 */
export class PciDssRequired {
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
   * @throws {@link PciDssRequired.CreateTransactionTokenError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createTransactionToken(
    request: PciDssRequired.CreateTransactionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, PciDssRequired.CreateTransactionTokenError> {
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
        errorFactory: PciDssRequired.CreateTransactionTokenError,
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
   * @throws {@link PciDssRequired.GetTokenThreeDsIssuerTokenError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getTokenThreeDsIssuerToken(
    request: PciDssRequired.GetTokenThreeDsIssuerTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<ThreeDsIssuerToken, PciDssRequired.GetTokenThreeDsIssuerTokenError> {
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
        errorFactory: PciDssRequired.GetTokenThreeDsIssuerTokenError,
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
   * @throws {@link PciDssRequired.UpdateTransactionTokenError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateTransactionToken(
    request: PciDssRequired.UpdateTransactionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionToken, PciDssRequired.UpdateTransactionTokenError> {
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
        errorFactory: PciDssRequired.UpdateTransactionTokenError,
      },
      options,
    );
  }
}

export namespace PciDssRequired {
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
