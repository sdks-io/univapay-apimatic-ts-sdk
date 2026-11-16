import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** リクエストを送信するために必要なキーと値のペアを含むディクショナリ。 */
export type IssuerTokenPayload = {
  /** ほとんどの決済プロバイダーで使用される汎用的なペイロードキー。 */
  requestData?: string;
  /** d払い決済のサービスコード。 */
  sSpcd?: string;
  /** d払いのクーポン品目トークン。 */
  sCptok?: string;
  /** d払いの端末情報暗号化キー。 */
  sTerkn?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const issuerTokenPayloadSchema: Schema<IssuerTokenPayload> = s.object<IssuerTokenPayload>(
  {
    requestData: s.optional(s.string()),
    sSpcd: s.optional(s.string()),
    sCptok: s.optional(s.string()),
    sTerkn: s.optional(s.string()),
    _keysMap: {
      requestData: "request_data",
    },
  },
  { additionalProperties: s.json() },
);
