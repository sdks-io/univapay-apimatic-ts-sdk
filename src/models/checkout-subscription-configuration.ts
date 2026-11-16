import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** Univapay がホストする定期課金機能の切り替え設定。 */
export type CheckoutSubscriptionConfiguration = {
  /** Univapay がホストする定期課金が有効かどうか。 */
  enabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutSubscriptionConfigurationSchema: Schema<CheckoutSubscriptionConfiguration> =
  s.object<CheckoutSubscriptionConfiguration>(
    {
      enabled: s.optional(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
