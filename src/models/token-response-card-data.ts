import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  tokenResponseCardDataBillingSchema,
  type TokenResponseCardDataBilling,
} from "./token-response-card-data-billing.js";
import {
  tokenResponseCardDataCardSchema,
  type TokenResponseCardDataCard,
} from "./token-response-card-data-card.js";
import {
  tokenResponseCardDataCvvAuthorizeCheckSchema,
  type TokenResponseCardDataCvvAuthorizeCheck,
} from "./token-response-card-data-cvv-authorize-check.js";
import {
  tokenResponseCardDataCvvAuthorizeSchema,
  type TokenResponseCardDataCvvAuthorize,
} from "./token-response-card-data-cvv-authorize.js";
import {
  tokenResponseCardDataThreeDsInternalSchema,
  tokenResponseCardDataThreeDsSchema,
  type TokenResponseCardDataThreeDs,
} from "./token-response-card-data-three-ds.js";

/** トークンレスポンス用のカードデータスキーマ。 */
export type TokenResponseCardData = {
  /** トークンレスポンスのカードデータ（カード情報本体）スキーマ。 */
  card?: TokenResponseCardDataCard;
  /** トークンレスポンスのカードデータ請求先住所（Billing）のスキーマ。 */
  billing?: TokenResponseCardDataBilling;
  /** トークンレスポンスのカードデータ CVV 認証（Cvv Authorize）のスキーマ。 */
  cvvAuthorize?: TokenResponseCardDataCvvAuthorize;
  /** トークンレスポンスのカードデータ CVV 認証チェック（Cvv Authorize Check）のスキーマ。 */
  cvvAuthorizeCheck?: TokenResponseCardDataCvvAuthorizeCheck;
  /** トークンレスポンスのカードデータ3Dセキュアのスキーマ。 */
  threeDs?: TokenResponseCardDataThreeDs;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenResponseCardDataProperties: s.Shape<TokenResponseCardData> = {
  card: s.optional(s.lazy(() => tokenResponseCardDataCardSchema)),
  billing: s.optional(s.lazy(() => tokenResponseCardDataBillingSchema)),
  cvvAuthorize: s.optional(s.lazy(() => tokenResponseCardDataCvvAuthorizeSchema)),
  cvvAuthorizeCheck: s.optional(s.lazy(() => tokenResponseCardDataCvvAuthorizeCheckSchema)),
  threeDs: s.optional(s.lazy(() => tokenResponseCardDataThreeDsInternalSchema)),
  _keysMap: {
    cvvAuthorize: "cvv_authorize",
    cvvAuthorizeCheck: "cvv_authorize_check",
    threeDs: "three_ds",
  },
};

export const tokenResponseCardDataInternalSchema: Schema<TokenResponseCardData> =
  s.object<TokenResponseCardData>(tokenResponseCardDataProperties, { additionalProperties: s.json() });

export const tokenResponseCardDataSchema: Schema<TokenResponseCardData> = s.lazySchema(() =>
  s.object<TokenResponseCardData>(
    {
      ...tokenResponseCardDataProperties,
      threeDs: s.optional(s.lazy(() => tokenResponseCardDataThreeDsSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
