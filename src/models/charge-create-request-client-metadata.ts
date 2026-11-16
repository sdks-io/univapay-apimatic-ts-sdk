import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 課金作成リクエストのクライアントメタデータスキーマ。 */
export type ChargeCreateRequestClientMetadata = {
  /** 消費者の IPv4 アドレス。 */
  ipAddress?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const chargeCreateRequestClientMetadataSchema: Schema<ChargeCreateRequestClientMetadata> =
  s.object<ChargeCreateRequestClientMetadata>(
    {
      ipAddress: s.optional(s.string()),
      _keysMap: {
        ipAddress: "ip_address",
      },
    },
    { additionalProperties: s.json() },
  );
