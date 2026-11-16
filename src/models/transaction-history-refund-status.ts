import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 個々の返金エントリのステータス。 */
export const TransactionHistoryRefundStatus = {
  Pending: "pending",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
} as const;
export type TransactionHistoryRefundStatus =
  | (typeof TransactionHistoryRefundStatus)[keyof typeof TransactionHistoryRefundStatus]
  | (string & {});

export const transactionHistoryRefundStatusSchema: EnumSchema<TransactionHistoryRefundStatus> =
  s.enumOf<TransactionHistoryRefundStatus>(TransactionHistoryRefundStatus);
