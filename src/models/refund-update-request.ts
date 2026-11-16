import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import { refundReasonRequestSchema, type RefundReasonRequest } from "./refund-reason-request.js";

/** 返金を更新するためのリクエストボディ。すべてのフィールドはオプションです。省略されたフィールドは変更されません。 */
export type RefundUpdateRequest = {
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 返金メモを更新またはクリアします。削除するには `null` を送信します。 */
  message?: string | null;
  /** 加盟店が設定可能な返金理由。更新時に削除するには `null` を指定します。 */
  reason?: RefundReasonRequest | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const refundUpdateRequestSchema: Schema<RefundUpdateRequest> = s.object<RefundUpdateRequest>(
  {
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
    message: s.optionalNullable(s.string()),
    reason: s.optionalNullable(s.lazy(() => refundReasonRequestSchema)),
  },
  { additionalProperties: s.json() },
);
