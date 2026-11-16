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
import { chargeListInternalSchema, type ChargeList } from "../models/charge-list.js";
import { chargeModeSchema, type ChargeMode } from "../models/charge-mode.js";
import { chargeInternalSchema, type Charge } from "../models/charge.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import {
  subscriptionCreateRequestInternalSchema,
  type SubscriptionCreateRequest,
} from "../models/subscription-create-request.js";
import { subscriptionListInternalSchema, type SubscriptionList } from "../models/subscription-list.js";
import {
  subscriptionPatchPaymentRequestSchema,
  type SubscriptionPatchPaymentRequest,
} from "../models/subscription-patch-payment-request.js";
import {
  subscriptionPatchTokenRequestSchema,
  type SubscriptionPatchTokenRequest,
} from "../models/subscription-patch-token-request.js";
import {
  subscriptionPaymentListSchema,
  type SubscriptionPaymentList,
} from "../models/subscription-payment-list.js";
import { subscriptionPaymentSchema, type SubscriptionPayment } from "../models/subscription-payment.js";
import {
  subscriptionSimulationPaymentInternalSchema,
  type SubscriptionSimulationPayment,
} from "../models/subscription-simulation-payment.js";
import {
  subscriptionSimulationRequestInternalSchema,
  type SubscriptionSimulationRequest,
} from "../models/subscription-simulation-request.js";
import { subscriptionStatusSchema, type SubscriptionStatus } from "../models/subscription-status.js";
import {
  subscriptionSuspendRequestSchema,
  type SubscriptionSuspendRequest,
} from "../models/subscription-suspend-request.js";
import {
  subscriptionUpdateRequestSchema,
  type SubscriptionUpdateRequest,
} from "../models/subscription-update-request.js";
import { subscriptionInternalSchema, type Subscription } from "../models/subscription.js";
import type { Servers } from "../servers.js";

/**
 * 継続的な定期課金決済を作成・管理するためのエンドポイント。
 */
