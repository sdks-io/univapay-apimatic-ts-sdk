import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** バックエンド設定モデルによってシリアライズされた金額オブジェクト。 */
export type MerchantWebhookMoneyAmount = {
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** ISO 4217 通貨コード。 */
  currency?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookMoneyAmountSchema: Schema<MerchantWebhookMoneyAmount> =
  s.object<MerchantWebhookMoneyAmount>(
    {
      amount: s.optional(s.int()),
      currency: s.optional(s.string()),
    },
    { additionalProperties: s.json() },
  );
