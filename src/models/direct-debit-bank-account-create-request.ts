import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  directDebitBankAccountTypeSchema,
  type DirectDebitBankAccountType,
} from "./direct-debit-bank-account-type.js";

/** 消費者の銀行口座を口座振替に登録するためのリクエストペイロード。 */
export type DirectDebitBankAccountCreateRequest = {
  /** 加盟店が消費者に割り当てた会員番号。英数字。 */
  userNumber: string;
  /** 消費者の銀行を識別する4桁のコード (銀行コード)。 */
  bankCode: string;
  /** 半角カタカナの銀行名 (銀行名)。 */
  bankName: string;
  /** 銀行の支店を識別する3桁のコード (支店コード)。 */
  branchCode: string;
  /** 預金種類 — `regular` (普通)、`current` (当座)、`savings` (貯蓄)、`others` (その他)。 */
  bankAccountType: DirectDebitBankAccountType;
  /** 口座名義。半角カタカナで指定します。全角文字は銀行側で拒否されます。 */
  bankAccountName: string;
  /** 7桁の口座番号 (口座番号)。 */
  bankAccountNumber: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankAccountCreateRequestProperties: s.Shape<DirectDebitBankAccountCreateRequest> = {
  userNumber: s.string(),
  bankCode: s.string(),
  bankName: s.string(),
  branchCode: s.string(),
  bankAccountType: directDebitBankAccountTypeSchema,
  bankAccountName: s.string(),
  bankAccountNumber: s.string(),
  _keysMap: {
    userNumber: "user_number",
    bankCode: "bank_code",
    bankName: "bank_name",
    branchCode: "branch_code",
    bankAccountType: "bank_account_type",
    bankAccountName: "bank_account_name",
    bankAccountNumber: "bank_account_number",
  },
};

export const directDebitBankAccountCreateRequestInternalSchema: Schema<DirectDebitBankAccountCreateRequest> =
  s.object<DirectDebitBankAccountCreateRequest>(directDebitBankAccountCreateRequestProperties, {
    additionalProperties: s.json(),
  });

export const directDebitBankAccountCreateRequestSchema: Schema<DirectDebitBankAccountCreateRequest> =
  s.lazySchema(() =>
    s.object<DirectDebitBankAccountCreateRequest>(
      {
        ...directDebitBankAccountCreateRequestProperties,
        userNumber: s.string().check(s.pattern("^[a-zA-Z0-9]+$")),
        bankCode: s.string().check(s.minLength(4), s.maxLength(4), s.pattern("^[0-9]{4}$")),
        bankName: s.string().check(s.maxLength(15)),
        branchCode: s.string().check(s.minLength(3), s.maxLength(3), s.pattern("^[0-9]{3}$")),
        bankAccountName: s.string().check(s.maxLength(30), s.pattern("^[A-Z0-9ｱ-ﾝﾞﾟ().\\- ]{1,30}$")),
        bankAccountNumber: s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{7}$")),
      },
      { additionalProperties: s.json() },
    ),
  );
