import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** トランザクション・トークン作成リクエスト決済タイプのスキーマ。 */
export const TransactionTokenCreateRequestPaymentType = {
  Card: "card",
  Online: "online",
  Konbini: "konbini",
  BankTransfer: "bank_transfer",
  QrScan: "qr_scan",
  QrMerchant: "qr_merchant",
} as const;
export type TransactionTokenCreateRequestPaymentType =
  | (typeof TransactionTokenCreateRequestPaymentType)[keyof typeof TransactionTokenCreateRequestPaymentType]
  | (string & {});

export const transactionTokenCreateRequestPaymentTypeSchema: EnumSchema<TransactionTokenCreateRequestPaymentType> =
  s.enumOf<TransactionTokenCreateRequestPaymentType>(TransactionTokenCreateRequestPaymentType);
