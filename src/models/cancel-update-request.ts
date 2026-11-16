import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";

/** キャンセルを更新するためのリクエストボディ。加盟店が設定できるのは `metadata` のみです。すべてのフィールドはオプションであり、省略されたフィールドは変更されません。 */
export type CancelUpdateRequest = {
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cancelUpdateRequestSchema: Schema<CancelUpdateRequest> = s.object<CancelUpdateRequest>(
  {
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  },
  { additionalProperties: s.json() },
);
