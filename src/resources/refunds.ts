import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import { refundCreateRequestSchema, type RefundCreateRequest } from "../models/refund-create-request.js";
import { refundListSchema, type RefundList } from "../models/refund-list.js";
import { refundUpdateRequestSchema, type RefundUpdateRequest } from "../models/refund-update-request.js";
import { refundSchema, type Refund } from "../models/refund.js";
import type { Servers } from "../servers.js";

/**
 * 課金に対する返金を作成・管理するためのエンドポイント。
 */
export class Refunds {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 返金の作成
   *
   * @remarks
   * 成功した課金に対して返金を作成します。課金のステータスは
   * `successful`（成功）である必要があります。コンビニ決済および銀行振込の課金は返金できません。返金は非同期で処理されるため、初期ステータスは
   * `pending`（処理中）になります。
   *
   * @returns 返金が正常に作成されました。処理は非同期で行われるため、ポーリングまたはウェブフックを使用して完了を追跡してください。
   *
   * @throws {@link Refunds.CreateRefundError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createRefund(
    request: Refunds.CreateRefundRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Refunds.CreateRefundError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/refunds"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: refundCreateRequestSchema },
      },
      {
        success: { kind: "json", schema: refundSchema },
        errorFactory: Refunds.CreateRefundError,
      },
      options,
    );
  }

  /**
   * 返金情報の取得 (ロングポーリング対応)
   *
   * @remarks
   * 特定の返金の詳細を取得します。ロングポーリングをサポートしており、`polling=true` を設定すると、返金ステータスが
   * `pending`（処理中）から最終状態（`successful`、`failed`、または `error`）に遷移するまで接続を維持します。
   *
   * @returns 返金の詳細が正常に取得されました。
   *
   * @throws {@link Refunds.GetRefundError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getRefund(
    request: Refunds.GetRefundRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Refunds.GetRefundError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/refunds/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [{ name: "polling", value: request.polling, schema: s.optional(s.boolean()) }],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: refundSchema },
        errorFactory: Refunds.GetRefundError,
      },
      options,
    );
  }

  /**
   * 返金一覧の取得
   *
   * @remarks
   * 特定の課金に対するすべての返金リストを取得します。
   *
   * @returns 返金一覧が正常に取得されました。
   *
   * @throws {@link Refunds.ListRefundsError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listRefunds(
    request: Refunds.ListRefundsRequest,
    options?: RequestOptions,
  ): ApiPromise<RefundList, Refunds.ListRefundsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/refunds"),
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
          { name: "metadata", value: request.metadata, schema: s.optional(s.string()) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: refundListSchema },
        errorFactory: Refunds.ListRefundsError,
      },
      options,
    );
  }

  /**
   * 返金の更新
   *
   * @remarks
   * 既存の返金におけるメタデータ、メッセージ、または理由を更新します。許可されていない理由への変更は `INVALID_REFUND_REASON` で拒否されます。
   *
   * @returns 返金が正常に更新されました。
   *
   * @throws {@link Refunds.UpdateRefundError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateRefund(
    request: Refunds.UpdateRefundRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Refunds.UpdateRefundError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/refunds/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: refundUpdateRequestSchema },
      },
      {
        success: { kind: "json", schema: refundSchema },
        errorFactory: Refunds.UpdateRefundError,
      },
      options,
    );
  }
}

export namespace Refunds {
  export type CreateRefundRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 返金作成用のリクエスト・ペイロード。 */
    body: RefundCreateRequest;
  };

  export class CreateRefundError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateRefundError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetRefundRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** `true` の場合、サーバーは返金ステータスが最終状態に遷移するか、ポーリングのタイムアウトに達するまで接続を開いたまま保持します。 */
    polling?: boolean;
  };

  export class GetRefundError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetRefundError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListRefundsRequest = {
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
    /** メタデータの内容で返金をフィルタリングします。 */
    metadata?: string;
  };

  export const listRefundsRequestSchema: Schema<ListRefundsRequest> = s.lazySchema(() =>
    s.object<ListRefundsRequest>({
      storeId: s.string(),
      chargeId: s.string(),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      metadata: s.optional(s.string()),
    }),
  );

  export class ListRefundsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListRefundsError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type UpdateRefundRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 返金メタデータまたは理由更新用のリクエスト・ペイロード。 */
    body: RefundUpdateRequest;
  };

  export class UpdateRefundError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateRefundError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }
}
