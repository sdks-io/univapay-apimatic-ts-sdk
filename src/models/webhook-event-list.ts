import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookEventSchema, type WebhookEvent } from "./webhook-event.js";

/** ページネーションされたウェブフックイベントのリスト。 */
export type WebhookEventList = {
  /** リソースのリスト。 */
  items?: WebhookEvent[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const webhookEventListSchema: Schema<WebhookEventList> = s.object<WebhookEventList>(
  {
    items: s.optional(s.array(s.lazy(() => webhookEventSchema))),
    hasMore: s.optional(s.boolean()),
    _keysMap: {
      hasMore: "has_more",
    },
  },
  { additionalProperties: s.json() },
);
