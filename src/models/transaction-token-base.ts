import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { transactionTokenModeSchema, type TransactionTokenMode } from "./transaction-token-mode.js";
import { transactionTokenTypeSchema, type TransactionTokenType } from "./transaction-token-type.js";
import {
  transactionTokenMetadataAdditionalPropertiesSchema,
  type TransactionTokenMetadataAdditionalProperties,
} from "./unions/transaction-token-metadata-additional-properties.js";

/**
 * 支払いタイプに関わらず、保存されたすべてのトランザクション・トークンに共通するフィールド。`payment_type` と `data` は意図的に含まれていません — 各決済タイプはそれぞれの
 * `data` 形状を持つ形でこれらのフィールドを重ねます。両者をまとめる判別可能な共用体については `TransactionToken` を参照してください。
 */
export type TransactionTokenBase = {
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
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const transactionTokenBaseProperties: s.Shape<TransactionTokenBase> = {
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
  _keysMap: {
    storeId: "store_id",
    usageLimit: "usage_limit",
    createdOn: "created_on",
    updatedOn: "updated_on",
    lastUsedOn: "last_used_on",
  },
};

export const transactionTokenBaseInternalSchema: Schema<TransactionTokenBase> =
  s.object<TransactionTokenBase>(transactionTokenBaseProperties, { additionalProperties: s.json() });

export const transactionTokenBaseSchema: Schema<TransactionTokenBase> = s.lazySchema(() =>
  s.object<TransactionTokenBase>(
    {
      ...transactionTokenBaseProperties,
      email: s.optionalNullable(s.string().check(s.email())),
    },
    { additionalProperties: s.json() },
  ),
);
