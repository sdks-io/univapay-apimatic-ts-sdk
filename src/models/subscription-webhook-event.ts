import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { subscriptionEventSchema, type SubscriptionEvent } from "./subscription-event.js";
import { subscriptionInternalSchema, subscriptionSchema, type Subscription } from "./subscription.js";

/**
 * 定期課金のライフサイクルイベント用のウェブフックエンベロープ。作成・初回支払い開始時は `subscription_created`、定期支払い成功時は
 * `subscription_payment`、全予定支払い完了時は `subscription_completed`、定期支払い失敗時は
 * `subscription_failure`、全支払い完了前のキャンセル時は `subscription_canceled`、一時停止時は `subscription_suspended`
 * で発火します。`data` フィールドには、イベント発生時点の Subscription オブジェクト全体が含まれます。
 */
export type SubscriptionWebhookEvent = {
  /** このウェブフック配信の一意の ID。 */
  id?: string;
  /**
   * イベントタイプの識別子 —
   * `subscription_created`、`subscription_payment`、`subscription_completed`、`subscription_failure`、`subscription_canceled`、または
   * `subscription_suspended`。
   */
  event: SubscriptionEvent;
  /** 定期課金オブジェクト。定期的な決済スケジュールを表します。 */
  data?: Subscription;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionWebhookEventProperties: s.Shape<SubscriptionWebhookEvent> = {
  id: s.optional(s.string()),
  event: subscriptionEventSchema,
  data: s.optional(s.lazy(() => subscriptionInternalSchema)),
  createdOn: s.optional(s.dateTime()),
  _keysMap: {
    createdOn: "created_on",
  },
};

export const subscriptionWebhookEventInternalSchema: Schema<SubscriptionWebhookEvent> =
  s.object<SubscriptionWebhookEvent>(subscriptionWebhookEventProperties, { additionalProperties: s.json() });

export const subscriptionWebhookEventSchema: Schema<SubscriptionWebhookEvent> = s.lazySchema(() =>
  s.object<SubscriptionWebhookEvent>(
    {
      ...subscriptionWebhookEventProperties,
      data: s.optional(s.lazy(() => subscriptionSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
