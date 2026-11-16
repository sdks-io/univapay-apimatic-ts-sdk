import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  transactionTokenUpdateRequestDataPhoneNumberSchema,
  type TransactionTokenUpdateRequestDataPhoneNumber,
} from "./transaction-token-update-request-data-phone-number.js";

/** トランザクション・トークン更新リクエストデータのスキーマ。 */
export type TransactionTokenUpdateRequestData = {
  /** `RECURRING_USAGE_REQUIRES_CVV` エラーが発生した場合に更新します。 */
  cvv?: string;
  /** カード名義人。 */
  cardholder?: string;
  /** カード番号。 */
  cardNumber?: string;
  /** カードの有効期限（月）。 */
  expMonth?: number;
  /** カードの有効期限（年）。 */
  expYear?: number;
  /** 住所の行1（町名・番地など）。 */
  line1?: string;
  /** 住所の行2（ビル名・部屋番号など）。 */
  line2?: string;
  /** 州または都道府県。 */
  state?: string;
  /** 市区町村。 */
  city?: string;
  /** 国コード。 */
  country?: string;
  /** 郵便番号。 */
  zip?: string;
  /** トランザクション・トークン更新リクエストデータ電話番号のスキーマ。 */
  phoneNumber?: TransactionTokenUpdateRequestDataPhoneNumber;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionTokenUpdateRequestDataSchema: Schema<TransactionTokenUpdateRequestData> =
  s.object<TransactionTokenUpdateRequestData>(
    {
      cvv: s.optional(s.string()),
      cardholder: s.optional(s.string()),
      cardNumber: s.optional(s.string()),
      expMonth: s.optional(s.int()),
      expYear: s.optional(s.int()),
      line1: s.optional(s.string()),
      line2: s.optional(s.string()),
      state: s.optional(s.string()),
      city: s.optional(s.string()),
      country: s.optional(s.string()),
      zip: s.optional(s.string()),
      phoneNumber: s.optional(s.lazy(() => transactionTokenUpdateRequestDataPhoneNumberSchema)),
      _keysMap: {
        cardNumber: "card_number",
        expMonth: "exp_month",
        expYear: "exp_year",
        phoneNumber: "phone_number",
      },
    },
    { additionalProperties: s.json() },
  );
