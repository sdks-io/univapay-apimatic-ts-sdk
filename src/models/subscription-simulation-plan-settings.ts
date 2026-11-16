import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  simulationPlanSettingsTypeSchema,
  type SimulationPlanSettingsType,
} from "./simulation-plan-settings-type.js";

/** 分割払いプランまたは Univapay 側の定期課金プランをシミュレートするための、サイクル数を限定するプラン設定。 */
export type SubscriptionSimulationPlanSettings = {
  /** プランタイプのセレクタ。 */
  planType?: SimulationPlanSettingsType;
  /** fixed_cycles プランのサイクル数（回数）。1 より大きい値を指定してください。 */
  fixedCycles?: number;
  /** fixed_cycle_amount プランの総目標金額。リクエストする金額を超えることはできません。 */
  fixedCycleAmount?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionSimulationPlanSettingsSchema: Schema<SubscriptionSimulationPlanSettings> =
  s.object<SubscriptionSimulationPlanSettings>(
    {
      planType: s.optional(s.lazy(() => simulationPlanSettingsTypeSchema)),
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
