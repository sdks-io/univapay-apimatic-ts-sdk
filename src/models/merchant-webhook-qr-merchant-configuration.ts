import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** ユーザースキャン（QRコード表示）決済の設定。 */
export type MerchantWebhookQrMerchantConfiguration = {
  /** ユーザースキャン決済フローを有効にします。 */
  enabled?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookQrMerchantConfigurationSchema: Schema<MerchantWebhookQrMerchantConfiguration> =
  s.object<MerchantWebhookQrMerchantConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
    },
    { additionalProperties: s.json() },
  );
