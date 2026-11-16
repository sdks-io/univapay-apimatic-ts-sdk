import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 定期課金周期のスキーマ。 */
export const SubscriptionPeriod = {
  Daily: "daily",
  Weekly: "weekly",
  Biweekly: "biweekly",
  Monthly: "monthly",
  Quarterly: "quarterly",
  Semiannually: "semiannually",
  Annually: "annually",
} as const;
export type SubscriptionPeriod = (typeof SubscriptionPeriod)[keyof typeof SubscriptionPeriod] | (string & {});

export const subscriptionPeriodSchema: EnumSchema<SubscriptionPeriod> =
  s.enumOf<SubscriptionPeriod>(SubscriptionPeriod);