export class Subscriptions {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 定期課金の解約
   *
   * @remarks
   * 既存の定期課金を解約します。定期課金のステータスは恒久的に `canceled` に変更され、再開することはできません。十分にご注意の上、実行してください。
   *
   * @returns 定期課金は正常に解約されました。コンテンツなし。
   *
   * @throws {@link Subscriptions.CancelSubscriptionError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  cancelSubscription(
    request: Subscriptions.CancelSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.CancelSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{id}"),
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
        errorFactory: Subscriptions.CancelSubscriptionError,
      },
      options,
    );
  }

  /**
   * 定期課金の作成
   *
   * @remarks
   * 新規定期課金を作成します。トークンの決済手段は、その定期課金で許可されている必要があります。`subscription_plan` または `installment_plan`
   * を指定する場合は、プランで許可された決済手段でなければなりません（そうでない場合は `SUBSCRIPTION_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN` または
   * `INSTALLMENT_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN`）。プランを指定しない場合は、カード、コンビニ決済、Apple Pay、Paidy
   * のトークンのみ使用できます。銀行振込のトークンは `PAYMENT_TYPE_NOT_ALLOWED` で拒否されます。
   *
   * @returns 定期課金作成完了
   *
   * @throws {@link ApiError} when the API answers with an error status
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createSubscription(
    request: Subscriptions.CreateSubscriptionRequest = {},
    options?: RequestOptions,
  ): ApiPromise<Subscription, ApiError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/subscriptions"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => subscriptionCreateRequestInternalSchema)),
        },
      },
      {
        success: { kind: "json", schema: subscriptionInternalSchema },
        errorFactory: ApiError,
      },
      options,
    );
  }

  /**
   * 定期課金情報の取得 (ロングポーリング対応)
   *
   * @remarks
   * 既存の定期課金の詳細を取得します。ステータスの変更を待つための内部ポーリングをサポートしています。
   *
   * @returns 定期課金の詳細が正常に取得されました。
   *
   * @throws {@link Subscriptions.GetSubscriptionError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getSubscription(
    request: Subscriptions.GetSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.GetSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{id}"),
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
        success: { kind: "json", schema: subscriptionInternalSchema },
        errorFactory: Subscriptions.GetSubscriptionError,
      },
      options,
    );
  }

  /**
   * 定期課金の最新の課金の取得
   *
   * @remarks
   * 特定の定期課金に対して作成された、最も直近の課金を取得します。まだ課金が試行されていない場合は 404 を返します。
   *
   * @returns 最新の課金が正常に取得されました。
   *
   * @throws {@link Subscriptions.GetSubscriptionLatestChargeError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getSubscriptionLatestCharge(
    request: Subscriptions.GetSubscriptionLatestChargeRequest,
    options?: RequestOptions,
  ): ApiPromise<Charge, Subscriptions.GetSubscriptionLatestChargeError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{subscriptionId}/charges/latest"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: chargeInternalSchema },
        errorFactory: Subscriptions.GetSubscriptionLatestChargeError,
      },
      options,
    );
  }

  /**
   * 定期課金の個別支払いの取得
   *
   * @remarks
   * 特定の定期課金に関連付けられた、個々の支払いの詳細を取得します。
   *
   * @returns 定期課金の支払いが正常に取得されました。
   *
   * @throws {@link Subscriptions.GetSubscriptionPaymentError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getSubscriptionPayment(
    request: Subscriptions.GetSubscriptionPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionPayment, Subscriptions.GetSubscriptionPaymentError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default(
          "/stores/{storeId}/subscriptions/{subscriptionId}/payments/{paymentId}",
        ),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
          { name: "paymentId", value: request.paymentId, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: subscriptionPaymentSchema },
        errorFactory: Subscriptions.GetSubscriptionPaymentError,
      },
      options,
    );
  }

  /**
   * 定期課金一覧の取得 (全店舗)
   *
   * @remarks
   * すべての店舗にわたるすべての定期課金の一覧を取得します。
   *
   * @returns 定期課金のリスト
   *
   * @throws {@link ApiError} when the API answers with an error status
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listAllSubscriptions(
    request: Subscriptions.ListAllSubscriptionsRequest = {},
    options?: RequestOptions,
  ): ApiPromise<SubscriptionList, ApiError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/subscriptions"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [
          { name: "search", value: request.search, schema: s.optional(s.string()) },
          {
            name: "status",
            value: request.status,
            schema: s.optional(s.lazy(() => subscriptionStatusSchema)),
          },
          { name: "mode", value: request.mode, schema: s.optional(s.lazy(() => chargeModeSchema)) },
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
        success: { kind: "json", schema: subscriptionListInternalSchema },
        errorFactory: ApiError,
      },
      options,
    );
  }

  /**
   * 定期課金の個別支払いに対する課金試行一覧の取得
   *
   * @remarks
   * 定期課金の予定された特定の支払いに対して行われた、すべての課金試行のページネーションされたリストを取得します。リトライの履歴を調査するのに便利です。
   *
   * @returns 予定された支払いに対する課金試行一覧が正常に取得されました。
   *
   * @throws {@link Subscriptions.ListChargesForSubscriptionPaymentError} when the API answers with
   * an error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listChargesForSubscriptionPayment(
    request: Subscriptions.ListChargesForSubscriptionPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<ChargeList, Subscriptions.ListChargesForSubscriptionPaymentError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default(
          "/stores/{storeId}/subscriptions/{subscriptionId}/payments/{paymentId}/charges",
        ),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
          { name: "paymentId", value: request.paymentId, schema: s.string() },
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
        success: { kind: "json", schema: chargeListInternalSchema },
        errorFactory: Subscriptions.ListChargesForSubscriptionPaymentError,
      },
      options,
    );
  }

  /**
   * 定期課金一覧の取得 (特定の店舗)
   *
   * @remarks
   * 特定の店舗のすべての定期課金の一覧を取得します。
   *
   * @returns 定期課金一覧が正常に取得されました。
   *
   * @throws {@link ApiError} when the API answers with an error status
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listStoreSubscriptions(
    request: Subscriptions.ListStoreSubscriptionsRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionList, ApiError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [
          { name: "search", value: request.search, schema: s.optional(s.string()) },
          {
            name: "status",
            value: request.status,
            schema: s.optional(s.lazy(() => subscriptionStatusSchema)),
          },
          { name: "mode", value: request.mode, schema: s.optional(s.lazy(() => chargeModeSchema)) },
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
        success: { kind: "json", schema: subscriptionListInternalSchema },
        errorFactory: ApiError,
      },
      options,
    );
  }

  /**
   * 定期課金関連の課金一覧の取得
   *
   * @remarks
   * 定期課金にリンクされている課金のページネーションされたリストを取得します。バックエンド検索では、通常の課金一覧と同じ検索インターフェースを使用し、要求された定期課金のフィルターを追加します。
   *
   * @returns 定期課金の課金一覧が正常に取得されました。
   *
   * @throws {@link Subscriptions.ListSubscriptionChargesError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listSubscriptionCharges(
    request: Subscriptions.ListSubscriptionChargesRequest,
    options?: RequestOptions,
  ): ApiPromise<ChargeList, Subscriptions.ListSubscriptionChargesError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default(
          "/merchants/{merchantId}/stores/{storeId}/subscriptions/{subscriptionId}/charges",
        ),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
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
        success: { kind: "json", schema: chargeListInternalSchema },
        errorFactory: Subscriptions.ListSubscriptionChargesError,
      },
      options,
    );
  }

  /**
   * 定期課金の支払い一覧の取得
   *
   * @remarks
   * 特定の定期課金について、過去の履歴および今後スケジュールされているすべての支払いリストを取得します。
   *
   * @returns 定期課金の支払い一覧が正常に取得されました。
   *
   * @throws {@link Subscriptions.ListSubscriptionPaymentsError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listSubscriptionPayments(
    request: Subscriptions.ListSubscriptionPaymentsRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionPaymentList, Subscriptions.ListSubscriptionPaymentsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{subscriptionId}/payments"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
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
        success: { kind: "json", schema: subscriptionPaymentListSchema },
        errorFactory: Subscriptions.ListSubscriptionPaymentsError,
      },
      options,
    );
  }

  /**
   * 定期課金・プランのシミュレーション (特定の店舗)
   *
   * @remarks
   * ライブの定期課金やトランザクション・トークンを作成せずに、特定の店舗について定期課金が従う支払いスケジュールをシミュレートします。指定された金額、通貨、期間（またはカスタム期間）、およびプラン設定から導かれるスケジュール済み支払いの配列（エンベロープなし）を返します。
   *
   * @returns シミュレートされた定期課金の支払いスケジュール
   *
   * @throws {@link Subscriptions.SimulateStoreSubscriptionPlanError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  simulateStoreSubscriptionPlan(
    request: Subscriptions.SimulateStoreSubscriptionPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionSimulationPayment[], Subscriptions.SimulateStoreSubscriptionPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/simulate_plan"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => subscriptionSimulationRequestInternalSchema)),
        },
      },
      {
        success: { kind: "json", schema: s.array(s.lazy(() => subscriptionSimulationPaymentInternalSchema)) },
        errorFactory: Subscriptions.SimulateStoreSubscriptionPlanError,
      },
      options,
    );
  }

  /**
   * 定期課金・プランのシミュレーション
   *
   * @remarks
   * ライブの定期課金やトランザクション・トークンを作成せずに、定期課金が従う支払いスケジュールをシミュレートします。指定された金額、通貨、期間（またはカスタム期間）、およびプラン設定から導かれるスケジュール済み支払いの配列（エンベロープなし）を返します。
   *
   * @returns シミュレートされた定期課金の支払いスケジュール
   *
   * @throws {@link Subscriptions.SimulateSubscriptionPlanError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  simulateSubscriptionPlan(
    request: Subscriptions.SimulateSubscriptionPlanRequest = {},
    options?: RequestOptions,
  ): ApiPromise<SubscriptionSimulationPayment[], Subscriptions.SimulateSubscriptionPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/subscriptions/simulate_plan"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => subscriptionSimulationRequestInternalSchema)),
        },
      },
      {
        success: { kind: "json", schema: s.array(s.lazy(() => subscriptionSimulationPaymentInternalSchema)) },
        errorFactory: Subscriptions.SimulateSubscriptionPlanError,
      },
      options,
    );
  }

  /**
   * 定期課金の一時停止
   *
   * @remarks
   * 現在 `current`（有効）または `unpaid`（未払い）の定期課金を一時停止します。`termination_mode`
   * で一時停止が発効するタイミングを制御します：`immediate`（デフォルト）はすぐに停止し、`on_next_payment` は次回の支払い予定日まで待ってから一時停止します。
   *
   * @returns 定期課金は正常に一時停止されました。
   *
   * @throws {@link Subscriptions.SuspendSubscriptionError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  suspendSubscription(
    request: Subscriptions.SuspendSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.SuspendSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{subscriptionId}/suspend"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => subscriptionSuspendRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: subscriptionInternalSchema },
        errorFactory: Subscriptions.SuspendSubscriptionError,
      },
      options,
    );
  }

  /**
   * 定期課金の再開
   *
   * @remarks
   * 現在 `suspended`（停止中）の定期課金を再開し、ステータスを `unpaid`（未払い）に戻して次回の支払いを再スケジュールします。リクエストボディは不要です。
   *
   * @returns 定期課金は正常に再開されました。
   *
   * @throws {@link Subscriptions.UnsuspendSubscriptionError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  unsuspendSubscription(
    request: Subscriptions.UnsuspendSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.UnsuspendSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{subscriptionId}/unsuspend"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: subscriptionInternalSchema },
        errorFactory: Subscriptions.UnsuspendSubscriptionError,
      },
      options,
    );
  }

  /**
   * 定期課金の更新
   *
   * @remarks
   * 特定の定期課金の設定、決済手段、またはスケジュールを更新します。
   *
   * @returns 定期課金が正常に更新されました。
   *
   * @throws {@link Subscriptions.UpdateSubscriptionError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateSubscription(
    request: Subscriptions.UpdateSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.UpdateSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{id}"),
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
          schema: s.optional(s.lazy(() => subscriptionUpdateRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: subscriptionInternalSchema },
        errorFactory: Subscriptions.UpdateSubscriptionError,
      },
      options,
    );
  }

  /**
   * 予定された支払いの更新
   *
   * @remarks
   * 定期課金の、特定の予定された支払いプロパティを更新します。許可されている場合に期日を変更したり、支払いを支払済みとしてマークしたり、終了ステータスをスケジュールしたり、リトライ間隔を設定したりするために使用できます。
   *
   * @returns 予定された支払いが正常に更新されました。
   *
   * @throws {@link Subscriptions.UpdateSubscriptionPaymentError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateSubscriptionPayment(
    request: Subscriptions.UpdateSubscriptionPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionPayment, Subscriptions.UpdateSubscriptionPaymentError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default(
          "/stores/{storeId}/subscriptions/{subscriptionId}/payments/{paymentId}",
        ),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
          { name: "paymentId", value: request.paymentId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: subscriptionPatchPaymentRequestSchema },
      },
      {
        success: { kind: "json", schema: subscriptionPaymentSchema },
        errorFactory: Subscriptions.UpdateSubscriptionPaymentError,
      },
      options,
    );
  }

  /**
   * 定期課金のトークン更新
   *
   * @remarks
   * 定期課金に使用される決済手段（トランザクション・トークン）を置き換えます。カードの有効期限が切れた場合や、消費者が決済手段を切り替えたい場合に便利です。新しいトークンは同じ店舗に属し、アクティブであり、定期課金の処理モード（本番/テスト）と一致している必要があります。ワンタイムトークンは受け付けられません。継続（recurring）または定期課金（subscription）トークンを使用してください。トークンの決済手段は、その定期課金で許可されている必要があります。`subscription_plan`
   * または `installment_plan` を指定する場合は、プランで許可された決済手段でなければなりません（そうでない場合は
   * `SUBSCRIPTION_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN` または
   * `INSTALLMENT_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN`）。プランを指定しない場合は、カード、コンビニ決済、Apple Pay、Paidy
   * のトークンのみ使用できます。銀行振込のトークンは `PAYMENT_TYPE_NOT_ALLOWED` で拒否されます。
   *
   * @returns 定期課金のトークンが正常に更新されました。
   *
   * @throws {@link Subscriptions.UpdateSubscriptionTokenError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateSubscriptionToken(
    request: Subscriptions.UpdateSubscriptionTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.UpdateSubscriptionTokenError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/subscriptions/{subscriptionId}/token"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "subscriptionId", value: request.subscriptionId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: subscriptionPatchTokenRequestSchema },
      },
      {
        success: { kind: "json", schema: subscriptionInternalSchema },
        errorFactory: Subscriptions.UpdateSubscriptionTokenError,
      },
      options,
    );
  }
}

export namespace Subscriptions {
  export type CancelSubscriptionRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class CancelSubscriptionError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CancelSubscriptionError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type CreateSubscriptionRequest = {
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 定期課金作成リクエスト */
    body?: SubscriptionCreateRequest;
  };

  export type GetSubscriptionRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金 ID。 */
    id: string;
    /** true に設定すると、定期課金のステータスが初期ステータスの 'unverified' から別のステータスに変わるまで、API が内部でポーリングを行うよう指示します。 */
    polling?: boolean;
  };

  export class GetSubscriptionError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetSubscriptionError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type GetSubscriptionLatestChargeRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
  };

  export class GetSubscriptionLatestChargeError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetSubscriptionLatestChargeError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type GetSubscriptionPaymentRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 定期課金の予定された支払いの一意の識別子。 */
    paymentId: string;
  };

  export class GetSubscriptionPaymentError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetSubscriptionPaymentError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListAllSubscriptionsRequest = {
    /** メタデータ値による検索。 */
    search?: string;
    /** 現在のステータスで定期課金をフィルタリングします。 */
    status?: SubscriptionStatus;
    /** 処理モード（本番/テスト）で定期課金をフィルタリングします。 */
    mode?: ChargeMode;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listAllSubscriptionsRequestSchema: Schema<ListAllSubscriptionsRequest> = s.lazySchema(() =>
    s.object<ListAllSubscriptionsRequest>({
      search: s.optional(s.string()),
      status: s.optional(s.lazy(() => subscriptionStatusSchema)),
      mode: s.optional(s.lazy(() => chargeModeSchema)),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
    }),
  );

  export type ListChargesForSubscriptionPaymentRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 定期課金の予定された支払いの一意の識別子。 */
    paymentId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listChargesForSubscriptionPaymentRequestSchema: Schema<ListChargesForSubscriptionPaymentRequest> =
    s.lazySchema(() =>
      s.object<ListChargesForSubscriptionPaymentRequest>({
        storeId: s.string(),
        subscriptionId: s.string(),
        paymentId: s.string(),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string()),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      }),
    );

  export class ListChargesForSubscriptionPaymentError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListChargesForSubscriptionPaymentError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListStoreSubscriptionsRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** メタデータ値による検索。 */
    search?: string;
    /** 現在のステータスで定期課金をフィルタリングします。 */
    status?: SubscriptionStatus;
    /** 処理モード（本番/テスト）で定期課金をフィルタリングします。 */
    mode?: ChargeMode;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listStoreSubscriptionsRequestSchema: Schema<ListStoreSubscriptionsRequest> = s.lazySchema(() =>
    s.object<ListStoreSubscriptionsRequest>({
      storeId: s.string(),
      search: s.optional(s.string()),
      status: s.optional(s.lazy(() => subscriptionStatusSchema)),
      mode: s.optional(s.lazy(() => chargeModeSchema)),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
    }),
  );

  export type ListSubscriptionChargesRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listSubscriptionChargesRequestSchema: Schema<ListSubscriptionChargesRequest> = s.lazySchema(
    () =>
      s.object<ListSubscriptionChargesRequest>({
        merchantId: s.string(),
        storeId: s.string(),
        subscriptionId: s.string(),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string()),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      }),
  );

  export class ListSubscriptionChargesError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListSubscriptionChargesError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListSubscriptionPaymentsRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
  };

  export const listSubscriptionPaymentsRequestSchema: Schema<ListSubscriptionPaymentsRequest> = s.lazySchema(
    () =>
      s.object<ListSubscriptionPaymentsRequest>({
        storeId: s.string(),
        subscriptionId: s.string(),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string()),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      }),
  );

  export class ListSubscriptionPaymentsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListSubscriptionPaymentsError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type SimulateStoreSubscriptionPlanRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 定期課金・プラン・シミュレーションのリクエスト */
    body?: SubscriptionSimulationRequest;
  };

  export class SimulateStoreSubscriptionPlanError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<SimulateStoreSubscriptionPlanError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type SimulateSubscriptionPlanRequest = {
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 定期課金・プラン・シミュレーションのリクエスト */
    body?: SubscriptionSimulationRequest;
  };

  export class SimulateSubscriptionPlanError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<SimulateSubscriptionPlanError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type SuspendSubscriptionRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 定期課金一時停止用のリクエスト・ペイロード。 */
    body?: SubscriptionSuspendRequest;
  };

  export class SuspendSubscriptionError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<SuspendSubscriptionError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type UnsuspendSubscriptionRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
  };

  export class UnsuspendSubscriptionError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<UnsuspendSubscriptionError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type UpdateSubscriptionRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 定期課金で更新するプロパティ。 */
    body?: SubscriptionUpdateRequest;
  };

  export class UpdateSubscriptionError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateSubscriptionError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type UpdateSubscriptionPaymentRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 定期課金の予定された支払いの一意の識別子。 */
    paymentId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 予定された定期課金支払いを更新するためのリクエスト・ペイロード。 */
    body: SubscriptionPatchPaymentRequest;
  };

  export class UpdateSubscriptionPaymentError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateSubscriptionPaymentError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type UpdateSubscriptionTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 定期課金の一意の識別子。 */
    subscriptionId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 定期課金の決済トークンを置き換えるためのリクエスト・ペイロード。 */
    body: SubscriptionPatchTokenRequest;
  };

  export class UpdateSubscriptionTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateSubscriptionTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
