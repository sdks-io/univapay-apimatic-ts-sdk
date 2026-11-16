import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 定期課金ステータスのスキーマ。 */
export const SubscriptionStatus = {
  Unverified: "unverified",
  Unconfirmed: "unconfirmed",
  Canceled: "canceled",
  Unpaid: "unpaid",
  Current: "current",
  Suspended: "suspended",
  Completed: "completed",
} as const;
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus] | (string & {});

export const subscriptionStatusSchema: EnumSchema<SubscriptionStatus> =
  s.enumOf<SubscriptionStatus>(SubscriptionStatus);
