import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 銀行振込課金の決済ステータス。 */
export const BankTransferPaymentStatus = {
  Unpaid: "unpaid",
  Insufficient: "insufficient",
  Exact: "exact",
  Exceeded: "exceeded",
} as const;
export type BankTransferPaymentStatus =
  | (typeof BankTransferPaymentStatus)[keyof typeof BankTransferPaymentStatus]
  | (string & {});

export const bankTransferPaymentStatusSchema: EnumSchema<BankTransferPaymentStatus> =
  s.enumOf<BankTransferPaymentStatus>(BankTransferPaymentStatus);
