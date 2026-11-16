import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** チェックアウト機能の切り替えトグル。 */
export type MerchantWebhookCheckoutToggle = {
  /** ホストされた決済フローでこのチェックアウトフィールドを有効にします。 */
  enabled?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookCheckoutToggleSchema: Schema<MerchantWebhookCheckoutToggle> =
  s.object<MerchantWebhookCheckoutToggle>(
    {
      enabled: s.optionalNullable(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
