import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** イベントタイプの識別子 — このコールバックでは常に `bank_transfer_status_updated` になります。 */
export const BankTransferEvent = {
  BankTransferStatusUpdated: "bank_transfer_status_updated",
} as const;
export type BankTransferEvent = (typeof BankTransferEvent)[keyof typeof BankTransferEvent] | (string & {});

export const bankTransferEventSchema: EnumSchema<BankTransferEvent> =
  s.enumOf<BankTransferEvent>(BankTransferEvent);
