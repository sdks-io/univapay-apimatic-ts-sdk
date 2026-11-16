import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** リソース ID に基づくソート方向。 */
export const CursorDirectionQuery = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type CursorDirectionQuery =
  | (typeof CursorDirectionQuery)[keyof typeof CursorDirectionQuery]
  | (string & {});

export const cursorDirectionQuerySchema: EnumSchema<CursorDirectionQuery> =
  s.enumOf<CursorDirectionQuery>(CursorDirectionQuery);
