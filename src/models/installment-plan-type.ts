import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** プランタイプのセレクタ。 */
export const InstallmentPlanType = {
  Revolving: "revolving",
  FixedCycles: "fixed_cycles",
} as const;
export type InstallmentPlanType =
  | (typeof InstallmentPlanType)[keyof typeof InstallmentPlanType]
  | (string & {});

export const installmentPlanTypeSchema: EnumSchema<InstallmentPlanType> =
  s.enumOf<InstallmentPlanType>(InstallmentPlanType);
