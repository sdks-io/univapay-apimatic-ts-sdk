import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 次回の支払い日に定期課金を移行させるステータス。 */
export const SubscriptionTerminateWithStatus = {
  Suspended: "suspended",
  Canceled: "canceled",
} as const;
export type SubscriptionTerminateWithStatus =
  | (typeof SubscriptionTerminateWithStatus)[keyof typeof SubscriptionTerminateWithStatus]
  | (string & {});

export const subscriptionTerminateWithStatusSchema: EnumSchema<SubscriptionTerminateWithStatus> =
  s.enumOf<SubscriptionTerminateWithStatus>(SubscriptionTerminateWithStatus);
