import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookRecurringCvvConfirmationConfigSchema,
  type MerchantWebhookRecurringCvvConfirmationConfig,
} from "./merchant-webhook-recurring-cvv-confirmation-config.js";

/** 加盟店が継承したリカーリングトークンの設定。 */
export type MerchantWebhookRecurringTokenConfiguration = {
  /** 加盟店のリカーリングトークン利用権限。 */
  recurringType?: string | null;
  /** 最初の継続課金を行うまでに待機する ISO-8601 期間。 */
  chargeWaitPeriod?: string | null;
  /** リカーリングトークン課金における CVV 確認ルール。 */
  cardChargeCvvConfirmation?: MerchantWebhookRecurringCvvConfirmationConfig;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookRecurringTokenConfigurationSchema: Schema<MerchantWebhookRecurringTokenConfiguration> =
  s.object<MerchantWebhookRecurringTokenConfiguration>(
    {
      recurringType: s.optionalNullable(s.string()),
      chargeWaitPeriod: s.optionalNullable(s.string()),
      cardChargeCvvConfirmation: s.optional(
        s.lazy(() => merchantWebhookRecurringCvvConfirmationConfigSchema),
      ),
      _keysMap: {
        recurringType: "recurring_type",
        chargeWaitPeriod: "charge_wait_period",
        cardChargeCvvConfirmation: "card_charge_cvv_confirmation",
      },
    },
    { additionalProperties: s.json() },
  );
