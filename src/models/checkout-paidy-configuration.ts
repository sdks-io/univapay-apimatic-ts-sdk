import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** Paidy 決済機能の切り替え設定。 */
export type CheckoutPaidyConfiguration = {
  /** Paidy 決済が有効かどうか。 */
  enabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutPaidyConfigurationSchema: Schema<CheckoutPaidyConfiguration> =
  s.object<CheckoutPaidyConfiguration>(
    {
      enabled: s.optional(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
