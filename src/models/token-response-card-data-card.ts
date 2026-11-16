import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンスのカードデータ（カード情報本体）スキーマ。 */
export type TokenResponseCardDataCard = {
  /** カード名義人。 */
  cardholder?: string;
  /** カードの有効期限（月）。 */
  expMonth?: number;
  /** カードの有効期限（年）。 */
  expYear?: number;
  /** カードの BIN 値（先頭6〜8桁）。 */
  cardBin?: string;
  /** 下4桁の値。 */
  lastFour?: string;
  /** ブランドまたはネットワーク名。 */
  brand?: string;
  /** カードタイプの値。 */
  cardType?: string;
  /** 国コード。 */
  country?: string;
  /** カテゴリの値。 */
  category?: string | null;
  /** イシュア（カード発行会社）の値。 */
  issuer?: string | null;
  /** サブブランドの値。 */
  subBrand?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseCardDataCardSchema: Schema<TokenResponseCardDataCard> =
  s.object<TokenResponseCardDataCard>(
    {
      cardholder: s.optional(s.string()),
      expMonth: s.optional(s.int()),
      expYear: s.optional(s.int()),
      cardBin: s.optional(s.string()),
      lastFour: s.optional(s.string()),
      brand: s.optional(s.string()),
      cardType: s.optional(s.string()),
      country: s.optional(s.string()),
      category: s.optionalNullable(s.string()),
      issuer: s.optionalNullable(s.string()),
      subBrand: s.optional(s.string()),
      _keysMap: {
        expMonth: "exp_month",
        expYear: "exp_year",
        cardBin: "card_bin",
        lastFour: "last_four",
        cardType: "card_type",
        subBrand: "sub_brand",
      },
    },
    { additionalProperties: s.json() },
  );
