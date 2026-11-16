import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { transactionHistoryItemSchema, type TransactionHistoryItem } from "./transaction-history-item.js";

/**
 * トランザクション履歴の行のページネーションされたリスト。本APIの他のリストレスポンスとは異なり、`total_hits` は最初のページ（`cursor`
 * が指定されていない場合）または最後のページにのみ含まれ、`next_cursor` は `has_more` が `true` の間のみ含まれます。
 */
export type TransactionHistoryList = {
  /** リソースのリスト。 */
  items?: TransactionHistoryItem[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** 一致するリソースの総数。最初のページ（`cursor` が指定されていない場合）または最後のページに含まれ、`has_more` が `true` の間の中間ページでは省略されます。 */
  totalHits?: number;
  /** 次のページを取得するために `cursor` として渡すカーソル。`has_more` が `true` の間のみ存在します。 */
  nextCursor?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionHistoryListSchema: Schema<TransactionHistoryList> = s.object<TransactionHistoryList>(
  {
    items: s.optional(s.array(s.lazy(() => transactionHistoryItemSchema))),
    hasMore: s.optional(s.boolean()),
    totalHits: s.optional(s.int()),
    nextCursor: s.optional(s.string()),
    _keysMap: {
      hasMore: "has_more",
      totalHits: "total_hits",
      nextCursor: "next_cursor",
    },
  },
  { additionalProperties: s.json() },
);
