import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { planSettingsTypeSchema, type PlanSettingsType } from "./plan-settings-type.js";

/** 回数限定定期課金（Univapay側での管理）用の設定。 */
export type SubscriptionPlanSettings = {
  /** プランタイプのセレクタ。 */
  planType?: PlanSettingsType;
  /** fixed_cycles プランのサイクル数（回数）。 */
  fixedCycles?: number;
  /** fixed_cycle_amount プランの総目標金額。 */
  fixedCycleAmount?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionPlanSettingsSchema: Schema<SubscriptionPlanSettings> =
  s.object<SubscriptionPlanSettings>(
    {
      planType: s.optional(s.lazy(() => planSettingsTypeSchema)),
      fixedCycles: s.optional(s.int()),
      fixedCycleAmount: s.optional(s.int()),
      _keysMap: {
        planType: "plan_type",
        fixedCycles: "fixed_cycles",
        fixedCycleAmount: "fixed_cycle_amount",
      },
    },
    { additionalProperties: s.json() },
  );
