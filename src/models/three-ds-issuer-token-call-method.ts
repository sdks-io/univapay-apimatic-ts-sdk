import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 実行方法。現在、'http_post' のみがサポートされています。 */
export const ThreeDsIssuerTokenCallMethod = {
  HttpPost: "http_post",
} as const;
export type ThreeDsIssuerTokenCallMethod =
  | (typeof ThreeDsIssuerTokenCallMethod)[keyof typeof ThreeDsIssuerTokenCallMethod]
  | (string & {});

export const threeDsIssuerTokenCallMethodSchema: EnumSchema<ThreeDsIssuerTokenCallMethod> =
  s.enumOf<ThreeDsIssuerTokenCallMethod>(ThreeDsIssuerTokenCallMethod);
