import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 預金種類 — `regular` (普通)、`current` (当座)、`savings` (貯蓄)、`others` (その他)。 */
export const DirectDebitBankAccountType = {
  Regular: "regular",
  Current: "current",
  Savings: "savings",
  Others: "others",
} as const;
export type DirectDebitBankAccountType =
  | (typeof DirectDebitBankAccountType)[keyof typeof DirectDebitBankAccountType]
  | (string & {});

export const directDebitBankAccountTypeSchema: EnumSchema<DirectDebitBankAccountType> =
  s.enumOf<DirectDebitBankAccountType>(DirectDebitBankAccountType);
