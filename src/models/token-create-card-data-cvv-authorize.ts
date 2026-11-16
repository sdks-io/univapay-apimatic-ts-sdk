import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークン作成時のカードデータ CVV 認証（Cvv Authorize）のスキーマ。 */
export type TokenCreateCardDataCvvAuthorize = {
  /** 有効化フラグの値。 @default false */
  enabled?: boolean;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenCreateCardDataCvvAuthorizeSchema: Schema<TokenCreateCardDataCvvAuthorize> =
  s.object<TokenCreateCardDataCvvAuthorize>(
    {
      enabled: s.defaulted(s.boolean(), false),
      currency: s.optional(s.string()),
    },
    { additionalProperties: s.json() },
  );
