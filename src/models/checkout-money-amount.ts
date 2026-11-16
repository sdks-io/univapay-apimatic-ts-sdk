import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** チェックアウト設定の上限やしきい値に使用される金額。 */
export type CheckoutMoneyAmount = {
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** 表示用にフォーマットされた金額。 */
  amountFormatted?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutMoneyAmountSchema: Schema<CheckoutMoneyAmount> = s.object<CheckoutMoneyAmount>(
  {
    amount: s.optional(s.int()),
    amountFormatted: s.optional(s.float64()),
    currency: s.optional(s.string()),
    _keysMap: {
      amountFormatted: "amount_formatted",
    },
  },
  { additionalProperties: s.json() },
);
