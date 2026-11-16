import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  combinedInstallmentFixedCyclesSchema,
  type CombinedInstallmentFixedCycles,
} from "./combined-installment-fixed-cycles.js";
import { combinedPlanTypeSchema, type CombinedPlanType } from "./combined-plan-type.js";

/**
 * 定期課金に適用された分割払いプラン（APIレスポンスとして返される値）。カード会社側の分割払いプラン（`revolving`、`fixed_cycles`）と、レガシーな固定金額の分割払いプラン（`fixed_cycle_amount`）の両方に対応します。
 */
export type SubscriptionInstallmentPlanResponse = {
  /** プランタイプのセレクタ。 */
  planType?: CombinedPlanType;
  /** 分割払いのサイクル数。plan_type が fixed_cycles の場合に存在します。 */
  fixedCycles?: CombinedInstallmentFixedCycles | null;
  /**
   * fixed_cycle_amount プランの総目標金額（通貨の最小単位）。plan_type が fixed_cycle_amount の場合に存在します。なお、複数形の
   * `fixed_cycles_amount` というキー名は、`subscription_plan` の単数形キー `fixed_cycle_amount` とは異なります。
   */
  fixedCyclesAmount?: number | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionInstallmentPlanResponseSchema: Schema<SubscriptionInstallmentPlanResponse> =
  s.object<SubscriptionInstallmentPlanResponse>(
    {
      planType: s.optional(s.lazy(() => combinedPlanTypeSchema)),
      fixedCycles: s.optionalNullable(s.lazy(() => combinedInstallmentFixedCyclesSchema)),
      fixedCyclesAmount: s.optionalNullable(s.int()),
      _keysMap: {
        planType: "plan_type",
        fixedCycles: "fixed_cycles",
        fixedCyclesAmount: "fixed_cycles_amount",
      },
    },
    { additionalProperties: s.json() },
  );
