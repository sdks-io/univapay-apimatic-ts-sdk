import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 銀行振込台帳モードのスキーマ。 */
export const BankTransferLedgerMode = {
  Live: "live",
  Test: "test",
} as const;
export type BankTransferLedgerMode =
  | (typeof BankTransferLedgerMode)[keyof typeof BankTransferLedgerMode]
  | (string & {});

export const bankTransferLedgerModeSchema: EnumSchema<BankTransferLedgerMode> =
  s.enumOf<BankTransferLedgerMode>(BankTransferLedgerMode);
