import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 定期課金終了モードのスキーマ。 */
export const SubscriptionTerminationMode = {
  Immediate: "immediate",
  OnNextPayment: "on_next_payment",
} as const;
export type SubscriptionTerminationMode =
  | (typeof SubscriptionTerminationMode)[keyof typeof SubscriptionTerminationMode]
  | (string & {});

export const subscriptionTerminationModeSchema: EnumSchema<SubscriptionTerminationMode> =
  s.enumOf<SubscriptionTerminationMode>(SubscriptionTerminationMode);
