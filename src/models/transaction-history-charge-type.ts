import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 元となる課金が通常の課金か CVV 認証かを示します。 */
export const TransactionHistoryChargeType = {
  Normal: "normal",
  CvvAuth: "cvv_auth",
} as const;
export type TransactionHistoryChargeType =
  | (typeof TransactionHistoryChargeType)[keyof typeof TransactionHistoryChargeType]
  | (string & {});

export const transactionHistoryChargeTypeSchema: EnumSchema<TransactionHistoryChargeType> =
  s.enumOf<TransactionHistoryChargeType>(TransactionHistoryChargeType);
