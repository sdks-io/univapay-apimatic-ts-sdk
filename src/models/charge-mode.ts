import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 課金モードのスキーマ。 */
export const ChargeMode = {
  Live: "live",
  Test: "test",
} as const;
export type ChargeMode = (typeof ChargeMode)[keyof typeof ChargeMode] | (string & {});

export const chargeModeSchema: EnumSchema<ChargeMode> = s.enumOf<ChargeMode>(ChargeMode);
