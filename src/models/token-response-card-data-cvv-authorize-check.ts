import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンスのカードデータ CVV 認証チェック（Cvv Authorize Check）のスキーマ。 */
export type TokenResponseCardDataCvvAuthorizeCheck = {
  /** リソースの現在のステータス。 */
  status?: string | null;
  /** 課金識別子。 */
  chargeId?: string | null;
  /** 日付の値。 */
  date?: Date | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseCardDataCvvAuthorizeCheckSchema: Schema<TokenResponseCardDataCvvAuthorizeCheck> =
  s.object<TokenResponseCardDataCvvAuthorizeCheck>(
    {
      status: s.optionalNullable(s.string()),
      chargeId: s.optionalNullable(s.string()),
      date: s.optionalNullable(s.dateTime()),
      _keysMap: {
        chargeId: "charge_id",
      },
    },
    { additionalProperties: s.json() },
  );
