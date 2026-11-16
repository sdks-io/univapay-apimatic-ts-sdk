import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  chargeCreateRequestThreeDsInternalSchema,
  chargeCreateRequestThreeDsSchema,
  type ChargeCreateRequestThreeDs,
} from "./charge-create-request-three-ds.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import {
  subscriptionInstallmentPlanSchema,
  type SubscriptionInstallmentPlan,
} from "./subscription-installment-plan.js";
import { subscriptionPeriodSchema, type SubscriptionPeriod } from "./subscription-period.js";
import {
  subscriptionPlanSettingsSchema,
  type SubscriptionPlanSettings,
} from "./subscription-plan-settings.js";
import {
  subscriptionScheduleSettingsSchema,
  type SubscriptionScheduleSettings,
} from "./subscription-schedule-settings.js";

/** 定期課金作成用のリクエスト・ペイロード。 */
export type SubscriptionCreateRequest = {
  /** 定期決済用にオーソリされたトランザクション・トークン ID。 */
  transactionTokenId: string;
  /** 各サイクルで課金される金額。 */
  amount: number;
  /** ISO-4217 通貨コード。 */
  currency: string;
  /** オプション。初回決済に別の金額を適用する場合に指定します。 */
  initialAmount?: number;
  /** 定期課金周期のスキーマ。 */
  period?: SubscriptionPeriod;
  /** カスタム頻度を指定するための ISO-8601 期間形式（例：P3D, P2M）。'period' が指定されている場合は使用できません。 */
  cyclicalPeriod?: string;
  /** 定期課金に適用されるスケジュール設定。 */
  scheduleSettings?: SubscriptionScheduleSettings;
  /** クレジットカード会社側の分割払い（会社側分割）用の設定。 */
  installmentPlan?: SubscriptionInstallmentPlan;
  /** 回数限定定期課金（Univapay側での管理）用の設定。 */
  subscriptionPlan?: SubscriptionPlanSettings;
  /** true の場合、初回課金はオーソリ（保留）のみとなります。 @default false */
  firstChargeAuthorizationOnly?: boolean;
  /** オーソリのみが true の場合の自動キャプチャまでの期間を、ISO-8601 期間形式で指定します。許容される日数: P1D から P6D。 */
  firstChargeCaptureAfter?: string;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /**
   * 課金作成リクエストの3Dセキュアスキーマ。`mode`（および任意で `redirect_endpoint`）を指定して Univapay に 3DS を実行させるか、Univapay
   * の外部で 3DS 認証がすでに完了している場合は 6 つの外部 MPI フィールド（`authentication_value` から `transaction_status`
   * まで）すべてを指定してください。その場合、`mode` はサーバーによって自動的に `provided` に設定されるため、手動で送信しないでください。
   */
  threeDs?: ChargeCreateRequestThreeDs;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionCreateRequestProperties: s.Shape<SubscriptionCreateRequest> = {
  transactionTokenId: s.string(),
  amount: s.int(),
  currency: s.string(),
  initialAmount: s.optional(s.int()),
  period: s.optional(s.lazy(() => subscriptionPeriodSchema)),
  cyclicalPeriod: s.optional(s.string()),
  scheduleSettings: s.optional(s.lazy(() => subscriptionScheduleSettingsSchema)),
  installmentPlan: s.optional(s.lazy(() => subscriptionInstallmentPlanSchema)),
  subscriptionPlan: s.optional(s.lazy(() => subscriptionPlanSettingsSchema)),
  firstChargeAuthorizationOnly: s.defaulted(s.boolean(), false),
  firstChargeCaptureAfter: s.optional(s.string()),
  metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  threeDs: s.optional(s.lazy(() => chargeCreateRequestThreeDsInternalSchema)),
  _keysMap: {
    transactionTokenId: "transaction_token_id",
    initialAmount: "initial_amount",
    cyclicalPeriod: "cyclical_period",
    scheduleSettings: "schedule_settings",
    installmentPlan: "installment_plan",
    subscriptionPlan: "subscription_plan",
    firstChargeAuthorizationOnly: "first_charge_authorization_only",
    firstChargeCaptureAfter: "first_charge_capture_after",
    threeDs: "three_ds",
  },
};

export const subscriptionCreateRequestInternalSchema: Schema<SubscriptionCreateRequest> =
  s.object<SubscriptionCreateRequest>(subscriptionCreateRequestProperties, {
    additionalProperties: s.json(),
  });

export const subscriptionCreateRequestSchema: Schema<SubscriptionCreateRequest> = s.lazySchema(() =>
  s.object<SubscriptionCreateRequest>(
    {
      ...subscriptionCreateRequestProperties,
      threeDs: s.optional(s.lazy(() => chargeCreateRequestThreeDsSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
