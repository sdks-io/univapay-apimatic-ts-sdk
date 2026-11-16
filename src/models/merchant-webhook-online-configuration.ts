import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** オンライン（各種ウォレット・リダイレクト）決済の設定。 */
export type MerchantWebhookOnlineConfiguration = {
  /** オンラインリダイレクトおよびウォレット決済フローを有効にします。 */
  enabled?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookOnlineConfigurationSchema: Schema<MerchantWebhookOnlineConfiguration> =
  s.object<MerchantWebhookOnlineConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
