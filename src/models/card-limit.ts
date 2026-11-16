import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** カード決済に適用される、カードごとの利用上限額。一定期間ごとに評価されます。 */
export type CardLimit = {
  /** `duration` の期間内に1枚のカードが利用できる最大金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** 表示用にフォーマットされた上限金額。 */
  amountFormatted?: number;
  /** 上限が評価される期間を表す ISO-8601 期間形式（例：P1M）。 */
  duration?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cardLimitSchema: Schema<CardLimit> = s.object<CardLimit>(
  {
    amount: s.optional(s.int()),
    currency: s.optional(s.string()),
    amountFormatted: s.optional(s.float64()),
    duration: s.optional(s.string()),
    _keysMap: {
      amountFormatted: "amount_formatted",
    },
  },
  { additionalProperties: s.json() },
);
