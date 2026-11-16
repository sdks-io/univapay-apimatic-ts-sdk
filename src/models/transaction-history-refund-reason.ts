import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 返金の理由コード。 */
export const TransactionHistoryRefundReason = {
  Duplicate: "duplicate",
  Fraud: "fraud",
  CustomerRequest: "customer_request",
  SystemFailure: "system_failure",
  Chargeback: "chargeback",
  ChargebackFeeExempt: "chargeback_fee_exempt",
  ChargebackReverse: "chargeback_reverse",
} as const;
export type TransactionHistoryRefundReason =
  | (typeof TransactionHistoryRefundReason)[keyof typeof TransactionHistoryRefundReason]
  | (string & {});

export const transactionHistoryRefundReasonSchema: EnumSchema<TransactionHistoryRefundReason> =
  s.enumOf<TransactionHistoryRefundReason>(TransactionHistoryRefundReason);
