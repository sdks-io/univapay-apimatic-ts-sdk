import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 課金リダイレクトのスキーマ。 */
export type ChargeRedirect = {
  /** エンドポイントの値。 */
  endpoint?: string;
  /** リダイレクト識別子。 */
  redirectId?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeRedirectProperties: s.Shape<ChargeRedirect> = {
  endpoint: s.optional(s.string()),
  redirectId: s.optional(s.string()),
  _keysMap: {
    redirectId: "redirect_id",
  },
};

export const chargeRedirectInternalSchema: Schema<ChargeRedirect> = s.object<ChargeRedirect>(
  chargeRedirectProperties,
  { additionalProperties: s.json() },
);

export const chargeRedirectSchema: Schema<ChargeRedirect> = s.lazySchema(() =>
  s.object<ChargeRedirect>(
    {
      ...chargeRedirectProperties,
      endpoint: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
