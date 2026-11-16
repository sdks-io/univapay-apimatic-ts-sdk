import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 課金作成リクエストのリダイレクトスキーマ。 */
export type ChargeCreateRequestRedirect = {
  /** 決済完了後に消費者をリダイレクトする URL。 */
  endpoint?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeCreateRequestRedirectProperties: s.Shape<ChargeCreateRequestRedirect> = {
  endpoint: s.optional(s.string()),
};

export const chargeCreateRequestRedirectInternalSchema: Schema<ChargeCreateRequestRedirect> =
  s.object<ChargeCreateRequestRedirect>(chargeCreateRequestRedirectProperties, {
    additionalProperties: s.json(),
  });

export const chargeCreateRequestRedirectSchema: Schema<ChargeCreateRequestRedirect> = s.lazySchema(() =>
  s.object<ChargeCreateRequestRedirect>(
    {
      ...chargeCreateRequestRedirectProperties,
      endpoint: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
