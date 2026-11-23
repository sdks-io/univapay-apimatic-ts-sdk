import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookLimitChargeByCardConfigurationSchema,
  type MerchantWebhookLimitChargeByCardConfiguration,
} from "./merchant-webhook-limit-charge-by-card-configuration.js";
import {
  merchantWebhookLimitRefundBySalesConfigurationSchema,
  type MerchantWebhookLimitRefundBySalesConfiguration,
} from "./merchant-webhook-limit-refund-by-sales-configuration.js";
import {
  restrictIpAfterFailedChargeConfigSchema,
  type RestrictIpAfterFailedChargeConfig,
} from "./restrict-ip-after-failed-charge-config.js";

/** 加盟店レベルの不正利用対策および返金安全性に関する設定。 */
export type MerchantWebhookSecurityConfiguration = {
  /** カード課金の試行間に必要な ISO-8601 クールダウン期間。 */
  cardChargeCooldown?: string | null;
  /** 定期課金の課金試行の間に必要な ISO-8601 クールダウン期間。 */
  subscriptionCooldown?: string | null;
  /** べき等カード課金キーを再利用するための ISO-8601 クールダウン期間。 */
  idempotentCardChargeCooldown?: string | null;
  /** べき等定期課金キーを再利用するための ISO-8601 クールダウン期間。 */
  idempotentSubscriptionCooldown?: string | null;
  /** 課金失敗が繰り返された後に適用される IP 制限ポリシー。 */
  restrictIpAfterFailedCharge?: RestrictIpAfterFailedChargeConfig;
  /** 不審なログインアクティビティをレビューするための遡り期間。 */
  inspectSuspiciousLoginAfter?: string | null;
  /** 制限がかかるまでに許容される最大返金対売上比率。 */
  refundPercentLimit?: number | null;
  limitChargeByCardConfiguration?: MerchantWebhookLimitChargeByCardConfiguration | null;
  /** 保護された返金アクションを進める前に確認を要求します。 */
  confirmationRequired?: boolean | null;
  /** 確認チェックの対象となる、通貨の最小単位による最小返金金額。 */
  minRefundThreshold?: number | null;
  limitRefundBySales?: MerchantWebhookLimitRefundBySalesConfiguration | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookSecurityConfigurationSchema: Schema<MerchantWebhookSecurityConfiguration> =
  s.object<MerchantWebhookSecurityConfiguration>(
    {
      cardChargeCooldown: s.optionalNullable(s.string()),
      subscriptionCooldown: s.optionalNullable(s.string()),
      idempotentCardChargeCooldown: s.optionalNullable(s.string()),
      idempotentSubscriptionCooldown: s.optionalNullable(s.string()),
      restrictIpAfterFailedCharge: s.optional(s.lazy(() => restrictIpAfterFailedChargeConfigSchema)),
      inspectSuspiciousLoginAfter: s.optionalNullable(s.string()),
      refundPercentLimit: s.optionalNullable(s.float64()),
      limitChargeByCardConfiguration: s.optionalNullable(
        s.lazy(() => merchantWebhookLimitChargeByCardConfigurationSchema),
      ),
      confirmationRequired: s.optionalNullable(s.boolean()),
      minRefundThreshold: s.optionalNullable(s.int()),
      limitRefundBySales: s.optionalNullable(
        s.lazy(() => merchantWebhookLimitRefundBySalesConfigurationSchema),
      ),
      _keysMap: {
        cardChargeCooldown: "card_charge_cooldown",
        subscriptionCooldown: "subscription_cooldown",
        idempotentCardChargeCooldown: "idempotent_card_charge_cooldown",
        idempotentSubscriptionCooldown: "idempotent_subscription_cooldown",
        restrictIpAfterFailedCharge: "restrict_ip_after_failed_charge",
        inspectSuspiciousLoginAfter: "inspect_suspicious_login_after",
        refundPercentLimit: "refund_percent_limit",
        limitChargeByCardConfiguration: "limit_charge_by_card_configuration",
        confirmationRequired: "confirmation_required",
        minRefundThreshold: "min_refund_threshold",
        limitRefundBySales: "limit_refund_by_sales",
      },
    },
    { additionalProperties: s.json() },
  );
