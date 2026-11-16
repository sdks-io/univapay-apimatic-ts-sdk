import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** プランタイプのセレクタ。 */
export const SimulationPlanSettingsType = {
  Revolving: "revolving",
  FixedCycles: "fixed_cycles",
  FixedCycleAmount: "fixed_cycle_amount",
} as const;
export type SimulationPlanSettingsType =
  | (typeof SimulationPlanSettingsType)[keyof typeof SimulationPlanSettingsType]
  | (string & {});

export const simulationPlanSettingsTypeSchema: EnumSchema<SimulationPlanSettingsType> =
  s.enumOf<SimulationPlanSettingsType>(SimulationPlanSettingsType);
