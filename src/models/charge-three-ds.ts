import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 課金3Dセキュアのスキーマ。 */
export type ChargeThreeDs = {
  /** リダイレクト先エンドポイント URL。 */
  redirectEndpoint?: string;
  /** リソースの処理モード。 */
  mode?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeThreeDsProperties: s.Shape<ChargeThreeDs> = {
  redirectEndpoint: s.optional(s.string()),
  mode: s.optional(s.string()),
  _keysMap: {
    redirectEndpoint: "redirect_endpoint",
  },
};

export const chargeThreeDsInternalSchema: Schema<ChargeThreeDs> = s.object<ChargeThreeDs>(
  chargeThreeDsProperties,
  { additionalProperties: s.json() },
);

export const chargeThreeDsSchema: Schema<ChargeThreeDs> = s.lazySchema(() =>
  s.object<ChargeThreeDs>(
    {
      ...chargeThreeDsProperties,
      redirectEndpoint: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
