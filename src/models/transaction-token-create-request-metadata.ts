import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  transactionTokenCreateMetadataPropsSchema,
  type TransactionTokenCreateMetadataProps,
} from "./unions/transaction-token-create-metadata-props.js";

/** カスタムメタデータ用のフリーフォームディクショナリ。 */
export type TransactionTokenCreateRequestMetadata = {
  /** 任意の参照識別子（フリーフォーマット）。 */
  univapayReferenceId?: string;
  /** 消費者 ID。 */
  univapayCustomerId?: string;
  /** 決済プロバイダー（コンビニ、銀行振込など）への送信が必須とされている消費者名。 */
  univapayName?: string;
  /** 決済プロバイダーへの送信が必須とされている消費者の電話番号。 */
  univapayPhoneNumber?: string;
  /**
   * GenericMetadataValue のエイリアス。このスキーマ名は公開 SDK の一部であるため保持されています。範囲を狭めないでください。契約内容は
   * GenericMetadataValue を参照してください。
   */
  additionalProperties?: Record<string, TransactionTokenCreateMetadataProps>;
};

export const transactionTokenCreateRequestMetadataSchema: Schema<TransactionTokenCreateRequestMetadata> =
  s.object<TransactionTokenCreateRequestMetadata>(
    {
      univapayReferenceId: s.optional(s.string()),
      univapayCustomerId: s.optional(s.string()),
      univapayName: s.optional(s.string()),
      univapayPhoneNumber: s.optional(s.string()),
      _keysMap: {
        univapayReferenceId: "univapay-reference-id",
        univapayCustomerId: "univapay-customer-id",
        univapayName: "univapay-name",
        univapayPhoneNumber: "univapay-phone-number",
      },
    },
    { additionalProperties: transactionTokenCreateMetadataPropsSchema },
  );
