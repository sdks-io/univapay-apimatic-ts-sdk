import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  tokenResponsePhoneNumberSchema,
  type TokenResponsePhoneNumber,
} from "./token-response-phone-number.js";

/** トークンレスポンスのカードデータ請求先住所（Billing）のスキーマ。 */
export type TokenResponseCardDataBilling = {
  /** 住所の行1（町名・番地など）。 */
  line1?: string | null;
  /** 住所の行2（ビル名・部屋番号など）。 */
  line2?: string | null;
  /** 州または都道府県。 */
  state?: string | null;
  /** 市区町村。 */
  city?: string | null;
  /** 国コード。 */
  country?: string | null;
  /** 郵便番号。 */
  zip?: string | null;
  phoneNumber?: TokenResponsePhoneNumber | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseCardDataBillingSchema: Schema<TokenResponseCardDataBilling> =
  s.object<TokenResponseCardDataBilling>(
    {
      line1: s.optionalNullable(s.string()),
      line2: s.optionalNullable(s.string()),
      state: s.optionalNullable(s.string()),
      city: s.optionalNullable(s.string()),
      country: s.optionalNullable(s.string()),
      zip: s.optionalNullable(s.string()),
      phoneNumber: s.optionalNullable(s.lazy(() => tokenResponsePhoneNumberSchema)),
      _keysMap: {
        phoneNumber: "phone_number",
      },
    },
    { additionalProperties: s.json() },
  );
