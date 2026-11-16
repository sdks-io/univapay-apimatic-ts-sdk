import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { subscriptionPaymentSchema, type SubscriptionPayment } from "./subscription-payment.js";

/** ページネーションされた定期課金支払いのリスト。 */
export type SubscriptionPaymentList = {
  /** リソースのリスト。 */
  items?: SubscriptionPayment[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionPaymentListSchema: Schema<SubscriptionPaymentList> =
  s.object<SubscriptionPaymentList>(
    {
      items: s.optional(s.array(s.lazy(() => subscriptionPaymentSchema))),
      hasMore: s.optional(s.boolean()),
      _keysMap: {
        hasMore: "has_more",
      },
    },
    { additionalProperties: s.json() },
  );
