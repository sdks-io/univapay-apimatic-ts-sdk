import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  transactionTokenListItemSchema,
  type TransactionTokenListItem,
} from "./transaction-token-list-item.js";

/** ページネーションされたトランザクション・トークンのリスト。 */
export type TransactionTokenList = {
  /** リソースのリスト。 */
  items?: TransactionTokenListItem[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** 一致するリソースの総数。 */
  totalHits?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionTokenListSchema: Schema<TransactionTokenList> = s.object<TransactionTokenList>(
  {
    items: s.optional(s.array(s.lazy(() => transactionTokenListItemSchema))),
    hasMore: s.optional(s.boolean()),
    totalHits: s.optional(s.int()),
    _keysMap: {
      hasMore: "has_more",
      totalHits: "total_hits",
    },
  },
  { additionalProperties: s.json() },
);
