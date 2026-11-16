import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** トランザクション・トークン決済タイプのスキーマ。 */
export const TransactionTokenPaymentType = {
  Card: "card",
  Paidy: "paidy",
  Online: "online",
  Konbini: "konbini",
  BankTransfer: "bank_transfer",
  QrScan: "qr_scan",
  QrMerchant: "qr_merchant",
} as const;
export type TransactionTokenPaymentType =
  | (typeof TransactionTokenPaymentType)[keyof typeof TransactionTokenPaymentType]
  | (string & {});

export const transactionTokenPaymentTypeSchema: EnumSchema<TransactionTokenPaymentType> =
  s.enumOf<TransactionTokenPaymentType>(TransactionTokenPaymentType);
