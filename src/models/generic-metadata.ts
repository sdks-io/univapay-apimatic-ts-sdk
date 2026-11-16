import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { genericMetadataValueSchema, type GenericMetadataValue } from "./unions/generic-metadata-value.js";

/** カスタムメタデータ用のフリーフォームディクショナリ。 */
export type GenericMetadata = {
  /** カスタムメタデータキーの例。 */
  orderId?: string;
  /** 決済プロバイダー（コンビニ、銀行振込など）への送信が必須とされている消費者名。 */
  univapayName?: string;
  /** 決済プロバイダーへの送信が必須とされている消費者の電話番号。 */
  univapayPhoneNumber?: string;
  /**
   * メタデータプロパティに許容される値。文字列、数値、真偽値、null、またはこれらの配列を指定できますが、入れ子になったオブジェクトは指定できません — サーバーは、直下のプロパティ値が
   * JSON オブジェクトであるメタデータを拒否します。
   */
  additionalProperties?: Record<string, GenericMetadataValue>;
};

export const genericMetadataSchema: Schema<GenericMetadata> = s.object<GenericMetadata>(
  {
    orderId: s.optional(s.string()),
    univapayName: s.optional(s.string()),
    univapayPhoneNumber: s.optional(s.string()),
    _keysMap: {
      orderId: "order_id",
      univapayName: "univapay-name",
      univapayPhoneNumber: "univapay-phone-number",
    },
  },
  { additionalProperties: genericMetadataValueSchema },
);
