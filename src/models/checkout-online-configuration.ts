import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** オンラインリダイレクト／ウォレット決済機能の切り替え設定。 */
export type CheckoutOnlineConfiguration = {
  /** オンラインリダイレクトおよびウォレット決済が有効かどうか。 */
  enabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutOnlineConfigurationSchema: Schema<CheckoutOnlineConfiguration> =
  s.object<CheckoutOnlineConfiguration>(
    {
      enabled: s.optional(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
