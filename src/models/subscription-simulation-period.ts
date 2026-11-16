import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** シミュレートされたスケジュールの請求頻度。ライブでの定期課金作成に使用する `SubscriptionPeriod` にはない `bimonthly`（隔月）を含みます。 */
export const SubscriptionSimulationPeriod = {
  Daily: "daily",
  Weekly: "weekly",
  Biweekly: "biweekly",
  Monthly: "monthly",
  Bimonthly: "bimonthly",
  Quarterly: "quarterly",
  Semiannually: "semiannually",
  Annually: "annually",
} as const;
export type SubscriptionSimulationPeriod =
  | (typeof SubscriptionSimulationPeriod)[keyof typeof SubscriptionSimulationPeriod]
  | (string & {});

export const subscriptionSimulationPeriodSchema: EnumSchema<SubscriptionSimulationPeriod> =
  s.enumOf<SubscriptionSimulationPeriod>(SubscriptionSimulationPeriod);
