import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** EC メールに関するチェックアウト設定。 */
export type CheckoutEcEmailConfiguration = {
  /** EC メール受信が有効かどうか。 */
  enabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutEcEmailConfigurationSchema: Schema<CheckoutEcEmailConfiguration> =
  s.object<CheckoutEcEmailConfiguration>(
    {
      enabled: s.optional(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
