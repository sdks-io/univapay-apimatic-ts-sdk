import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import {
  transactionTokenUpdateRequestDataSchema,
  type TransactionTokenUpdateRequestData,
} from "./transaction-token-update-request-data.js";

/** トランザクション・トークン更新用のリクエスト・ペイロード。 */
export type TransactionTokenUpdateRequest = {
  /** 消費者のメールアドレス。 */
  email?: string;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** トランザクション・トークン更新リクエストデータのスキーマ。 */
  data?: TransactionTokenUpdateRequestData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionTokenUpdateRequestSchema: Schema<TransactionTokenUpdateRequest> =
  s.object<TransactionTokenUpdateRequest>(
    {
      email: s.optional(s.string()),
      metadata: s.optional(s.lazy(() => genericMetadataSchema)),
      data: s.optional(s.lazy(() => transactionTokenUpdateRequestDataSchema)),
    },
    { additionalProperties: s.json() },
  );
