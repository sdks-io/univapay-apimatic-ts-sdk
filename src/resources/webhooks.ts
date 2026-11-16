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
  webhookCreateRequestInternalSchema,
  type WebhookCreateRequest,
} from "../models/webhook-create-request.js";
import { webhookEventListSchema, type WebhookEventList } from "../models/webhook-event-list.js";
import { webhookListInternalSchema, type WebhookList } from "../models/webhook-list.js";
import {
  webhookUpdateRequestInternalSchema,
  type WebhookUpdateRequest,
} from "../models/webhook-update-request.js";
import { webhookInternalSchema, type Webhook } from "../models/webhook.js";
import type { Servers } from "../servers.js";

/**
 * 店舗レベルのウェブフックの作成・管理、および配信履歴の表示を行うエンドポイント。
 */
export class Webhooks {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * ウェブフックの作成
   *
   * @remarks
   * 指定された店舗に対して新しいウェブフックを作成します。シークレットを含むトークンが必要です。同じスコープ内での重複する URL
   * は許可されません。店舗ごとに作成できるウェブフックの数には最大制限があります。
   *
   * @returns ウェブフックが正常に作成されました。
   *
   * @throws {@link Webhooks.CreateWebhookError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createWebhook(
    request: Webhooks.CreateWebhookRequest,
    options?: RequestOptions,
  ): ApiPromise<Webhook, Webhooks.CreateWebhookError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/webhooks"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: webhookCreateRequestInternalSchema },
      },
      {
        success: { kind: "json", schema: webhookInternalSchema },
        errorFactory: Webhooks.CreateWebhookError,
      },
      options,
    );
  }

  /**
   * ウェブフックの削除
   *
   * @remarks
   * ウェブフックを無効化し、削除します。
   *
   * @returns ウェブフックは正常に削除されました。コンテンツなし。
   *
   * @throws {@link Webhooks.DeleteWebhookError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  deleteWebhook(
    request: Webhooks.DeleteWebhookRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Webhooks.DeleteWebhookError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.default("/stores/{storeId}/webhooks/{id}"),
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
        errorFactory: Webhooks.DeleteWebhookError,
      },
      options,
    );
  }

  /**
   * ウェブフック情報の取得
   *
   * @remarks
   * ID によって特定のウェブフック情報を取得します。
   *
   * @returns ウェブフックの詳細が正常に取得されました。
   *
   * @throws {@link Webhooks.GetWebhookError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getWebhook(
    request: Webhooks.GetWebhookRequest,
    options?: RequestOptions,
  ): ApiPromise<Webhook, Webhooks.GetWebhookError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/webhooks/{id}"),
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
        success: { kind: "json", schema: webhookInternalSchema },
        errorFactory: Webhooks.GetWebhookError,
      },
      options,
    );
  }

  /**
   * ウェブフックイベント一覧の取得
   *
   * @remarks
   * 指定されたウェブフックに対するウェブフック配信イベントのページネーションされたリストを返します。各イベントは、単一のウェブフック配信試行の結果を記録しています。
   *
   * @returns ページネーションされたウェブフックイベントのリスト。
   *
   * @throws {@link Webhooks.ListWebhookEventsError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listWebhookEvents(
    request: Webhooks.ListWebhookEventsRequest,
    options?: RequestOptions,
  ): ApiPromise<WebhookEventList, Webhooks.ListWebhookEventsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/webhooks/{id}/events"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
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
        success: { kind: "json", schema: webhookEventListSchema },
        errorFactory: Webhooks.ListWebhookEventsError,
      },
      options,
    );
  }

  /**
   * ウェブフック一覧の取得
   *
   * @remarks
   * 指定された店舗のウェブフックのページネーションされたリストを返します。シークレットを含むトークンが必要です。
   *
   * @returns ページネーションされたウェブフックのリスト。
   *
   * @throws {@link Webhooks.ListWebhooksError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listWebhooks(
    request: Webhooks.ListWebhooksRequest,
    options?: RequestOptions,
  ): ApiPromise<WebhookList, Webhooks.ListWebhooksError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/webhooks"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
          { name: "active", value: request.active, schema: s.optional(s.boolean()) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: webhookListInternalSchema },
        errorFactory: Webhooks.ListWebhooksError,
      },
      options,
    );
  }

  /**
   * ウェブフックの更新
   *
   * @remarks
   * 既存のウェブフックを更新します。すべてのフィールドはオプションであり、省略されたフィールドは変更されません。同じスコープ内での重複する URL は許可されません。
   *
   * @returns ウェブフックが正常に更新されました。
   *
   * @throws {@link Webhooks.UpdateWebhookError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateWebhook(
    request: Webhooks.UpdateWebhookRequest,
    options?: RequestOptions,
  ): ApiPromise<Webhook, Webhooks.UpdateWebhookError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/webhooks/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: webhookUpdateRequestInternalSchema },
      },
      {
        success: { kind: "json", schema: webhookInternalSchema },
        errorFactory: Webhooks.UpdateWebhookError,
      },
      options,
    );
  }
}

export namespace Webhooks {
  export type CreateWebhookRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 店舗ウェブフック作成用のリクエスト・ペイロード。 */
    body: WebhookCreateRequest;
  };

  export class CreateWebhookError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateWebhookError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type DeleteWebhookRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class DeleteWebhookError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<DeleteWebhookError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type GetWebhookRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class GetWebhookError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetWebhookError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListWebhookEventsRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listWebhookEventsRequestSchema: Schema<ListWebhookEventsRequest> = s.lazySchema(() =>
    s.object<ListWebhookEventsRequest>({
      storeId: s.string(),
      id: s.string(),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
    }),
  );

  export class ListWebhookEventsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListWebhookEventsError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListWebhooksRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
    /** アクティブ（有効）ステータスでフィルタリングします。 */
    active?: boolean;
  };

  export const listWebhooksRequestSchema: Schema<ListWebhooksRequest> = s.lazySchema(() =>
    s.object<ListWebhooksRequest>({
      storeId: s.string(),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      active: s.optional(s.boolean()),
    }),
  );

  export class ListWebhooksError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListWebhooksError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type UpdateWebhookRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 店舗ウェブフック更新用のリクエスト・ペイロード。 */
    body: WebhookUpdateRequest;
  };

  export class UpdateWebhookError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateWebhookError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }
}
