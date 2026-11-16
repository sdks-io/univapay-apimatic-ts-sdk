import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
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
  subscriptionUpdateNextPaymentSchema,
  type SubscriptionUpdateNextPayment,
} from "./subscription-update-next-payment.js";
import {
  subscriptionUpdateScheduleSettingsSchema,
  type SubscriptionUpdateScheduleSettings,
} from "./subscription-update-schedule-settings.js";
import {
  subscriptionUpdateStatusSchema,
  type SubscriptionUpdateStatus,
} from "./subscription-update-status.js";

/** 定期課金更新用のリクエスト・ペイロード。 */
export type SubscriptionUpdateRequest = {
  /**
   * 定期課金に使用されるトランザクション・トークン ID。決済手段を更新する場合（例：カードの有効期限が切れたときなど）に変更できます。ステータスが
   * `unconfirmed`（未確認）、`unpaid`（未払い）、`current`（有効）、または `suspended`（停止中）の場合にのみ許可されます。
   */
  transactionTokenId?: string;
  /**
   * 定期課金の金額（次々回以降のサイクルに適用されます）。回数限定定期課金では利用できません。直近の次回支払い金額を変更するには、代わりに `next_payment.amount`
   * を更新してください。
   */
  amount?: number;
  /** 定期課金周期のスキーマ。 */
  period?: SubscriptionPeriod;
  /** カスタム頻度用の ISO-8601 期間（例：P3D、P2M）。`period` と同時に使用することはできません。定期課金の最初の支払いが完了する前にのみ許可されます。 */
  cyclicalPeriod?: string;
  /** 最初の課金の別金額。定期課金のステータスがまだ編集可能な間（開始前）にのみ許可され、アプリケーション・トークンのシークレットが必要です。 */
  initialAmount?: number;
  /** 回数限定定期課金（Univapay側での管理）用の設定。 */
  subscriptionPlan?: SubscriptionPlanSettings;
  /** クレジットカード会社側の分割払い（会社側分割）用の設定。 */
  installmentPlan?: SubscriptionInstallmentPlan;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 定期課金のステータスを更新します。`suspended`: 定期課金を一時停止します。`unpaid`: 一時停止中の定期課金を再開します。 */
  status?: SubscriptionUpdateStatus;
  /** 定期課金で更新可能なスケジュール設定。 */
  scheduleSettings?: SubscriptionUpdateScheduleSettings;
  /** 次回スケジュールされた支払いに対して更新可能なフィールド。 */
  nextPayment?: SubscriptionUpdateNextPayment;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionUpdateRequestSchema: Schema<SubscriptionUpdateRequest> =
  s.object<SubscriptionUpdateRequest>(
    {
      transactionTokenId: s.optional(s.string()),
      amount: s.optional(s.int()),
      period: s.optional(s.lazy(() => subscriptionPeriodSchema)),
      cyclicalPeriod: s.optional(s.string()),
      initialAmount: s.optional(s.int()),
      subscriptionPlan: s.optional(s.lazy(() => subscriptionPlanSettingsSchema)),
      installmentPlan: s.optional(s.lazy(() => subscriptionInstallmentPlanSchema)),
      metadata: s.optional(s.lazy(() => genericMetadataSchema)),
      status: s.optional(s.lazy(() => subscriptionUpdateStatusSchema)),
      scheduleSettings: s.optional(s.lazy(() => subscriptionUpdateScheduleSettingsSchema)),
      nextPayment: s.optional(s.lazy(() => subscriptionUpdateNextPaymentSchema)),
      _keysMap: {
        transactionTokenId: "transaction_token_id",
        cyclicalPeriod: "cyclical_period",
        initialAmount: "initial_amount",
        subscriptionPlan: "subscription_plan",
        installmentPlan: "installment_plan",
        scheduleSettings: "schedule_settings",
        nextPayment: "next_payment",
      },
    },
    { additionalProperties: s.json() },
  );
