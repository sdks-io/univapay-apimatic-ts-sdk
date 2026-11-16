import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 課金ステータスのスキーマ。 */
export const ChargeStatus = {
  Pending: "pending",
  Awaiting: "awaiting",
  Authorized: "authorized",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
  Canceled: "canceled",
} as const;
export type ChargeStatus = (typeof ChargeStatus)[keyof typeof ChargeStatus] | (string & {});

export const chargeStatusSchema: EnumSchema<ChargeStatus> = s.enumOf<ChargeStatus>(ChargeStatus);
