import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  tokenCreateCardDataCvvAuthorizeSchema,
  type TokenCreateCardDataCvvAuthorize,
} from "./token-create-card-data-cvv-authorize.js";
import {
  tokenCreateCardDataThreeDsInternalSchema,
  tokenCreateCardDataThreeDsSchema,
  type TokenCreateCardDataThreeDs,
} from "./token-create-card-data-three-ds.js";
import {
  tokenCreatePhoneNumberInternalSchema,
  tokenCreatePhoneNumberSchema,
  type TokenCreatePhoneNumber,
} from "./token-create-phone-number.js";

/** トークン作成用のカードデータスキーマ。 */
export type TokenCreateCardData = {
  /** カード名義人。 */
  cardholder?: string;
  /** カード番号。 */
  cardNumber: string;
  /** カードの有効期限（月）。 */
  expMonth: string;
  /** カードの有効期限（年）。 */
  expYear: string;
  /** カードのセキュリティコード。 */
  cvv?: string | null;
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
  /** トークン作成用の電話番号スキーマ。 */
  phoneNumber?: TokenCreatePhoneNumber;
  /** トークン作成時のカードデータ CVV 認証（Cvv Authorize）のスキーマ。 */
  cvvAuthorize?: TokenCreateCardDataCvvAuthorize;
  /** トークン作成時のカードデータ3Dセキュアのスキーマ。 */
  threeDs?: TokenCreateCardDataThreeDs;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenCreateCardDataProperties: s.Shape<TokenCreateCardData> = {
  cardholder: s.optional(s.string()),
  cardNumber: s.string(),
  expMonth: s.string(),
  expYear: s.string(),
  cvv: s.optionalNullable(s.string()),
  line1: s.optional(s.string()),
  line2: s.optional(s.string()),
  state: s.optional(s.string()),
  city: s.optional(s.string()),
  country: s.optional(s.string()),
  zip: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => tokenCreatePhoneNumberInternalSchema)),
  cvvAuthorize: s.optional(s.lazy(() => tokenCreateCardDataCvvAuthorizeSchema)),
  threeDs: s.optional(s.lazy(() => tokenCreateCardDataThreeDsInternalSchema)),
  _keysMap: {
    cardNumber: "card_number",
    expMonth: "exp_month",
    expYear: "exp_year",
    phoneNumber: "phone_number",
    cvvAuthorize: "cvv_authorize",
    threeDs: "three_ds",
  },
};

export const tokenCreateCardDataInternalSchema: Schema<TokenCreateCardData> = s.object<TokenCreateCardData>(
  tokenCreateCardDataProperties,
  { additionalProperties: s.json() },
);

export const tokenCreateCardDataSchema: Schema<TokenCreateCardData> = s.lazySchema(() =>
  s.object<TokenCreateCardData>(
    {
      ...tokenCreateCardDataProperties,
      phoneNumber: s.optional(s.lazy(() => tokenCreatePhoneNumberSchema)),
      threeDs: s.optional(s.lazy(() => tokenCreateCardDataThreeDsSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
