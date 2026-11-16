import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  bankTransferLedgerBankLedgerTypeSchema,
  type BankTransferLedgerBankLedgerType,
} from "./bank-transfer-ledger-bank-ledger-type.js";
import { bankTransferLedgerModeSchema, type BankTransferLedgerMode } from "./bank-transfer-ledger-mode.js";

/** 課金に関連付けられた単一の銀行振込台帳エントリ。 */
export type BankTransferLedger = {
  /** 銀行振込台帳の銀行台帳タイプのスキーマ。 */
  bankLedgerType?: BankTransferLedgerBankLedgerType;
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** 通貨の最小単位による現在の残高。 */
  balance?: number;
  /** 仮想銀行口座の名義。 */
  virtualBankAccountHolderName?: string;
  /** 仮想銀行口座の口座番号。 */
  virtualBankAccountNumber?: string;
  /** 仮想口座 ID 値。 */
  virtualAccountId?: string;
  /** トランザクション日。 */
  transactionDate?: string;
  /** トランザクションのタイムスタンプ。 */
  transactionTimestamp?: Date;
  /** 銀行振込台帳モードのスキーマ。 */
  mode?: BankTransferLedgerMode;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const bankTransferLedgerSchema: Schema<BankTransferLedger> = s.object<BankTransferLedger>(
  {
    bankLedgerType: s.optional(s.lazy(() => bankTransferLedgerBankLedgerTypeSchema)),
    amount: s.optional(s.int()),
    balance: s.optional(s.int()),
    virtualBankAccountHolderName: s.optional(s.string()),
    virtualBankAccountNumber: s.optional(s.string()),
    virtualAccountId: s.optional(s.string()),
    transactionDate: s.optional(s.dateOnly()),
    transactionTimestamp: s.optional(s.dateTime()),
    mode: s.optional(s.lazy(() => bankTransferLedgerModeSchema)),
    createdOn: s.optional(s.dateTime()),
    _keysMap: {
      bankLedgerType: "bank_ledger_type",
      virtualBankAccountHolderName: "virtual_bank_account_holder_name",
      virtualBankAccountNumber: "virtual_bank_account_number",
      virtualAccountId: "virtual_account_id",
      transactionDate: "transaction_date",
      transactionTimestamp: "transaction_timestamp",
      createdOn: "created_on",
    },
  },
  { additionalProperties: s.json() },
);
