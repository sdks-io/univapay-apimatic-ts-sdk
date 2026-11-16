import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 終了がスケジュールされている場合に、この支払いの期日に定期課金が移行するステータス。終了が適用されない場合は `null` になります。 */
export const TerminateWithStatus = {
  Suspended: "suspended",
  Canceled: "canceled",
} as const;
export type TerminateWithStatus =
  | (typeof TerminateWithStatus)[keyof typeof TerminateWithStatus]
  | (string & {});

export const terminateWithStatusSchema: EnumSchema<TerminateWithStatus> =
  s.enumOf<TerminateWithStatus>(TerminateWithStatus);
