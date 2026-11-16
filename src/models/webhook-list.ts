import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookInternalSchema, webhookSchema, type Webhook } from "./webhook.js";

/** ページネーションされたウェブフックのリスト。 */
export type WebhookList = {
  /** リソースのリスト。 */
  items?: Webhook[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const webhookListProperties: s.Shape<WebhookList> = {
  items: s.optional(s.array(s.lazy(() => webhookInternalSchema))),
  hasMore: s.optional(s.boolean()),
  _keysMap: {
    hasMore: "has_more",
  },
};

export const webhookListInternalSchema: Schema<WebhookList> = s.object<WebhookList>(webhookListProperties, {
  additionalProperties: s.json(),
});

export const webhookListSchema: Schema<WebhookList> = s.lazySchema(() =>
  s.object<WebhookList>(
    {
      ...webhookListProperties,
      items: s.optional(s.array(s.lazy(() => webhookSchema))),
    },
    { additionalProperties: s.json() },
  ),
);
