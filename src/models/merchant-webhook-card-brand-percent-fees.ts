import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** カードブランドごとの料率（パーセント手数料）の上書き設定。 */
export type MerchantWebhookCardBrandPercentFees = {
  /** Visa トランザクションに適用される料率の上書き。 */
  visa?: number | null;
  /** American Express トランザクションに適用される料率の上書き。 */
  americanExpress?: number | null;
  /** Mastercard トランザクションに適用される料率の上書き。 */
  mastercard?: number | null;
  /** Maestro トランザクションに適用される料率の上書き。 */
  maestro?: number | null;
  /** Discover トランザクションに適用される料率の上書き。 */
  discover?: number | null;
  /** JCB トランザクションに適用される料率の上書き。 */
  jcb?: number | null;
  /** Diners Club トランザクションに適用される料率の上書き。 */
  dinersClub?: number | null;
  /** UnionPay トランザクションに適用される料率の上書き。 */
  unionPay?: number | null;
  /** ハウスカード（独自ブランドカード）トランザクションに適用される料率の上書き。 */
  privateLabel?: number | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookCardBrandPercentFeesSchema: Schema<MerchantWebhookCardBrandPercentFees> =
  s.object<MerchantWebhookCardBrandPercentFees>(
    {
      visa: s.optionalNullable(s.float64()),
      americanExpress: s.optionalNullable(s.float64()),
      mastercard: s.optionalNullable(s.float64()),
      maestro: s.optionalNullable(s.float64()),
      discover: s.optionalNullable(s.float64()),
      jcb: s.optionalNullable(s.float64()),
      dinersClub: s.optionalNullable(s.float64()),
      unionPay: s.optionalNullable(s.float64()),
      privateLabel: s.optionalNullable(s.float64()),
      _keysMap: {
        americanExpress: "american_express",
        dinersClub: "diners_club",
        unionPay: "union_pay",
        privateLabel: "private_label",
      },
    },
    { additionalProperties: s.json() },
  );
