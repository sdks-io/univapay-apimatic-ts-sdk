import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** コンビニエンスストア決済の設定。 */
export type MerchantWebhookConvenienceConfiguration = {
  /** コンビニ決済を有効にします。 */
  enabled?: boolean | null;
  /** コンビニ決済の有効期限が切れるまでの ISO-8601 期間。 */
  expiration?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookConvenienceConfigurationSchema: Schema<MerchantWebhookConvenienceConfiguration> =
  s.object<MerchantWebhookConvenienceConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      expiration: s.optionalNullable(s.string()),
    },
    { additionalProperties: s.json() },
  );
