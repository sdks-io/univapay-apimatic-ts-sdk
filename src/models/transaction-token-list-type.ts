import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** トークン一覧でフィルタリング可能なトークンタイプ。`one_time` トークンはフィルタリング対象にできず、この列挙には含まれません。 */
export const TransactionTokenListType = {
  Subscription: "subscription",
  Recurring: "recurring",
} as const;
export type TransactionTokenListType =
  | (typeof TransactionTokenListType)[keyof typeof TransactionTokenListType]
  | (string & {});

export const transactionTokenListTypeSchema: EnumSchema<TransactionTokenListType> =
  s.enumOf<TransactionTokenListType>(TransactionTokenListType);
