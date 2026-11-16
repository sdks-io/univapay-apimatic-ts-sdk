import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  tokenResponseQrScanDataSchema,
  type TokenResponseQrScanData,
} from "./token-response-qr-scan-data.js";
import { transactionTokenModeSchema, type TransactionTokenMode } from "./transaction-token-mode.js";
import { transactionTokenTypeSchema, type TransactionTokenType } from "./transaction-token-type.js";
import {
  transactionTokenMetadataAdditionalPropertiesSchema,
  type TransactionTokenMetadataAdditionalProperties,
} from "./unions/transaction-token-metadata-additional-properties.js";

/** `qr_scan`（QR消費者提示方式）決済タイプの保存されたトランザクション・トークンリソース。 */
export type QrScanTransactionToken = {
  /** 一意の識別子。 */
  id?: string;
  /** 店舗識別子。 */
  storeId?: string;
  /** 消費者のメールアドレス。 */
  email?: string | null;
  /** リソースがアクティブ（有効）かどうか。 */
  active?: boolean;
  /** トランザクション・トークンモードのスキーマ。 */
  mode?: TransactionTokenMode;
  /** トランザクション・トークンタイプのスキーマ。 */
  type?: TransactionTokenType;
  /** トークンに適用される利用回数制限。 */
  usageLimit?: string | null;
  /** トークンが確認（コンファーム）されたかどうか。 */
  confirmed?: boolean | null;
  /** 任意のキーと値のメタデータ。 */
  metadata?: Record<string, TransactionTokenMetadataAdditionalProperties>;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** トークンが最後に使用されたタイムスタンプ。 */
  lastUsedOn?: Date | null;
  /** 決済方法タイプ。このバリアントでは常に `qr_scan` です。 @default "qr_scan" */
  paymentType?: "qr_scan";
  /** トークンレスポンス用のQRスキャン（CPM）データスキーマ。 */
  data: TokenResponseQrScanData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const qrScanTransactionTokenProperties: s.Shape<QrScanTransactionToken> = {
  id: s.optional(s.string()),
  storeId: s.optional(s.string()),
  email: s.optionalNullable(s.string()),
  active: s.optional(s.boolean()),
  mode: s.optional(s.lazy(() => transactionTokenModeSchema)),
  type: s.optional(s.lazy(() => transactionTokenTypeSchema)),
  usageLimit: s.optionalNullable(s.string()),
  confirmed: s.optionalNullable(s.boolean()),
  metadata: s.optional(
    s.record(
      s.string(),
      s.lazy(() => transactionTokenMetadataAdditionalPropertiesSchema),
    ),
  ),
  createdOn: s.optional(s.dateTime()),
  updatedOn: s.optional(s.dateTime()),
  lastUsedOn: s.optionalNullable(s.dateTime()),
  paymentType: s.defaulted(s.literal("qr_scan"), "qr_scan"),
  data: tokenResponseQrScanDataSchema,
  _keysMap: {
    storeId: "store_id",
    usageLimit: "usage_limit",
    createdOn: "created_on",
    updatedOn: "updated_on",
    lastUsedOn: "last_used_on",
    paymentType: "payment_type",
  },
};

export const qrScanTransactionTokenInternalSchema: Schema<QrScanTransactionToken> =
  s.object<QrScanTransactionToken>(qrScanTransactionTokenProperties, { additionalProperties: s.json() });

export const qrScanTransactionTokenSchema: Schema<QrScanTransactionToken> = s.lazySchema(() =>
  s.object<QrScanTransactionToken>(
    {
      ...qrScanTransactionTokenProperties,
      email: s.optionalNullable(s.string().check(s.email())),
    },
    { additionalProperties: s.json() },
  ),
);
