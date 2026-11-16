import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** モードクエリのスキーマ。 */
export const ModeQuery = {
  Live: "live",
  Test: "test",
} as const;
export type ModeQuery = (typeof ModeQuery)[keyof typeof ModeQuery] | (string & {});

export const modeQuerySchema: EnumSchema<ModeQuery> = s.enumOf<ModeQuery>(ModeQuery);
