import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";

/**
 * 課金のキャンセルを作成するためのリクエストボディ。`metadata`
 * のみが受け付けられ、その他のフィールドはすべてサーバー側で決定されます。課金はキャンセル可能なステータスである必要があります。
 */
export type CancelCreateRequest = {
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cancelCreateRequestSchema: Schema<CancelCreateRequest> = s.object<CancelCreateRequest>(
  {
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  },
  { additionalProperties: s.json() },
);
