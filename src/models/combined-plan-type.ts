import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** プランタイプのセレクタ。 */
export const CombinedPlanType = {
  Revolving: "revolving",
  FixedCycles: "fixed_cycles",
  FixedCycleAmount: "fixed_cycle_amount",
} as const;
export type CombinedPlanType = (typeof CombinedPlanType)[keyof typeof CombinedPlanType] | (string & {});

export const combinedPlanTypeSchema: EnumSchema<CombinedPlanType> =
  s.enumOf<CombinedPlanType>(CombinedPlanType);
