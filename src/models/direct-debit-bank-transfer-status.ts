import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 振替の状態。銀行から結果が届くまでは `awaiting` で、その後 `successful` または `failed` になります。結果は振替日の即日ではなく数日後に反映されます。 */
export const DirectDebitBankTransferStatus = {
  Awaiting: "awaiting",
  Successful: "successful",
  Failed: "failed",
} as const;
export type DirectDebitBankTransferStatus =
  | (typeof DirectDebitBankTransferStatus)[keyof typeof DirectDebitBankTransferStatus]
  | (string & {});

export const directDebitBankTransferStatusSchema: EnumSchema<DirectDebitBankTransferStatus> =
  s.enumOf<DirectDebitBankTransferStatus>(DirectDebitBankTransferStatus);
