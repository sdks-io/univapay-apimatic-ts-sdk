import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 店舗リストクエリによって返される店舗の行データ。 */
export type StoreListItem = {
  /** 店舗識別子。 */
  id?: string;
  /** 店舗の表示名。 */
  name?: string;
  /** 店舗の行データに関連付けられている加盟店の表示名。 */
  merchantName?: string;
  /** 店舗が作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const storeListItemSchema: Schema<StoreListItem> = s.object<StoreListItem>(
  {
    id: s.optional(s.string()),
    name: s.optional(s.string()),
    merchantName: s.optional(s.string()),
    createdOn: s.optional(s.dateTime()),
    _keysMap: {
      merchantName: "merchant_name",
      createdOn: "created_on",
    },
  },
  { additionalProperties: s.json() },
);
