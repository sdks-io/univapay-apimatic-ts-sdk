import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** イベントタイプの識別子 — このコールバックでは常に `refund_finished` になります。 */
export const RefundEvent = {
  RefundFinished: "refund_finished",
} as const;
export type RefundEvent = (typeof RefundEvent)[keyof typeof RefundEvent] | (string & {});

export const refundEventSchema: EnumSchema<RefundEvent> = s.enumOf<RefundEvent>(RefundEvent);
