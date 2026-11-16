import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 分割払いのサイクル数。plan_type が fixed_cycles の場合に存在します。 */
export const CombinedInstallmentFixedCycles = {
  /** 3 サイクル */
  _3: 3,
  /** 5 サイクル */
  _5: 5,
  /** 6 サイクル */
  _6: 6,
  /** 10 サイクル */
  _10: 10,
  /** 12 サイクル */
  _12: 12,
  /** 15 サイクル */
  _15: 15,
  /** 18 サイクル */
  _18: 18,
  /** 20 サイクル */
  _20: 20,
  /** 24 サイクル */
  _24: 24,
} as const;
export type CombinedInstallmentFixedCycles =
  | (typeof CombinedInstallmentFixedCycles)[keyof typeof CombinedInstallmentFixedCycles]
  | (number & {});

export const combinedInstallmentFixedCyclesSchema: EnumSchema<CombinedInstallmentFixedCycles> =
  s.enumOf<CombinedInstallmentFixedCycles>(CombinedInstallmentFixedCycles);
