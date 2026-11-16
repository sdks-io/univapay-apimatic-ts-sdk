import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 銀行振込台帳の銀行台帳タイプのスキーマ。 */
export const BankTransferLedgerBankLedgerType = {
  Deposit: "deposit",
  Payment: "payment",
} as const;
export type BankTransferLedgerBankLedgerType =
  | (typeof BankTransferLedgerBankLedgerType)[keyof typeof BankTransferLedgerBankLedgerType]
  | (string & {});

export const bankTransferLedgerBankLedgerTypeSchema: EnumSchema<BankTransferLedgerBankLedgerType> =
  s.enumOf<BankTransferLedgerBankLedgerType>(BankTransferLedgerBankLedgerType);
