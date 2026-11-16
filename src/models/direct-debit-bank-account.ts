import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  directDebitBankAccountStatusSchema,
  type DirectDebitBankAccountStatus,
} from "./direct-debit-bank-account-status.js";
import {
  directDebitBankAccountTypeSchema,
  type DirectDebitBankAccountType,
} from "./direct-debit-bank-account-type.js";
import {
  directDebitRegistrationOriginSchema,
  type DirectDebitRegistrationOrigin,
} from "./direct-debit-registration-origin.js";

/** 口座振替のために登録された消費者の銀行口座。 */
export type DirectDebitBankAccount = {
  /** 口座振替の銀行口座の一意な識別子 (銀行口座ID)。 */
  id?: string;
  /** 旧口座振替システムにおける加盟店の識別子。 */
  legacyStoreId?: string;
  /** この銀行口座を保有する加盟店。 */
  merchantId?: string;
  /** 加盟店が消費者に割り当てた会員番号。英数字。 */
  userNumber?: string;
  /** 消費者の銀行を識別する4桁のコード (銀行コード)。 */
  bankCode?: string;
  /** 半角カタカナの銀行名 (銀行名)。 */
  bankName?: string;
  /** 銀行の支店を識別する3桁のコード (支店コード)。 */
  branchCode?: string;
  /** 預金種類 — `regular` (普通)、`current` (当座)、`savings` (貯蓄)、`others` (その他)。 */
  bankAccountType?: DirectDebitBankAccountType;
  /** 口座名義。半角カタカナで指定します。全角文字は銀行側で拒否されます。 */
  bankAccountName?: string;
  /** 7桁の口座番号 (口座番号)。 */
  bankAccountNumber?: string;
  /** 銀行口座の登録元 — 加盟店管理画面からの登録は `merchant_console`、それ以外は `anywhere`。 */
  registrationOrigin?: DirectDebitRegistrationOrigin;
  /**
   * 銀行口座の状態 (有効・無効・登録失敗)。振替を登録できるのは `active` の口座のみです。`registration_failed` は銀行が口座情報を却下したことを意味します。
   */
  status?: DirectDebitBankAccountStatus;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankAccountProperties: s.Shape<DirectDebitBankAccount> = {
  id: s.optional(s.string()),
  legacyStoreId: s.optional(s.string()),
  merchantId: s.optional(s.string()),
  userNumber: s.optional(s.string()),
  bankCode: s.optional(s.string()),
  bankName: s.optional(s.string()),
  branchCode: s.optional(s.string()),
  bankAccountType: s.optional(s.lazy(() => directDebitBankAccountTypeSchema)),
  bankAccountName: s.optional(s.string()),
  bankAccountNumber: s.optional(s.string()),
  registrationOrigin: s.optional(s.lazy(() => directDebitRegistrationOriginSchema)),
  status: s.optional(s.lazy(() => directDebitBankAccountStatusSchema)),
  createdOn: s.optional(s.dateTime()),
  updatedOn: s.optional(s.dateTime()),
  _keysMap: {
    legacyStoreId: "legacy_store_id",
    merchantId: "merchant_id",
    userNumber: "user_number",
    bankCode: "bank_code",
    bankName: "bank_name",
    branchCode: "branch_code",
    bankAccountType: "bank_account_type",
    bankAccountName: "bank_account_name",
    bankAccountNumber: "bank_account_number",
    registrationOrigin: "registration_origin",
    createdOn: "created_on",
    updatedOn: "updated_on",
  },
};

export const directDebitBankAccountInternalSchema: Schema<DirectDebitBankAccount> =
  s.object<DirectDebitBankAccount>(directDebitBankAccountProperties, { additionalProperties: s.json() });

export const directDebitBankAccountSchema: Schema<DirectDebitBankAccount> = s.lazySchema(() =>
  s.object<DirectDebitBankAccount>(
    {
      ...directDebitBankAccountProperties,
      id: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
      legacyStoreId: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
      userNumber: s.optional(s.string().check(s.pattern("^[a-zA-Z0-9]+$"))),
      bankCode: s.optional(s.string().check(s.minLength(4), s.maxLength(4), s.pattern("^[0-9]{4}$"))),
      bankName: s.optional(s.string().check(s.maxLength(15))),
      branchCode: s.optional(s.string().check(s.minLength(3), s.maxLength(3), s.pattern("^[0-9]{3}$"))),
      bankAccountName: s.optional(
        s.string().check(s.maxLength(30), s.pattern("^[A-Z0-9ｱ-ﾝﾞﾟ().\\- ]{1,30}$")),
      ),
      bankAccountNumber: s.optional(
        s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{7}$")),
      ),
    },
    { additionalProperties: s.json() },
  ),
);
