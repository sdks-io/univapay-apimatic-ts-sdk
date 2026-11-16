import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * イベントタイプの識別子 —
 * `subscription_created`、`subscription_payment`、`subscription_completed`、`subscription_failure`、`subscription_canceled`、または
 * `subscription_suspended`。
 */
export const SubscriptionEvent = {
  SubscriptionCreated: "subscription_created",
  SubscriptionPayment: "subscription_payment",
  SubscriptionCompleted: "subscription_completed",
  SubscriptionFailure: "subscription_failure",
  SubscriptionCanceled: "subscription_canceled",
  SubscriptionSuspended: "subscription_suspended",
} as const;
export type SubscriptionEvent = (typeof SubscriptionEvent)[keyof typeof SubscriptionEvent] | (string & {});

export const subscriptionEventSchema: EnumSchema<SubscriptionEvent> =
  s.enumOf<SubscriptionEvent>(SubscriptionEvent);
