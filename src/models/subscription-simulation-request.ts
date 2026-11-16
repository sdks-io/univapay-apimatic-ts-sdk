import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionScheduleSettingsSchema,
  type SubscriptionScheduleSettings,
} from "./subscription-schedule-settings.js";
import {
  subscriptionSimulationPeriodSchema,
  type SubscriptionSimulationPeriod,
} from "./subscription-simulation-period.js";
import {
  subscriptionSimulationPlanSettingsSchema,
  type SubscriptionSimulationPlanSettings,
} from "./subscription-simulation-plan-settings.js";
import {
  transactionTokenPaymentTypeSchema,
  type TransactionTokenPaymentType,
} from "./transaction-token-payment-type.js";

/**
 * ライブの定期課金を作成せずに、定期課金の支払いスケジュールをシミュレートするためのリクエスト・ペイロードです。請求頻度を定義するには、'period' または 'cyclical_period'
 * のいずれか一方のみを指定してください。'installment_plan' と 'subscription_plan'
 * は互いに排他的であり、回数限定のスケジュールをモデル化する場合はどちらか一方のみを指定してください。
 */
export type SubscriptionSimulationRequest = {
  /** 各サイクルで課金される金額。正の整数を指定してください。 */
  amount: number;
  /** ISO-4217 通貨コード。 */
  currency: string;
  /** トランザクション・トークン決済タイプのスキーマ。 */
  paymentType: TransactionTokenPaymentType;
  /** オプション。初回決済に別の金額を適用する場合に指定します。0 以上の値を指定してください。 */
  initialAmount?: number;
  /** シミュレートされたスケジュールの請求頻度。ライブでの定期課金作成に使用する `SubscriptionPeriod` にはない `bimonthly`（隔月）を含みます。 */
  period?: SubscriptionSimulationPeriod;
  /** カスタム頻度を指定するための ISO-8601 期間形式（例：P3D, P2M）。'period' と同時に指定することはできません。いずれか一方のみを指定してください。 */
  cyclicalPeriod?: string;
  /** 定期課金に適用されるスケジュール設定。 */
  scheduleSettings: SubscriptionScheduleSettings;
  /** 分割払いプランまたは Univapay 側の定期課金プランをシミュレートするための、サイクル数を限定するプラン設定。 */
  installmentPlan?: SubscriptionSimulationPlanSettings;
  /** 分割払いプランまたは Univapay 側の定期課金プランをシミュレートするための、サイクル数を限定するプラン設定。 */
  subscriptionPlan?: SubscriptionSimulationPlanSettings;
  /** 直接通貨処理のみを許可するかどうか。 */
  onlyDirectCurrency?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionSimulationRequestProperties: s.Shape<SubscriptionSimulationRequest> = {
  amount: s.int(),
  currency: s.string(),
  paymentType: transactionTokenPaymentTypeSchema,
  initialAmount: s.optional(s.int()),
  period: s.optional(s.lazy(() => subscriptionSimulationPeriodSchema)),
  cyclicalPeriod: s.optional(s.string()),
  scheduleSettings: subscriptionScheduleSettingsSchema,
  installmentPlan: s.optional(s.lazy(() => subscriptionSimulationPlanSettingsSchema)),
  subscriptionPlan: s.optional(s.lazy(() => subscriptionSimulationPlanSettingsSchema)),
  onlyDirectCurrency: s.optional(s.boolean()),
  _keysMap: {
    paymentType: "payment_type",
    initialAmount: "initial_amount",
    cyclicalPeriod: "cyclical_period",
    scheduleSettings: "schedule_settings",
    installmentPlan: "installment_plan",
    subscriptionPlan: "subscription_plan",
    onlyDirectCurrency: "only_direct_currency",
  },
};

export const subscriptionSimulationRequestInternalSchema: Schema<SubscriptionSimulationRequest> =
  s.object<SubscriptionSimulationRequest>(subscriptionSimulationRequestProperties, {
    additionalProperties: s.json(),
  });

export const subscriptionSimulationRequestSchema: Schema<SubscriptionSimulationRequest> = s.lazySchema(() =>
  s.object<SubscriptionSimulationRequest>(
    {
      ...subscriptionSimulationRequestProperties,
      amount: s.int().check(s.gte(1)),
      initialAmount: s.optional(s.int().check(s.gte(0))),
    },
    { additionalProperties: s.json() },
  ),
);
