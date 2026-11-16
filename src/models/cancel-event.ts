import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** イベントタイプの識別子 — このコールバックでは常に `cancel_finished` になります。 */
export const CancelEvent = {
  CancelFinished: "cancel_finished",
} as const;
export type CancelEvent = (typeof CancelEvent)[keyof typeof CancelEvent] | (string & {});

export const cancelEventSchema: EnumSchema<CancelEvent> = s.enumOf<CancelEvent>(CancelEvent);
