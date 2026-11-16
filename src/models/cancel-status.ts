import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** キャンセル操作の現在のステータス。 */
export const CancelStatus = {
  Pending: "pending",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
} as const;
export type CancelStatus = (typeof CancelStatus)[keyof typeof CancelStatus] | (string & {});

export const cancelStatusSchema: EnumSchema<CancelStatus> = s.enumOf<CancelStatus>(CancelStatus);
