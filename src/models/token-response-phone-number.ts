import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンス用の電話番号スキーマ。 */
export type TokenResponsePhoneNumber = {
  /** レスポンス内では整数として返されます。 */
  countryCode?: number | null;
  /** 国内の電話番号（市外局番以降）。 */
  localNumber?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponsePhoneNumberSchema: Schema<TokenResponsePhoneNumber> =
  s.object<TokenResponsePhoneNumber>(
    {
      countryCode: s.optionalNullable(s.int()),
      localNumber: s.optional(s.string()),
      _keysMap: {
        countryCode: "country_code",
        localNumber: "local_number",
      },
    },
    { additionalProperties: s.json() },
  );
