import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 基本オンラインデータ（呼び出し方法）のスキーマ。 */
export const BaseOnlineDataCallMethod = {
  HttpGet: "http_get",
  HttpPost: "http_post",
  HttpGetMobile: "http_get_mobile",
  Sdk: "sdk",
  Web: "web",
  App: "app",
} as const;
export type BaseOnlineDataCallMethod =
  | (typeof BaseOnlineDataCallMethod)[keyof typeof BaseOnlineDataCallMethod]
  | (string & {});

export const baseOnlineDataCallMethodSchema: EnumSchema<BaseOnlineDataCallMethod> =
  s.enumOf<BaseOnlineDataCallMethod>(BaseOnlineDataCallMethod);
