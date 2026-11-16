import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** EC 商品明細に関するチェックアウト設定。 */
export type CheckoutEcProductsConfiguration = {
  /** EC 商品明細が有効かどうか。 */
  enabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutEcProductsConfigurationSchema: Schema<CheckoutEcProductsConfiguration> =
  s.object<CheckoutEcProductsConfiguration>(
    {
      enabled: s.optional(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
