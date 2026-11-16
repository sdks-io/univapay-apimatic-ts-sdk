import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import {
  bankTransferPaymentStatusSchema,
  type BankTransferPaymentStatus,
} from "../models/bank-transfer-payment-status.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import {
  transactionHistoryListSchema,
  type TransactionHistoryList,
} from "../models/transaction-history-list.js";
import {
  transactionHistoryModeSchema,
  type TransactionHistoryMode,
} from "../models/transaction-history-mode.js";
import {
  transactionHistoryServiceProviderSchema,
  type TransactionHistoryServiceProvider,
} from "../models/transaction-history-service-provider.js";
import {
  transactionHistoryStatusSchema,
  type TransactionHistoryStatus,
} from "../models/transaction-history-status.js";
import {
  transactionHistoryTypeSchema,
  type TransactionHistoryType,
} from "../models/transaction-history-type.js";
import type { Servers } from "../servers.js";

/**
 * 決済タイプを横断した課金・返金の統合履歴を検索するためのエンドポイント。
 */
export class TransactionHistory {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 店舗のトランザクション履歴の一覧取得
   *
   * @remarks
   * 単一店舗の課金・返金の履歴を、ページネーションされた検索可能な形式で返します。両方のリソースタイプを単一の統合された行形式にまとめて返します。
   *
   * @returns 店舗のページネーションされたトランザクション履歴。
   *
   * @throws {@link TransactionHistory.ListStoreTransactionHistoryError} when the API answers with
   * an error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listStoreTransactionHistory(
    request: TransactionHistory.ListStoreTransactionHistoryRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionHistoryList, TransactionHistory.ListStoreTransactionHistoryError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/transaction_history"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [
          {
            name: "mode",
            value: request.mode,
            schema: s.optional(s.lazy(() => transactionHistoryModeSchema)),
          },
          { name: "short_id", value: request.shortId, schema: s.optional(s.string()) },
          { name: "from", value: request.from, schema: s.optional(s.string()) },
          { name: "to", value: request.to, schema: s.optional(s.string()) },
          {
            name: "status",
            value: request.status,
            schema: s.optional(s.lazy(() => transactionHistoryStatusSchema)),
          },
          {
            name: "type",
            value: request.type,
            schema: s.optional(s.lazy(() => transactionHistoryTypeSchema)),
          },
          { name: "search", value: request.search, schema: s.optional(s.string()) },
          { name: "email", value: request.email, schema: s.optional(s.string()) },
          { name: "id", value: request.id, schema: s.optional(s.string()) },
          { name: "metadata", value: request.metadata, schema: s.optional(s.string()) },
          { name: "card_exp", value: request.cardExp, schema: s.optional(s.string()) },
          { name: "card_last_four", value: request.cardLastFour, schema: s.optional(s.string()) },
          { name: "cardholder", value: request.cardholder, schema: s.optional(s.string()) },
          { name: "card_brand[]", value: request.cardBrand, schema: s.optional(s.array(s.string())) },
          { name: "brand[]", value: request.brand, schema: s.optional(s.array(s.string())) },
          { name: "brands[]", value: request.brands, schema: s.optional(s.array(s.string())) },
          { name: "currency", value: request.currency, schema: s.optional(s.string()) },
          {
            name: "service_provider",
            value: request.serviceProvider,
            schema: s.optional(s.lazy(() => transactionHistoryServiceProviderSchema)),
          },
          {
            name: "service_providers[]",
            value: request.serviceProviders,
            schema: s.optional(s.array(s.lazy(() => transactionHistoryServiceProviderSchema))),
          },
          {
            name: "gateway_transaction_id",
            value: request.gatewayTransactionId,
            schema: s.optional(s.string()),
          },
          {
            name: "bank_transfer_payment_statuses[]",
            value: request.bankTransferPaymentStatuses,
            schema: s.optional(s.array(s.lazy(() => bankTransferPaymentStatusSchema))),
          },
          {
            name: "bank_transfer_latest_deposit_date.from",
            value: request.bankTransferLatestDepositDateFrom,
            schema: s.optional(s.string()),
          },
          {
            name: "bank_transfer_latest_deposit_date.to",
            value: request.bankTransferLatestDepositDateTo,
            schema: s.optional(s.string()),
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
        success: { kind: "json", schema: transactionHistoryListSchema },
        errorFactory: TransactionHistory.ListStoreTransactionHistoryError,
      },
      options,
    );
  }

  /**
   * トランザクション履歴の一覧取得
   *
   * @remarks
   * 加盟店のすべての店舗にわたる課金・返金の履歴を、ページネーションされた検索可能な形式で返します。両方のリソースタイプを単一の統合された行形式にまとめて返します。
   *
   * @returns ページネーションされたトランザクション履歴。
   *
   * @throws {@link TransactionHistory.ListTransactionHistoryError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listTransactionHistory(
    request: TransactionHistory.ListTransactionHistoryRequest = {},
    options?: RequestOptions,
  ): ApiPromise<TransactionHistoryList, TransactionHistory.ListTransactionHistoryError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/transaction_history"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [
          {
            name: "mode",
            value: request.mode,
            schema: s.optional(s.lazy(() => transactionHistoryModeSchema)),
          },
          { name: "short_id", value: request.shortId, schema: s.optional(s.string()) },
          { name: "from", value: request.from, schema: s.optional(s.string()) },
          { name: "to", value: request.to, schema: s.optional(s.string()) },
          {
            name: "status",
            value: request.status,
            schema: s.optional(s.lazy(() => transactionHistoryStatusSchema)),
          },
          {
            name: "type",
            value: request.type,
            schema: s.optional(s.lazy(() => transactionHistoryTypeSchema)),
          },
          { name: "search", value: request.search, schema: s.optional(s.string()) },
          { name: "email", value: request.email, schema: s.optional(s.string()) },
          { name: "id", value: request.id, schema: s.optional(s.string()) },
          { name: "metadata", value: request.metadata, schema: s.optional(s.string()) },
          { name: "card_exp", value: request.cardExp, schema: s.optional(s.string()) },
          { name: "card_last_four", value: request.cardLastFour, schema: s.optional(s.string()) },
          { name: "cardholder", value: request.cardholder, schema: s.optional(s.string()) },
          { name: "card_brand[]", value: request.cardBrand, schema: s.optional(s.array(s.string())) },
          { name: "brand[]", value: request.brand, schema: s.optional(s.array(s.string())) },
          { name: "brands[]", value: request.brands, schema: s.optional(s.array(s.string())) },
          { name: "currency", value: request.currency, schema: s.optional(s.string()) },
          {
            name: "service_provider",
            value: request.serviceProvider,
            schema: s.optional(s.lazy(() => transactionHistoryServiceProviderSchema)),
          },
          {
            name: "service_providers[]",
            value: request.serviceProviders,
            schema: s.optional(s.array(s.lazy(() => transactionHistoryServiceProviderSchema))),
          },
          {
            name: "gateway_transaction_id",
            value: request.gatewayTransactionId,
            schema: s.optional(s.string()),
          },
          {
            name: "bank_transfer_payment_statuses[]",
            value: request.bankTransferPaymentStatuses,
            schema: s.optional(s.array(s.lazy(() => bankTransferPaymentStatusSchema))),
          },
          {
            name: "bank_transfer_latest_deposit_date.from",
            value: request.bankTransferLatestDepositDateFrom,
            schema: s.optional(s.string()),
          },
          {
            name: "bank_transfer_latest_deposit_date.to",
            value: request.bankTransferLatestDepositDateTo,
            schema: s.optional(s.string()),
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
        success: { kind: "json", schema: transactionHistoryListSchema },
        errorFactory: TransactionHistory.ListTransactionHistoryError,
      },
      options,
    );
  }
}

export namespace TransactionHistory {
  export type ListStoreTransactionHistoryRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 環境モードでフィルタリングします。 */
    mode?: TransactionHistoryMode;
    /** リソースの UUID の下6桁でフィルタリングします。必ず6文字で指定してください。 */
    shortId?: string;
    /** この日時以降に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`to` より後の日時にはできません。 */
    from?: string;
    /** この日時以前に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`from` より前の日時にはできません。 */
    to?: string;
    /** ステータスでフィルタリングします。課金・返金いずれのステータス値も指定できます。 */
    status?: TransactionHistoryStatus;
    /** 行のタイプでフィルタリングします。 */
    type?: TransactionHistoryType;
    /**
     * カード名義人・消費者名およびメールアドレスを対象としたフリーテキスト検索です。値を引用符で囲む（`"first
     * last"`）と完全一致（フレーズ）検索、囲まない場合は部分一致検索になります。
     */
    search?: string;
    /** メールアドレスでフィルタリングします。 */
    email?: string;
    /** 課金 ID または返金 ID の完全一致でフィルタリングします。 */
    id?: string;
    /** メタデータでフィルタリングします。 */
    metadata?: string;
    /** カードの有効期限（`yyyy-MM` 形式）でフィルタリングします。 */
    cardExp?: string;
    /** カードの下4桁でフィルタリングします。必ず4文字で指定してください。 */
    cardLastFour?: string;
    /** カード名義人名でフィルタリングします。既定では部分一致です。完全一致（フレーズ）検索を行うには引用符で囲んでください。 */
    cardholder?: string;
    /**
     * 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例:
     * `card_brand[]=visa&card_brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの
     * `user_data.brand` フィールドを参照してください。
     *
     * @deprecated
     */
    cardBrand?: string[];
    /**
     * ブランドでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例:
     * `brand[]=visa&brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand`
     * フィールドを参照してください。
     */
    brand?: string[];
    /**
     * 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例:
     * `brands[]=visa&brands[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand`
     * フィールドを参照してください。
     *
     * @deprecated
     */
    brands?: string[];
    /** 通貨（ISO-4217 形式）でフィルタリングします。 */
    currency?: string;
    /** サービスプロバイダーでフィルタリングします。 */
    serviceProvider?: TransactionHistoryServiceProvider;
    /**
     * サービスプロバイダーでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例:
     * `service_providers[]=credit&service_providers[]=paidy`）。空にはできません。重複する値は除去されます。
     */
    serviceProviders?: TransactionHistoryServiceProvider[];
    /** ゲートウェイ自身のトランザクション ID（自由記述）でフィルタリングします。 */
    gatewayTransactionId?: string;
    /**
     * 銀行振込の行を支払いステータスでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例:
     * `bank_transfer_payment_statuses[]=unpaid&bank_transfer_payment_statuses[]=exact`）。
     */
    bankTransferPaymentStatuses?: BankTransferPaymentStatus[];
    /** `bank_transfer_latest_deposit_date` の範囲の開始（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 */
    bankTransferLatestDepositDateFrom?: string;
    /** `bank_transfer_latest_deposit_date` の範囲の終了（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 */
    bankTransferLatestDepositDateTo?: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listStoreTransactionHistoryRequestSchema: Schema<ListStoreTransactionHistoryRequest> =
    s.lazySchema(() =>
      s.object<ListStoreTransactionHistoryRequest>({
        storeId: s.string(),
        mode: s.optional(s.lazy(() => transactionHistoryModeSchema)),
        shortId: s.optional(s.string()),
        from: s.optional(s.string()),
        to: s.optional(s.string()),
        status: s.optional(s.lazy(() => transactionHistoryStatusSchema)),
        type: s.optional(s.lazy(() => transactionHistoryTypeSchema)),
        search: s.optional(s.string()),
        email: s.optional(s.string().check(s.email())),
        id: s.optional(s.string()),
        metadata: s.optional(s.string()),
        cardExp: s.optional(s.string()),
        cardLastFour: s.optional(s.string()),
        cardholder: s.optional(s.string()),
        cardBrand: s.optional(s.array(s.string())),
        brand: s.optional(s.array(s.string())),
        brands: s.optional(s.array(s.string())),
        currency: s.optional(s.string()),
        serviceProvider: s.optional(s.lazy(() => transactionHistoryServiceProviderSchema)),
        serviceProviders: s.optional(s.array(s.lazy(() => transactionHistoryServiceProviderSchema))),
        gatewayTransactionId: s.optional(s.string()),
        bankTransferPaymentStatuses: s.optional(s.array(s.lazy(() => bankTransferPaymentStatusSchema))),
        bankTransferLatestDepositDateFrom: s.optional(s.string()),
        bankTransferLatestDepositDateTo: s.optional(s.string()),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string()),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      }),
    );

  export class ListStoreTransactionHistoryError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListStoreTransactionHistoryError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListTransactionHistoryRequest = {
    /** 環境モードでフィルタリングします。 */
    mode?: TransactionHistoryMode;
    /** リソースの UUID の下6桁でフィルタリングします。必ず6文字で指定してください。 */
    shortId?: string;
    /** この日時以降に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`to` より後の日時にはできません。 */
    from?: string;
    /** この日時以前に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`from` より前の日時にはできません。 */
    to?: string;
    /** ステータスでフィルタリングします。課金・返金いずれのステータス値も指定できます。 */
    status?: TransactionHistoryStatus;
    /** 行のタイプでフィルタリングします。 */
    type?: TransactionHistoryType;
    /**
     * カード名義人・消費者名およびメールアドレスを対象としたフリーテキスト検索です。値を引用符で囲む（`"first
     * last"`）と完全一致（フレーズ）検索、囲まない場合は部分一致検索になります。
     */
    search?: string;
    /** メールアドレスでフィルタリングします。 */
    email?: string;
    /** 課金 ID または返金 ID の完全一致でフィルタリングします。 */
    id?: string;
    /** メタデータでフィルタリングします。 */
    metadata?: string;
    /** カードの有効期限（`yyyy-MM` 形式）でフィルタリングします。 */
    cardExp?: string;
    /** カードの下4桁でフィルタリングします。必ず4文字で指定してください。 */
    cardLastFour?: string;
    /** カード名義人名でフィルタリングします。既定では部分一致です。完全一致（フレーズ）検索を行うには引用符で囲んでください。 */
    cardholder?: string;
    /**
     * 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例:
     * `card_brand[]=visa&card_brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの
     * `user_data.brand` フィールドを参照してください。
     *
     * @deprecated
     */
    cardBrand?: string[];
    /**
     * ブランドでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例:
     * `brand[]=visa&brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand`
     * フィールドを参照してください。
     */
    brand?: string[];
    /**
     * 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例:
     * `brands[]=visa&brands[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand`
     * フィールドを参照してください。
     *
     * @deprecated
     */
    brands?: string[];
    /** 通貨（ISO-4217 形式）でフィルタリングします。 */
    currency?: string;
    /** サービスプロバイダーでフィルタリングします。 */
    serviceProvider?: TransactionHistoryServiceProvider;
    /**
     * サービスプロバイダーでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例:
     * `service_providers[]=credit&service_providers[]=paidy`）。空にはできません。重複する値は除去されます。
     */
    serviceProviders?: TransactionHistoryServiceProvider[];
    /** ゲートウェイ自身のトランザクション ID（自由記述）でフィルタリングします。 */
    gatewayTransactionId?: string;
    /**
     * 銀行振込の行を支払いステータスでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例:
     * `bank_transfer_payment_statuses[]=unpaid&bank_transfer_payment_statuses[]=exact`）。
     */
    bankTransferPaymentStatuses?: BankTransferPaymentStatus[];
    /** `bank_transfer_latest_deposit_date` の範囲の開始（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 */
    bankTransferLatestDepositDateFrom?: string;
    /** `bank_transfer_latest_deposit_date` の範囲の終了（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 */
    bankTransferLatestDepositDateTo?: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listTransactionHistoryRequestSchema: Schema<ListTransactionHistoryRequest> = s.lazySchema(() =>
    s.object<ListTransactionHistoryRequest>({
      mode: s.optional(s.lazy(() => transactionHistoryModeSchema)),
      shortId: s.optional(s.string()),
      from: s.optional(s.string()),
      to: s.optional(s.string()),
      status: s.optional(s.lazy(() => transactionHistoryStatusSchema)),
      type: s.optional(s.lazy(() => transactionHistoryTypeSchema)),
      search: s.optional(s.string()),
      email: s.optional(s.string().check(s.email())),
      id: s.optional(s.string()),
      metadata: s.optional(s.string()),
      cardExp: s.optional(s.string()),
      cardLastFour: s.optional(s.string()),
      cardholder: s.optional(s.string()),
      cardBrand: s.optional(s.array(s.string())),
      brand: s.optional(s.array(s.string())),
      brands: s.optional(s.array(s.string())),
      currency: s.optional(s.string()),
      serviceProvider: s.optional(s.lazy(() => transactionHistoryServiceProviderSchema)),
      serviceProviders: s.optional(s.array(s.lazy(() => transactionHistoryServiceProviderSchema))),
      gatewayTransactionId: s.optional(s.string()),
      bankTransferPaymentStatuses: s.optional(s.array(s.lazy(() => bankTransferPaymentStatusSchema))),
      bankTransferLatestDepositDateFrom: s.optional(s.string()),
      bankTransferLatestDepositDateTo: s.optional(s.string()),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
    }),
  );

  export class ListTransactionHistoryError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListTransactionHistoryError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
