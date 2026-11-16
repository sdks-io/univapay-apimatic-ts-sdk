import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  directDebitBankAccountTypeSchema,
  type DirectDebitBankAccountType,
} from "./direct-debit-bank-account-type.js";
import {
  directDebitBankTransferErrorSchema,
  type DirectDebitBankTransferError,
} from "./direct-debit-bank-transfer-error.js";
import {
  directDebitBankTransferLockSchema,
  type DirectDebitBankTransferLock,
} from "./direct-debit-bank-transfer-lock.js";
import {
  directDebitBankTransferStatusSchema,
  type DirectDebitBankTransferStatus,
} from "./direct-debit-bank-transfer-status.js";
import { directDebitDebitDateSchema, type DirectDebitDebitDate } from "./direct-debit-debit-date.js";

/** 登録済みの銀行口座から資金を引き落とす1件の予約。銀行口座の情報は登録時点で振替へ複製されるため、口座を後から編集しても過去の振替は変わりません。 */
export type DirectDebitBankTransfer = {
  /** 口座振替の振替の一意な識別子 (振替ID)。 */
  id?: string;
  /** 旧口座振替システムにおける加盟店の識別子。 */
  legacyStoreId?: string;
  /** この振替を保有する加盟店。 */
  merchantId?: string;
  /** 口座振替の銀行口座の一意な識別子 (銀行口座ID)。 */
  bankAccountId?: string;
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
  /** 振替金額 (日本円)。ゼロより大きい整数である必要があります。 */
  amount?: number;
  /** 毎月の振替日区分 — 資金は14日または27日に引き落とされます。 */
  debitDate?: DirectDebitDebitDate;
  /** 振替日区分から算出された、実際に資金が引き落とされる営業日 (計算された振替日)。 */
  calculatedDebitDate?: string;
  /** 振替をまだ編集できるかどうか。振替は該当する振替日区分のアップロード期限までは `unlocked` で、期限を過ぎると `locked` となり、変更も削除もできなくなります。 */
  lock?: DirectDebitBankTransferLock;
  /**
   * 振替の状態。銀行から結果が届くまでは `awaiting` で、その後 `successful` または `failed` になります。結果は振替日の即日ではなく数日後に反映されます。
   */
  status?: DirectDebitBankTransferStatus;
  /** 失敗理由。振替が結果待ちまたは成功している場合は null。 */
  error?: DirectDebitBankTransferError | null;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankTransferProperties: s.Shape<DirectDebitBankTransfer> = {
  id: s.optional(s.string()),
  legacyStoreId: s.optional(s.string()),
  merchantId: s.optional(s.string()),
  bankAccountId: s.optional(s.string()),
  userNumber: s.optional(s.string()),
  bankCode: s.optional(s.string()),
  bankName: s.optional(s.string()),
  branchCode: s.optional(s.string()),
  bankAccountType: s.optional(s.lazy(() => directDebitBankAccountTypeSchema)),
  bankAccountName: s.optional(s.string()),
  bankAccountNumber: s.optional(s.string()),
  amount: s.optional(s.int()),
  debitDate: s.optional(s.lazy(() => directDebitDebitDateSchema)),
  calculatedDebitDate: s.optional(s.dateOnly()),
  lock: s.optional(s.lazy(() => directDebitBankTransferLockSchema)),
  status: s.optional(s.lazy(() => directDebitBankTransferStatusSchema)),
  error: s.optionalNullable(s.lazy(() => directDebitBankTransferErrorSchema)),
  createdOn: s.optional(s.dateTime()),
  updatedOn: s.optional(s.dateTime()),
  _keysMap: {
    legacyStoreId: "legacy_store_id",
    merchantId: "merchant_id",
    bankAccountId: "bank_account_id",
    userNumber: "user_number",
    bankCode: "bank_code",
    bankName: "bank_name",
    branchCode: "branch_code",
    bankAccountType: "bank_account_type",
    bankAccountName: "bank_account_name",
    bankAccountNumber: "bank_account_number",
    debitDate: "debit_date",
    calculatedDebitDate: "calculated_debit_date",
    createdOn: "created_on",
    updatedOn: "updated_on",
  },
};

export const directDebitBankTransferInternalSchema: Schema<DirectDebitBankTransfer> =
  s.object<DirectDebitBankTransfer>(directDebitBankTransferProperties, { additionalProperties: s.json() });

export const directDebitBankTransferSchema: Schema<DirectDebitBankTransfer> = s.lazySchema(() =>
  s.object<DirectDebitBankTransfer>(
    {
      ...directDebitBankTransferProperties,
      id: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
      legacyStoreId: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
      bankAccountId: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
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
      amount: s.optional(s.int().check(s.gte(1))),
    },
    { additionalProperties: s.json() },
  ),
);
