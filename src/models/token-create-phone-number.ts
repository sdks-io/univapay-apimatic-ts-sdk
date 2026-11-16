import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークン作成用の電話番号スキーマ。 */
export type TokenCreatePhoneNumber = {
  /** 文字列としての国番号（例：'1' または '81'）。 */
  countryCode: string;
  /** 国内の電話番号（市外局番以降）。 */
  localNumber: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenCreatePhoneNumberProperties: s.Shape<TokenCreatePhoneNumber> = {
  countryCode: s.string(),
  localNumber: s.string(),
  _keysMap: {
    countryCode: "country_code",
    localNumber: "local_number",
  },
};

export const tokenCreatePhoneNumberInternalSchema: Schema<TokenCreatePhoneNumber> =
  s.object<TokenCreatePhoneNumber>(tokenCreatePhoneNumberProperties, { additionalProperties: s.json() });

export const tokenCreatePhoneNumberSchema: Schema<TokenCreatePhoneNumber> = s.lazySchema(() =>
  s.object<TokenCreatePhoneNumber>(
    {
      ...tokenCreatePhoneNumberProperties,
      localNumber: s.string().check(s.maxLength(15)),
    },
    { additionalProperties: s.json() },
  ),
);
