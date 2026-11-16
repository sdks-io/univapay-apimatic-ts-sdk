import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { refundSchema, type Refund } from "./refund.js";

/** ページネーションされた返金リスト。 */
export type RefundList = {
  /** リソースのリスト。 */
  items?: Refund[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** 一致するリソースの総数。 */
  totalHits?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const refundListSchema: Schema<RefundList> = s.object<RefundList>(
  {
    items: s.optional(s.array(s.lazy(() => refundSchema))),
    hasMore: s.optional(s.boolean()),
    totalHits: s.optional(s.int()),
    _keysMap: {
      hasMore: "has_more",
      totalHits: "total_hits",
    },
  },
  { additionalProperties: s.json() },
);
