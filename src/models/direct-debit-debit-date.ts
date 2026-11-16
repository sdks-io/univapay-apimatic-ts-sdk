import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 毎月の振替日区分 — 資金は14日または27日に引き落とされます。 */
export const DirectDebitDebitDate = {
  Fourteen: "fourteen",
  TwentySeven: "twenty_seven",
} as const;
export type DirectDebitDebitDate =
  | (typeof DirectDebitDebitDate)[keyof typeof DirectDebitDebitDate]
  | (string & {});

export const directDebitDebitDateSchema: EnumSchema<DirectDebitDebitDate> =
  s.enumOf<DirectDebitDebitDate>(DirectDebitDebitDate);
