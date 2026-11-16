import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionListItemInternalSchema,
  subscriptionListItemSchema,
  type SubscriptionListItem,
} from "./subscription-list-item.js";

/** ページネーションされた定期課金のリスト。 */
export type SubscriptionList = {
  /** リソースのリスト。 */
  items?: SubscriptionListItem[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** 一致するリソースの総数。 */
  totalHits?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionListProperties: s.Shape<SubscriptionList> = {
  items: s.optional(s.array(s.lazy(() => subscriptionListItemInternalSchema))),
  hasMore: s.optional(s.boolean()),
  totalHits: s.optional(s.int()),
  _keysMap: {
    hasMore: "has_more",
    totalHits: "total_hits",
  },
};

export const subscriptionListInternalSchema: Schema<SubscriptionList> = s.object<SubscriptionList>(
  subscriptionListProperties,
  { additionalProperties: s.json() },
);

export const subscriptionListSchema: Schema<SubscriptionList> = s.lazySchema(() =>
  s.object<SubscriptionList>(
    {
      ...subscriptionListProperties,
      items: s.optional(s.array(s.lazy(() => subscriptionListItemSchema))),
    },
    { additionalProperties: s.json() },
  ),
);
