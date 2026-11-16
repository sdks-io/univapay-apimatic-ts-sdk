import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import { cancelCreateRequestSchema, type CancelCreateRequest } from "../models/cancel-create-request.js";
import { cancelListSchema, type CancelList } from "../models/cancel-list.js";
import { cancelUpdateRequestSchema, type CancelUpdateRequest } from "../models/cancel-update-request.js";
import { cancelSchema, type Cancel } from "../models/cancel.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import type { Servers } from "../servers.js";

/**
 * 課金のキャンセルを作成・管理するためのエンドポイント。
 */
export class Cancels {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * キャンセルの作成
   *
   * @remarks
   * 課金に対する新しいキャンセルリクエストを作成します。課金はキャンセル可能なステータスである必要があります。銀行振込およびコンビニ決済の課金で、すでに支払いが完了しているものはキャンセルできません。
   *
   * @returns キャンセルが正常に作成されました。
   *
   * @throws {@link Cancels.CreateCancelError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createCancel(
    request: Cancels.CreateCancelRequest,
    options?: RequestOptions,
  ): ApiPromise<Cancel, Cancels.CreateCancelError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/cancels"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => cancelCreateRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: cancelSchema },
        errorFactory: Cancels.CreateCancelError,
      },
      options,
    );
  }

  /**
   * キャンセル情報の取得
   *
   * @remarks
   * ID によって特定のキャンセル情報を取得します。`?polling=true`
   * を追加することでロングポーリングをサポートし、ステータスの変更を待機します（サーバータイムアウトまで）。シークレットを含むトークン（秘密鍵）が必要です。
   *
   * @returns キャンセルの詳細が正常に取得されました。
   *
   * @throws {@link Cancels.GetCancelError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getCancel(
    request: Cancels.GetCancelRequest,
    options?: RequestOptions,
  ): ApiPromise<Cancel, Cancels.GetCancelError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/cancels/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [{ name: "polling", value: request.polling, schema: s.defaulted(s.boolean(), false) }],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: cancelSchema },
        errorFactory: Cancels.GetCancelError,
      },
      options,
    );
  }

  /**
   * キャンセル一覧の取得
   *
   * @remarks
   * 指定された課金に対するキャンセルリクエストのページネーションされたリストを返します。
   *
   * @returns ページネーションされたキャンセルリスト。
   *
   * @throws {@link Cancels.ListCancelsError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listCancels(
    request: Cancels.ListCancelsRequest,
    options?: RequestOptions,
  ): ApiPromise<CancelList, Cancels.ListCancelsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/cancels"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
        ],
        query: [
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
        success: { kind: "json", schema: cancelListSchema },
        errorFactory: Cancels.ListCancelsError,
      },
      options,
    );
  }

  /**
   * キャンセルの更新
   *
   * @remarks
   * 既存のキャンセルにおけるメタデータを更新します。シークレットを含むトークンが必要です。
   *
   * @returns キャンセルが正常に更新されました。
   *
   * @throws {@link Cancels.UpdateCancelError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateCancel(
    request: Cancels.UpdateCancelRequest,
    options?: RequestOptions,
  ): ApiPromise<Cancel, Cancels.UpdateCancelError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/cancels/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: cancelUpdateRequestSchema },
      },
      {
        success: { kind: "json", schema: cancelSchema },
        errorFactory: Cancels.UpdateCancelError,
      },
      options,
    );
  }
}

export namespace Cancels {
  export type CreateCancelRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** キャンセル作成用のオプションのメタデータペイロード。 */
    body?: CancelCreateRequest;
  };

  export class CreateCancelError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateCancelError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type GetCancelRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** `true` の場合、サーバーはキャンセルステータスが変更されるか、ポーリングのタイムアウトに達するまで接続を開いたまま保持します。 @default false */
    polling?: boolean;
  };

  export class GetCancelError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetCancelError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListCancelsRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listCancelsRequestSchema: Schema<ListCancelsRequest> = s.lazySchema(() =>
    s.object<ListCancelsRequest>({
      storeId: s.string(),
      chargeId: s.string(),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
    }),
  );

  export class ListCancelsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListCancelsError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type UpdateCancelRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** キャンセルメタデータ更新用のリクエスト・ペイロード。 */
    body: CancelUpdateRequest;
  };

  export class UpdateCancelError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateCancelError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }
}
