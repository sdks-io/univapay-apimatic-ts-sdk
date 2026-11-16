import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 税関申告を作成するためのリクエストボディ。バックエンドは現在、WeChat Online および WeChat MPM の課金に対してのみこの形状を受け付けます。 */
export type CustomsDeclarationCreateRequest = {
  /** 申告に使用される WeChat 税関当局コード。 */
  customs: string;
  /** 加盟店の税関登録番号。 */
  merchantCustomsNo: string;
  /** 税関で使用される消費者の証明書またはパスポートの識別番号。 */
  certificateId: string;
  /** 証明書に記載されている表記と完全に一致する消費者の氏名。 */
  certificateName: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationCreateRequestSchema: Schema<CustomsDeclarationCreateRequest> =
  s.object<CustomsDeclarationCreateRequest>(
    {
      customs: s.string(),
      merchantCustomsNo: s.string(),
      certificateId: s.string(),
      certificateName: s.string(),
      _keysMap: {
        merchantCustomsNo: "merchant_customs_no",
        certificateId: "certificate_id",
        certificateName: "certificate_name",
      },
    },
    { additionalProperties: s.json() },
  );
