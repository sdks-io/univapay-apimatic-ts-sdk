import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** トランザクション・トークンタイプのスキーマ。 */
export const TransactionTokenType = {
  OneTime: "one_time",
  Subscription: "subscription",
  Recurring: "recurring",
} as const;
export type TransactionTokenType =
  | (typeof TransactionTokenType)[keyof typeof TransactionTokenType]
  | (string & {});

export const transactionTokenTypeSchema: EnumSchema<TransactionTokenType> =
  s.enumOf<TransactionTokenType>(TransactionTokenType);
