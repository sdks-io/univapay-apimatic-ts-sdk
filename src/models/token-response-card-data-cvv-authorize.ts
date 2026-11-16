import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンスのカードデータ CVV 認証（Cvv Authorize）のスキーマ。 */
export type TokenResponseCardDataCvvAuthorize = {
  /** 有効化フラグの値。 */
  enabled?: boolean;
  /** リソースの現在のステータス。 */
  status?: string | null;
  /** 課金識別子。 */
  chargeId?: string | null;
  /** 資格情報識別子。 */
  credentialsId?: string | null;
  /** ISO-4217 通貨コード。 */
  currency?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseCardDataCvvAuthorizeSchema: Schema<TokenResponseCardDataCvvAuthorize> =
  s.object<TokenResponseCardDataCvvAuthorize>(
    {
      enabled: s.optional(s.boolean()),
      status: s.optionalNullable(s.string()),
      chargeId: s.optionalNullable(s.string()),
      credentialsId: s.optionalNullable(s.string()),
      currency: s.optionalNullable(s.string()),
      _keysMap: {
        chargeId: "charge_id",
        credentialsId: "credentials_id",
      },
    },
    { additionalProperties: s.json() },
  );
