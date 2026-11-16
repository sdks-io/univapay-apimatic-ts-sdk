import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 決済を処理したプロセッサーまたはサービスプロバイダー。 */
export const TransactionHistoryServiceProvider = {
  Credit: "credit",
  Convenience: "convenience",
  BankTransfer: "bank_transfer",
  Paidy: "paidy",
  PayPay: "pay_pay",
  Alipay: "alipay",
  WeChat: "we_chat",
  Docomo: "docomo",
  Mercari: "mercari",
  Au: "au",
  Rakuten: "rakuten",
  Bartong: "bartong",
  Jkopay: "jkopay",
  GinkoPay: "ginko_pay",
  AeonPay: "aeon_pay",
  Eromnet: "eromnet",
  Test: "test",
} as const;
export type TransactionHistoryServiceProvider =
  | (typeof TransactionHistoryServiceProvider)[keyof typeof TransactionHistoryServiceProvider]
  | (string & {});

export const transactionHistoryServiceProviderSchema: EnumSchema<TransactionHistoryServiceProvider> =
  s.enumOf<TransactionHistoryServiceProvider>(TransactionHistoryServiceProvider);
