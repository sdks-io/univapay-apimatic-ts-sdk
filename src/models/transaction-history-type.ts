import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** この行が課金と返金のどちらを表すか。 */
export const TransactionHistoryType = {
  Charge: "charge",
  Refund: "refund",
} as const;
export type TransactionHistoryType =
  | (typeof TransactionHistoryType)[keyof typeof TransactionHistoryType]
  | (string & {});

export const transactionHistoryTypeSchema: EnumSchema<TransactionHistoryType> =
  s.enumOf<TransactionHistoryType>(TransactionHistoryType);
