import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { storeListItemSchema, type StoreListItem } from "./store-list-item.js";

/** ページネーションされた店舗検索結果。 */
export type StoreList = {
  /** 現在のフィルターセットに一致する店舗の行データ。 */
  items?: StoreListItem[];
  /** 次のページが利用可能かどうか。 */
  hasMore?: boolean;
  /** 利用可能な場合、一致する店舗の総数。 */
  totalHits?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const storeListSchema: Schema<StoreList> = s.object<StoreList>(
  {
    items: s.optional(s.array(s.lazy(() => storeListItemSchema))),
    hasMore: s.optional(s.boolean()),
    totalHits: s.optional(s.int()),
    _keysMap: {
      hasMore: "has_more",
      totalHits: "total_hits",
    },
  },
  { additionalProperties: s.json() },
);
