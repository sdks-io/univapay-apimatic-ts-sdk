import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** バックエンドフォーマッタによって返される WeChat 税関申告ペイロード。 */
export type CustomsDeclarationWebhookDeclaration = {
  /** WeChat 税関当局コード。 */
  customs?: string;
  /** 加盟店の税関登録番号。 */
  merchantCustomsNo?: string;
  /** 消費者の証明書またはパスポートの識別番号。 */
  certificateId?: string;
  /** 税関に提供された通りの消費者の氏名。 */
  certificateName?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookDeclarationSchema: Schema<CustomsDeclarationWebhookDeclaration> =
  s.object<CustomsDeclarationWebhookDeclaration>(
    {
      customs: s.optional(s.string()),
      merchantCustomsNo: s.optional(s.string()),
      certificateId: s.optional(s.string()),
      certificateName: s.optional(s.string()),
      _keysMap: {
        merchantCustomsNo: "merchant_customs_no",
        certificateId: "certificate_id",
        certificateName: "certificate_name",
      },
    },
    { additionalProperties: s.json() },
  );
