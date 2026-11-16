import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** カードごとの利用頻度（ベロシティ）制限の設定。 */
export type MerchantWebhookLimitChargeByCardConfiguration = {
  /** 時間枠内に許可される最大課金回数。 */
  quantityOfCharges?: number;
  /** ローリングウィンドウの ISO-8601 期間。 */
  durationWindow?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookLimitChargeByCardConfigurationSchema: Schema<MerchantWebhookLimitChargeByCardConfiguration> =
  s.object<MerchantWebhookLimitChargeByCardConfiguration>(
    {
      quantityOfCharges: s.optional(s.int()),
      durationWindow: s.optional(s.string()),
      _keysMap: {
        quantityOfCharges: "quantity_of_charges",
        durationWindow: "duration_window",
      },
    },
    { additionalProperties: s.json() },
  );
