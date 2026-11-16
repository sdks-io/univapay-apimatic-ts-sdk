import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * （オンライン決済の場合）クライアントがトークンをどのように実行すべきか。- `sdk` / `app`: ネイティブアプリ環境/SDK内での直接利用。- `web`:
 * 特殊な拡張ブラウザ環境内での直接利用。- `http_get` / `http_post`: 新しいブラウザウィンドウまたは iframe 内で直接実行。
 */
export const IssuerTokenCallMethod = {
  HttpGet: "http_get",
  HttpPost: "http_post",
  Sdk: "sdk",
  Web: "web",
  App: "app",
} as const;
export type IssuerTokenCallMethod =
  | (typeof IssuerTokenCallMethod)[keyof typeof IssuerTokenCallMethod]
  | (string & {});

export const issuerTokenCallMethodSchema: EnumSchema<IssuerTokenCallMethod> =
  s.enumOf<IssuerTokenCallMethod>(IssuerTokenCallMethod);
