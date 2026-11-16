import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/**
 * 税関申告を更新するためのリクエストボディ。バックエンドのパッチ処理では元の `customs`、`certificate_id`、`certificate_name` の値が保持され、新しい
 * `merchant_customs_no` のみを受け付けます。
 */
export type CustomsDeclarationPatchRequest = {
  /** 更新された加盟店の税関登録番号。 */
  merchantCustomsNo: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationPatchRequestSchema: Schema<CustomsDeclarationPatchRequest> =
  s.object<CustomsDeclarationPatchRequest>(
    {
      merchantCustomsNo: s.string(),
      _keysMap: {
        merchantCustomsNo: "merchant_customs_no",
      },
    },
    { additionalProperties: s.json() },
  );
