import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 常に 'error' を返します。 */
export const ApiErrorStatus = {
  Error: "error",
} as const;
export type ApiErrorStatus = (typeof ApiErrorStatus)[keyof typeof ApiErrorStatus] | (string & {});

export const apiErrorStatusSchema: EnumSchema<ApiErrorStatus> = s.enumOf<ApiErrorStatus>(ApiErrorStatus);
