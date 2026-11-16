import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 振替をまだ編集できるかどうか。振替は該当する振替日区分のアップロード期限までは `unlocked` で、期限を過ぎると `locked` となり、変更も削除もできなくなります。 */
export const DirectDebitBankTransferLock = {
  Unlocked: "unlocked",
  Locked: "locked",
} as const;
export type DirectDebitBankTransferLock =
  | (typeof DirectDebitBankTransferLock)[keyof typeof DirectDebitBankTransferLock]
  | (string & {});

export const directDebitBankTransferLockSchema: EnumSchema<DirectDebitBankTransferLock> =
  s.enumOf<DirectDebitBankTransferLock>(DirectDebitBankTransferLock);
