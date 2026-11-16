import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** ユーザー識別子のソース。 */
export const BaseOnlineDataUserIdentifierSource = {
  Provided: "provided",
  Internal: "internal",
} as const;
export type BaseOnlineDataUserIdentifierSource =
  | (typeof BaseOnlineDataUserIdentifierSource)[keyof typeof BaseOnlineDataUserIdentifierSource]
  | (string & {});

export const baseOnlineDataUserIdentifierSourceSchema: EnumSchema<BaseOnlineDataUserIdentifierSource> =
  s.enumOf<BaseOnlineDataUserIdentifierSource>(BaseOnlineDataUserIdentifierSource);
