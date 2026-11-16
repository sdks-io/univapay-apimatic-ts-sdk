import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 基本オンラインデータ（OS タイプ）のスキーマ。 */
export const BaseOnlineDataOsType = {
  Android: "android",
  Ios: "ios",
} as const;
export type BaseOnlineDataOsType =
  | (typeof BaseOnlineDataOsType)[keyof typeof BaseOnlineDataOsType]
  | (string & {});

export const baseOnlineDataOsTypeSchema: EnumSchema<BaseOnlineDataOsType> =
  s.enumOf<BaseOnlineDataOsType>(BaseOnlineDataOsType);
