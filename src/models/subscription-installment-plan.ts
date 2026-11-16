import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { installmentFixedCyclesSchema, type InstallmentFixedCycles } from "./installment-fixed-cycles.js";
import { installmentPlanTypeSchema, type InstallmentPlanType } from "./installment-plan-type.js";

/** クレジットカード会社側の分割払い（会社側分割）用の設定。 */
export type SubscriptionInstallmentPlan = {
  /** プランタイプのセレクタ。 */
  planType?: InstallmentPlanType;
  /** plan_type が fixed_cycles の場合に必須。 */
  fixedCycles?: InstallmentFixedCycles;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionInstallmentPlanSchema: Schema<SubscriptionInstallmentPlan> =
  s.object<SubscriptionInstallmentPlan>(
    {
      planType: s.optional(s.lazy(() => installmentPlanTypeSchema)),
      fixedCycles: s.optional(s.lazy(() => installmentFixedCyclesSchema)),
      _keysMap: {
        planType: "plan_type",
        fixedCycles: "fixed_cycles",
      },
    },
    { additionalProperties: s.json() },
  );
