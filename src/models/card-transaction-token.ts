import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  tokenResponseCardDataInternalSchema,
  tokenResponseCardDataSchema,
  type TokenResponseCardData,
} from "./token-response-card-data.js";
import { transactionTokenModeSchema, type TransactionTokenMode } from "./transaction-token-mode.js";
import { transactionTokenTypeSchema, type TransactionTokenType } from "./transaction-token-type.js";
import {
  transactionTokenMetadataAdditionalPropertiesSchema,
  type TransactionTokenMetadataAdditionalProperties,
} from "./unions/transaction-token-metadata-additional-properties.js";

/** `card` 決済タイプの保存されたトランザクション・トークンリソース。 */
export type CardTransactionToken = {
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
  /** 決済方法タイプ。このバリアントでは常に `card` です。 @default "card" */
  paymentType?: "card";
  /** トークンレスポンス用のカードデータスキーマ。 */
  data: TokenResponseCardData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const cardTransactionTokenProperties: s.Shape<CardTransactionToken> = {
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
  paymentType: s.defaulted(s.literal("card"), "card"),
  data: tokenResponseCardDataInternalSchema,
  _keysMap: {
    storeId: "store_id",
    usageLimit: "usage_limit",
    createdOn: "created_on",
    updatedOn: "updated_on",
    lastUsedOn: "last_used_on",
    paymentType: "payment_type",
  },
};

export const cardTransactionTokenInternalSchema: Schema<CardTransactionToken> =
  s.object<CardTransactionToken>(cardTransactionTokenProperties, { additionalProperties: s.json() });

export const cardTransactionTokenSchema: Schema<CardTransactionToken> = s.lazySchema(() =>
  s.object<CardTransactionToken>(
    {
      ...cardTransactionTokenProperties,
      email: s.optionalNullable(s.string().check(s.email())),
      data: tokenResponseCardDataSchema,
    },
    { additionalProperties: s.json() },
  ),
);
