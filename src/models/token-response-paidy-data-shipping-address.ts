import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** Paidyトークンに対して返される配送先住所。 */
export type TokenResponsePaidyDataShippingAddress = {
  /** 日本の郵便番号。 */
  zip?: string | null;
  /** 住所の行1（町名・番地など）。 */
  line1?: string | null;
  /** 住所の行2（ビル名・部屋番号など）。 */
  line2?: string | null;
  /** 市区町村。 */
  city?: string | null;
  /** 州または都道府県。 */
  state?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponsePaidyDataShippingAddressSchema: Schema<TokenResponsePaidyDataShippingAddress> =
  s.object<TokenResponsePaidyDataShippingAddress>(
    {
      zip: s.optionalNullable(s.string()),
      line1: s.optionalNullable(s.string()),
      line2: s.optionalNullable(s.string()),
      city: s.optionalNullable(s.string()),
      state: s.optionalNullable(s.string()),
    },
    { additionalProperties: s.json() },
  );
