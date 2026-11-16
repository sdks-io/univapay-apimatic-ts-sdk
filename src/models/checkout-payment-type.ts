import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** チェックアウト設定全体で使用される決済手段の識別子。 */
export const CheckoutPaymentType = {
  Card: "card",
  QrScan: "qr_scan",
  QrMerchant: "qr_merchant",
  Konbini: "konbini",
  ApplePay: "apple_pay",
  Paidy: "paidy",
  Online: "online",
  BankTransfer: "bank_transfer",
} as const;
export type CheckoutPaymentType =
  | (typeof CheckoutPaymentType)[keyof typeof CheckoutPaymentType]
  | (string & {});

export const checkoutPaymentTypeSchema: EnumSchema<CheckoutPaymentType> =
  s.enumOf<CheckoutPaymentType>(CheckoutPaymentType);
