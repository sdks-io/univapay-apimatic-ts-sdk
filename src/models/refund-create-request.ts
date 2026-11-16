import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import { refundReasonRequestSchema, type RefundReasonRequest } from "./refund-reason-request.js";

/** 成功した課金に対して返金を作成するためのリクエストボディ。コンビニ決済および銀行振込の課金は返金できません。 */
export type RefundCreateRequest = {
  /** 通貨の最小単位による返金金額。0 より大きく、かつ課金の `charged_amount` 以下である必要があります。ほとんどの決済手段で部分返金がサポートされています。 */
  amount: number;
  /**
   * ISO-4217 通貨コード。課金の `charged_currency` と完全に一致する必要があります。通貨換算が行われた課金の場合は、`requested_currency`
   * ではなく、実際に課金が処理された通貨を指定します。
   */
  currency: string;
  /**
   * 返金の理由（加盟店が設定可能な値）。`duplicate`: 重複して課金が行われた。`fraud`: 課金が不正である。`customer_request`: 消費者が返金を要求した。
   */
  reason?: RefundReasonRequest;
  /** 返金の理由に関する任意のフリーテキストのメモ。 */
  message?: string;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const refundCreateRequestSchema: Schema<RefundCreateRequest> = s.object<RefundCreateRequest>(
  {
    amount: s.int(),
    currency: s.string(),
    reason: s.optional(s.lazy(() => refundReasonRequestSchema)),
    message: s.optional(s.string()),
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  },
  { additionalProperties: s.json() },
);
