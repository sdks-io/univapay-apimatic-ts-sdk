import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 環境モード: `live` と `test` は認証に使用された資格情報を反映し、`live_test` は本番モードのデータに対してテストを行う特権的な呼び出し元向けに予約されています。
 */
export const TransactionHistoryMode = {
  Live: "live",
  Test: "test",
  LiveTest: "live_test",
} as const;
export type TransactionHistoryMode =
  | (typeof TransactionHistoryMode)[keyof typeof TransactionHistoryMode]
  | (string & {});

export const transactionHistoryModeSchema: EnumSchema<TransactionHistoryMode> =
  s.enumOf<TransactionHistoryMode>(TransactionHistoryMode);
