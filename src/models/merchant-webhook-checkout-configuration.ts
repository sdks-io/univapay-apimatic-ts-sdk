import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookCheckoutToggleSchema,
  type MerchantWebhookCheckoutToggle,
} from "./merchant-webhook-checkout-toggle.js";

/** チェックアウトフィールドの収集設定。 */
export type MerchantWebhookCheckoutConfiguration = {
  /** チェックアウト機能の切り替えトグル。 */
  ecEmail?: MerchantWebhookCheckoutToggle;
  /** チェックアウト機能の切り替えトグル。 */
  ecProducts?: MerchantWebhookCheckoutToggle;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookCheckoutConfigurationSchema: Schema<MerchantWebhookCheckoutConfiguration> =
  s.object<MerchantWebhookCheckoutConfiguration>(
    {
      ecEmail: s.optional(s.lazy(() => merchantWebhookCheckoutToggleSchema)),
      ecProducts: s.optional(s.lazy(() => merchantWebhookCheckoutToggleSchema)),
      _keysMap: {
        ecEmail: "ec_email",
        ecProducts: "ec_products",
      },
    },
    { additionalProperties: s.json() },
  );
