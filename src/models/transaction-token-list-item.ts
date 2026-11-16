import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  transactionTokenListItemUserDataSchema,
  type TransactionTokenListItemUserData,
} from "./transaction-token-list-item-user-data.js";

/** リストレスポンスで返されるトランザクション・トークンのエントリ。 */
export type TransactionTokenListItem = {
  /** 一意の識別子。 */
  id?: string;
  /** 店舗識別子。 */
  storeId?: string;
  /** 加盟店の表示名。 */
  merchantName?: string;
  /** 店舗の表示名。 */
  storeName?: string;
  /** 消費者のメールアドレス。 */
  email?: string;
  /** 決済手段のタイプ。 */
  paymentType?: string;
  /** リソースがアクティブかどうか。 */
  active?: boolean;
  /** リソースの処理モード（本番/テスト）。 */
  mode?: string;
  /** リソースのタイプ。 */
  type?: string;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** トランザクション・トークンリストアイテムユーザーデータのスキーマ。 */
  userData?: TransactionTokenListItemUserData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionTokenListItemSchema: Schema<TransactionTokenListItem> =
  s.object<TransactionTokenListItem>(
    {
      id: s.optional(s.string()),
      storeId: s.optional(s.string()),
      merchantName: s.optional(s.string()),
      storeName: s.optional(s.string()),
      email: s.optional(s.string()),
      paymentType: s.optional(s.string()),
      active: s.optional(s.boolean()),
      mode: s.optional(s.string()),
      type: s.optional(s.string()),
      createdOn: s.optional(s.dateTime()),
      updatedOn: s.optional(s.dateTime()),
      userData: s.optional(s.lazy(() => transactionTokenListItemUserDataSchema)),
      _keysMap: {
        storeId: "store_id",
        merchantName: "merchant_name",
        storeName: "store_name",
        paymentType: "payment_type",
        createdOn: "created_on",
        updatedOn: "updated_on",
        userData: "user_data",
      },
    },
    { additionalProperties: s.json() },
  );
