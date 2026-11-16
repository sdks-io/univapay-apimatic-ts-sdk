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
import {
  createCustomerIdRequestInternalSchema,
  type CreateCustomerIdRequest,
} from "../models/create-customer-id-request.js";
import {
  createCustomerIdResponseSchema,
  type CreateCustomerIdResponse,
} from "../models/create-customer-id-response.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import { storeListSchema, type StoreList } from "../models/store-list.js";
import { storeInternalSchema, type Store } from "../models/store.js";
import type { Servers } from "../servers.js";

/**
 * 加盟店文脈における、店舗の検索および設定を取得するエンドポイント。
 */
export class Stores {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 決定論的な消費者 ID の作成
   *
   * @remarks
   * 加盟店が指定したローカルな消費者識別子から、決定論的な店舗スコープの UUID を導出します。同じ店舗に対して同じ `customer_id` で再度呼び出しても、常に同じ UUID
   * が返されます — この操作には副作用がなく（何も永続化されません）、繰り返し呼び出しても安全であり、`Idempotency-Key`
   * も不要です。アプリケーション・トークンのシークレットが必要です。
   *
   * @returns 消費者 ID の導出に成功しました。
   *
   * @throws {@link Stores.CreateCustomerIdError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createCustomerId(
    request: Stores.CreateCustomerIdRequestParams,
    options?: RequestOptions,
  ): ApiPromise<CreateCustomerIdResponse, Stores.CreateCustomerIdError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/create_customer_id"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: createCustomerIdRequestInternalSchema },
      },
      {
        success: { kind: "json", schema: createCustomerIdResponseSchema },
        errorFactory: Stores.CreateCustomerIdError,
      },
      options,
    );
  }

  /**
   * 店舗情報の取得
   *
   * @remarks
   * 現在の加盟店コンテキストにおける、単一の店舗情報と、解決された設定スナップショットを返します。
   *
   * @returns 店舗リソース。
   *
   * @throws {@link Stores.GetStoreError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getStore(
    request: Stores.GetStoreRequest,
    options?: RequestOptions,
  ): ApiPromise<Store, Stores.GetStoreError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: storeInternalSchema },
        errorFactory: Stores.GetStoreError,
      },
      options,
    );
  }

  /**
   * 店舗一覧の取得
   *
   * @remarks
   * 現在の加盟店資格情報で閲覧可能な店舗を返します。カーソルページネーション、および `short_id` やフリーテキストの `search` フィルターをサポートしています。
   *
   * @returns ページネーションされた店舗結果セット。
   *
   * @throws {@link Stores.ListStoresError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listStores(
    request: Stores.ListStoresRequest = {},
    options?: RequestOptions,
  ): ApiPromise<StoreList, Stores.ListStoresError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
          { name: "short_id", value: request.shortId, schema: s.optional(s.string()) },
          { name: "search", value: request.search, schema: s.optional(s.string()) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: storeListSchema },
        errorFactory: Stores.ListStoresError,
      },
      options,
    );
  }
}

export namespace Stores {
  export type CreateCustomerIdRequestParams = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 消費者 ID を導出するためのリクエスト・ペイロード。 */
    body: CreateCustomerIdRequest;
  };

  export class CreateCustomerIdError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateCustomerIdError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetStoreRequest = {
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class GetStoreError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetStoreError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListStoresRequest = {
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
    /** ショート識別子でフィルタリングします。 */
    shortId?: string;
    /** 大文字と小文字を区別しないフリーテキスト検索。 */
    search?: string;
  };

  export const listStoresRequestSchema: Schema<ListStoresRequest> = s.lazySchema(() =>
    s.object<ListStoresRequest>({
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      shortId: s.optional(s.string()),
      search: s.optional(s.string()),
    }),
  );

  export class ListStoresError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListStoresError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
