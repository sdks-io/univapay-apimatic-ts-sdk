import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  transactionTokenCreateRequestMetadataSchema,
  type TransactionTokenCreateRequestMetadata,
} from "./transaction-token-create-request-metadata.js";
import {
  transactionTokenCreateRequestPaymentTypeSchema,
  type TransactionTokenCreateRequestPaymentType,
} from "./transaction-token-create-request-payment-type.js";
import {
  transactionTokenCreateRequestTypeSchema,
  type TransactionTokenCreateRequestType,
} from "./transaction-token-create-request-type.js";
import {
  transactionTokenCreateRequestDataInternalSchema,
  transactionTokenCreateRequestDataSchema,
  type TransactionTokenCreateRequestData,
} from "./unions/transaction-token-create-request-data.js";

/** 課金の対象となる支払い方法を表すトランザクション・トークンを作成するためのリクエストペイロード。 */
export type TransactionTokenCreateRequest = {
  /** トランザクション・トークン作成リクエスト決済タイプのスキーマ。 */
  paymentType: TransactionTokenCreateRequestPaymentType;
  /**
   * 作成するトークンのタイプ。指定できる値は `payment_type` によって異なります。`card` と `konbini` は3種類すべてを指定できます。`bank_transfer`
   * は `one_time` と `recurring` のみ、`online`・`qr_scan`・`qr_merchant` は `one_time`
   * のみ指定できます。それ以外の組み合わせは、`type` フィールドに対する `INVALID_TOKEN_TYPE` で拒否されます。
   */
  type: TransactionTokenCreateRequestType;
  /** 消費者のメールアドレス。 */
  email?: string;
  /** トークンに適用される利用回数制限。 */
  usageLimit?: string;
  /**
   * 消費者の IPv4 アドレス。`data.brand` が `we_chat_online` かつ `data.call_method` が `web` または `http_get`
   * の場合に**必須**です。
   */
  ipAddress?: string;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: TransactionTokenCreateRequestMetadata;
  /** トランザクション・トークン作成リクエストデータのスキーマ。 */
  data: TransactionTokenCreateRequestData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const transactionTokenCreateRequestProperties: s.Shape<TransactionTokenCreateRequest> = {
  paymentType: transactionTokenCreateRequestPaymentTypeSchema,
  type: transactionTokenCreateRequestTypeSchema,
  email: s.optional(s.string()),
  usageLimit: s.optional(s.string()),
  ipAddress: s.optional(s.string()),
  metadata: s.optional(s.lazy(() => transactionTokenCreateRequestMetadataSchema)),
  data: transactionTokenCreateRequestDataInternalSchema,
  _keysMap: {
    paymentType: "payment_type",
    usageLimit: "usage_limit",
    ipAddress: "ip_address",
  },
};

export const transactionTokenCreateRequestInternalSchema: Schema<TransactionTokenCreateRequest> =
  s.object<TransactionTokenCreateRequest>(transactionTokenCreateRequestProperties, {
    additionalProperties: s.json(),
  });

export const transactionTokenCreateRequestSchema: Schema<TransactionTokenCreateRequest> = s.lazySchema(() =>
  s.object<TransactionTokenCreateRequest>(
    {
      ...transactionTokenCreateRequestProperties,
      email: s.optional(s.string().check(s.email())),
      data: transactionTokenCreateRequestDataSchema,
    },
    { additionalProperties: s.json() },
  ),
);
