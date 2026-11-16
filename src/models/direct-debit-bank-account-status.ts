import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 銀行口座の状態 (有効・無効・登録失敗)。振替を登録できるのは `active` の口座のみです。`registration_failed` は銀行が口座情報を却下したことを意味します。 */
export const DirectDebitBankAccountStatus = {
  Active: "active",
  Inactive: "inactive",
  RegistrationFailed: "registration_failed",
} as const;
export type DirectDebitBankAccountStatus =
  | (typeof DirectDebitBankAccountStatus)[keyof typeof DirectDebitBankAccountStatus]
  | (string & {});

export const directDebitBankAccountStatusSchema: EnumSchema<DirectDebitBankAccountStatus> =
  s.enumOf<DirectDebitBankAccountStatus>(DirectDebitBankAccountStatus);
