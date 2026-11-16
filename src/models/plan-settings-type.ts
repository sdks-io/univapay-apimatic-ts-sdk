import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** プランタイプのセレクタ。 */
export const PlanSettingsType = {
  FixedCycles: "fixed_cycles",
  FixedCycleAmount: "fixed_cycle_amount",
} as const;
export type PlanSettingsType = (typeof PlanSettingsType)[keyof typeof PlanSettingsType] | (string & {});

export const planSettingsTypeSchema: EnumSchema<PlanSettingsType> =
  s.enumOf<PlanSettingsType>(PlanSettingsType);
