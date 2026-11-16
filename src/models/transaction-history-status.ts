import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 元となるリソースのステータス。課金の行はすべての値を使用しますが、返金の行では `pending`、`successful`、`failed`、`error` のいずれかのみが報告されます。
 */
export const TransactionHistoryStatus = {
  Pending: "pending",
  Authorized: "authorized",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
  Canceled: "canceled",
  Awaiting: "awaiting",
} as const;
export type TransactionHistoryStatus =
  | (typeof TransactionHistoryStatus)[keyof typeof TransactionHistoryStatus]
  | (string & {});

export const transactionHistoryStatusSchema: EnumSchema<TransactionHistoryStatus> =
  s.enumOf<TransactionHistoryStatus>(TransactionHistoryStatus);
