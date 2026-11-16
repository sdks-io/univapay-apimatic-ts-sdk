import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { chargeModeSchema, type ChargeMode } from "./charge-mode.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import {
  subscriptionInstallmentPlanResponseSchema,
  type SubscriptionInstallmentPlanResponse,
} from "./subscription-installment-plan-response.js";
import { subscriptionNextPaymentSchema, type SubscriptionNextPayment } from "./subscription-next-payment.js";
import { subscriptionPeriodSchema, type SubscriptionPeriod } from "./subscription-period.js";
import {
  subscriptionPlanSettingsSchema,
  type SubscriptionPlanSettings,
} from "./subscription-plan-settings.js";
import {
  subscriptionScheduleSettingsSchema,
  type SubscriptionScheduleSettings,
} from "./subscription-schedule-settings.js";
import { subscriptionStatusSchema, type SubscriptionStatus } from "./subscription-status.js";
import {
  subscriptionThreeDsInternalSchema,
  subscriptionThreeDsSchema,
  type SubscriptionThreeDs,
} from "./subscription-three-ds.js";

/** 定期課金オブジェクト。定期的な決済スケジュールを表します。 */
export type Subscription = {
  /** 一意の識別子。 */
  id?: string;
  /** 店舗識別子。 */
  storeId?: string;
  /** トランザクション・トークン識別子。 */
  transactionTokenId?: string;
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** 表示用にフォーマットされた金額。 */
  amountFormatted?: number;
  /** 通貨の最小単位による初回決済金額。 */
  initialAmount?: number | null;
  /** 表示用にフォーマットされた初回決済金額。 */
  initialAmountFormatted?: number | null;
  /** 定期課金サイクルが開始されるタイムスタンプ。 */
  subsequentCyclesStart?: Date | null;
  /** 定期課金に適用されるスケジュール設定。 */
  scheduleSettings?: SubscriptionScheduleSettings;
  /** 直接通貨処理のみを許可するかどうか。 */
  onlyDirectCurrency?: boolean;
  /** ISO-8601 期間形式（例：P3D）。 */
  firstChargeCaptureAfter?: string | null;
  /** 初回決済をオーソリ（保留）のみにするかどうか。 */
  firstChargeAuthorizationOnly?: boolean;
  /** 定期課金ステータスのスキーマ。 */
  status?: SubscriptionStatus;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 課金モードのスキーマ。 */
  mode?: ChargeMode;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** 定期課金の決済に適用される3Dセキュアの設定とリダイレクト情報。 */
  threeDs?: SubscriptionThreeDs;
  /** 定期課金周期のスキーマ。 */
  period?: SubscriptionPeriod;
  /**
   * カスタムの請求頻度を表す ISO-8601 期間形式（例：P3D, P1M）。固定の期間プリセットではなくカスタムのサイクル長を使用する定期課金の場合、`period`
   * の代わりに返されます。`period` とは互いに排他的であり、どちらか一方のみが存在します。
   */
  cyclicalPeriod?: string | null;
  /** 定期課金の次回スケジュールされた支払いの詳細。 */
  nextPayment?: SubscriptionNextPayment;
  /**
   * 定期課金が完了するまでの残りの請求サイクル数。回数限定プラン（`subscription_plan` または `installment_plan`）の場合にのみ存在し、無期限の定期課金では
   * `null` になります。
   */
  cyclesLeft?: number | null;
  /** 回数限定定期課金（Univapay側での管理）用の設定。 */
  subscriptionPlan?: SubscriptionPlanSettings;
  /**
   * 定期課金に適用された分割払いプラン（APIレスポンスとして返される値）。カード会社側の分割払いプラン（`revolving`、`fixed_cycles`）と、レガシーな固定金額の分割払いプラン（`fixed_cycle_amount`）の両方に対応します。
   */
  installmentPlan?: SubscriptionInstallmentPlanResponse;
  /** 定期課金の分割払いプランに関連付けられた課金の識別子。`installment_plan` が設定されている場合にのみ存在します。 */
  chargeId?: string | null;
  /** プランの残り期間で課金される予定の残り金額（通貨の最小単位）。回数限定プランの場合にのみ存在します。 */
  amountLeft?: number | null;
  /** `amount_left` を表示用にフォーマットした値。 */
  amountLeftFormatted?: number | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionProperties: s.Shape<Subscription> = {
  id: s.optional(s.string()),
  storeId: s.optional(s.string()),
  transactionTokenId: s.optional(s.string()),
  amount: s.optional(s.int()),
  currency: s.optional(s.string()),
  amountFormatted: s.optional(s.float64()),
  initialAmount: s.optionalNullable(s.int()),
  initialAmountFormatted: s.optionalNullable(s.float64()),
  subsequentCyclesStart: s.optionalNullable(s.dateTime()),
  scheduleSettings: s.optional(s.lazy(() => subscriptionScheduleSettingsSchema)),
  onlyDirectCurrency: s.optional(s.boolean()),
  firstChargeCaptureAfter: s.optionalNullable(s.string()),
  firstChargeAuthorizationOnly: s.optional(s.boolean()),
  status: s.optional(s.lazy(() => subscriptionStatusSchema)),
  metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  mode: s.optional(s.lazy(() => chargeModeSchema)),
  createdOn: s.optional(s.dateTime()),
  threeDs: s.optional(s.lazy(() => subscriptionThreeDsInternalSchema)),
  period: s.optional(s.lazy(() => subscriptionPeriodSchema)),
  cyclicalPeriod: s.optionalNullable(s.string()),
  nextPayment: s.optional(s.lazy(() => subscriptionNextPaymentSchema)),
  cyclesLeft: s.optionalNullable(s.int()),
  subscriptionPlan: s.optional(s.lazy(() => subscriptionPlanSettingsSchema)),
  installmentPlan: s.optional(s.lazy(() => subscriptionInstallmentPlanResponseSchema)),
  chargeId: s.optionalNullable(s.string()),
  amountLeft: s.optionalNullable(s.int()),
  amountLeftFormatted: s.optionalNullable(s.float64()),
  _keysMap: {
    storeId: "store_id",
    transactionTokenId: "transaction_token_id",
    amountFormatted: "amount_formatted",
    initialAmount: "initial_amount",
    initialAmountFormatted: "initial_amount_formatted",
    subsequentCyclesStart: "subsequent_cycles_start",
    scheduleSettings: "schedule_settings",
    onlyDirectCurrency: "only_direct_currency",
    firstChargeCaptureAfter: "first_charge_capture_after",
    firstChargeAuthorizationOnly: "first_charge_authorization_only",
    createdOn: "created_on",
    threeDs: "three_ds",
    cyclicalPeriod: "cyclical_period",
    nextPayment: "next_payment",
    cyclesLeft: "cycles_left",
    subscriptionPlan: "subscription_plan",
    installmentPlan: "installment_plan",
    chargeId: "charge_id",
    amountLeft: "amount_left",
    amountLeftFormatted: "amount_left_formatted",
  },
};

export const subscriptionInternalSchema: Schema<Subscription> = s.object<Subscription>(
  subscriptionProperties,
  { additionalProperties: s.json() },
);

export const subscriptionSchema: Schema<Subscription> = s.lazySchema(() =>
  s.object<Subscription>(
    {
      ...subscriptionProperties,
      threeDs: s.optional(s.lazy(() => subscriptionThreeDsSchema)),
      cyclesLeft: s.optionalNullable(s.int().check(s.gte(0))),
      amountLeft: s.optionalNullable(s.int().check(s.gte(0))),
    },
    { additionalProperties: s.json() },
  ),
);
