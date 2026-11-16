import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークン作成時のカードデータ3Dセキュアのスキーマ。 */
export type TokenCreateCardDataThreeDs = {
  /** 有効化フラグの値。 */
  enabled?: boolean;
  /** リダイレクト先エンドポイント URL。 */
  redirectEndpoint?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenCreateCardDataThreeDsProperties: s.Shape<TokenCreateCardDataThreeDs> = {
  enabled: s.optional(s.boolean()),
  redirectEndpoint: s.optional(s.string()),
  _keysMap: {
    redirectEndpoint: "redirect_endpoint",
  },
};

export const tokenCreateCardDataThreeDsInternalSchema: Schema<TokenCreateCardDataThreeDs> =
  s.object<TokenCreateCardDataThreeDs>(tokenCreateCardDataThreeDsProperties, {
    additionalProperties: s.json(),
  });

export const tokenCreateCardDataThreeDsSchema: Schema<TokenCreateCardDataThreeDs> = s.lazySchema(() =>
  s.object<TokenCreateCardDataThreeDs>(
    {
      ...tokenCreateCardDataThreeDsProperties,
      redirectEndpoint: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
