import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** Paidy 決済の設定。 */
export type MerchantWebhookPaidyConfiguration = {
  /** Paidy 決済を有効にします。 */
  enabled?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookPaidyConfigurationSchema: Schema<MerchantWebhookPaidyConfiguration> =
  s.object<MerchantWebhookPaidyConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
