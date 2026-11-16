import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 元となる課金で使用された決済手段。 */
export const TransactionHistoryPaymentType = {
  Card: "card",
  QrScan: "qr_scan",
  QrMerchant: "qr_merchant",
  Konbini: "konbini",
  ApplePay: "apple_pay",
  Paidy: "paidy",
  Online: "online",
  BankTransfer: "bank_transfer",
} as const;
export type TransactionHistoryPaymentType =
  | (typeof TransactionHistoryPaymentType)[keyof typeof TransactionHistoryPaymentType]
  | (string & {});

export const transactionHistoryPaymentTypeSchema: EnumSchema<TransactionHistoryPaymentType> =
  s.enumOf<TransactionHistoryPaymentType>(TransactionHistoryPaymentType);
