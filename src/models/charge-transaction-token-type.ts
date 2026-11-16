import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 課金トランザクション・トークンタイプのスキーマ。 */
export const ChargeTransactionTokenType = {
  OneTime: "one_time",
  Subscription: "subscription",
  Recurring: "recurring",
} as const;
export type ChargeTransactionTokenType =
  | (typeof ChargeTransactionTokenType)[keyof typeof ChargeTransactionTokenType]
  | (string & {});

export const chargeTransactionTokenTypeSchema: EnumSchema<ChargeTransactionTokenType> =
  s.enumOf<ChargeTransactionTokenType>(ChargeTransactionTokenType);
