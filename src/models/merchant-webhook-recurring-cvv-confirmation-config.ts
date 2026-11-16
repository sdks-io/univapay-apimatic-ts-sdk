import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookMoneyAmountSchema,
  type MerchantWebhookMoneyAmount,
} from "./merchant-webhook-money-amount.js";

/** リカーリングトークン課金における CVV 確認ルール。 */
export type MerchantWebhookRecurringCvvConfirmationConfig = {
  /** 継続課金の CVV 確認チェックを有効にします。 */
  enabled?: boolean | null;
  /** CVV 確認をトリガーする金額のしきい値。 */
  threshold?: MerchantWebhookMoneyAmount[] | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookRecurringCvvConfirmationConfigSchema: Schema<MerchantWebhookRecurringCvvConfirmationConfig> =
  s.object<MerchantWebhookRecurringCvvConfirmationConfig>(
    {
      enabled: s.optionalNullable(s.boolean()),
      threshold: s.optionalNullable(s.array(s.lazy(() => merchantWebhookMoneyAmountSchema))),
    },
    { additionalProperties: s.json() },
  );
