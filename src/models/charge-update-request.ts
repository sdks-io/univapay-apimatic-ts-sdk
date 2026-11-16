import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";

/** 課金メタデータ更新用のリクエスト・ペイロード。 */
export type ChargeUpdateRequest = {
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const chargeUpdateRequestSchema: Schema<ChargeUpdateRequest> = s.object<ChargeUpdateRequest>(
  {
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  },
  { additionalProperties: s.json() },
);
