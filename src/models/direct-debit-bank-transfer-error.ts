import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 銀行から報告された振替の失敗理由。
 *
 * | 値 | 意味 |
 * | :--- | :--- |
 * | `insufficient_funds` | 振替日に口座の残高が不足していました。 |
 * | `no_deposit_transaction` | 口座は存在しますが入金トランザクションがありません。 |
 * | `transfer_stopped_by_depositor` | 消費者が銀行に対して引き落としの停止を指示しました。 |
 * | `no_account_transfer_request` | 当該口座について有効な振替依頼書が登録されていません。 |
 * | `transfer_stopped_by_trustee` | 収納銀行が引き落としを停止しました。 |
 * | `other_error` | 上記以外の理由で銀行が失敗を報告しました。 |
 * | `unknown_error` | 失敗理由を特定できませんでした。 |
 */
export const DirectDebitBankTransferError = {
  InsufficientFunds: "insufficient_funds",
  NoDepositTransaction: "no_deposit_transaction",
  TransferStoppedByDepositor: "transfer_stopped_by_depositor",
  NoAccountTransferRequest: "no_account_transfer_request",
  TransferStoppedByTrustee: "transfer_stopped_by_trustee",
  OtherError: "other_error",
  UnknownError: "unknown_error",
} as const;
export type DirectDebitBankTransferError =
  | (typeof DirectDebitBankTransferError)[keyof typeof DirectDebitBankTransferError]
  | (string & {});

export const directDebitBankTransferErrorSchema: EnumSchema<DirectDebitBankTransferError> =
  s.enumOf<DirectDebitBankTransferError>(DirectDebitBankTransferError);
