import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { checkoutMoneyAmountSchema, type CheckoutMoneyAmount } from "./checkout-money-amount.js";
import { checkoutPaymentTypeSchema, type CheckoutPaymentType } from "./checkout-payment-type.js";

/** Univapay 側の定期課金プランの、チェックアウトに適用される設定。 */
export type CheckoutSubscriptionPlanConfiguration = {
  /** 定期課金プランが有効かどうか。 */
  enabled?: boolean;
  /** 固定サイクル数（回数）に限定された定期課金プランを許可するかどうか。 */
  fixedCycle?: boolean;
  /** 総目標金額に限定された定期課金プランを許可するかどうか。 */
  fixedCycleAmount?: boolean;
  /** 定期課金プランを使用できる決済手段の種類。 */
  supportedPaymentTypes?: CheckoutPaymentType[];
  /** 定期課金プランの対象となる最低課金額。制限がない場合は `null` になります。 */
  minChargeAmount?: CheckoutMoneyAmount | null;
  /** 定期課金精算のために許容される最大支払い遅延期間を表す ISO-8601 期間。制限がない場合は `null` になります。 */
  maxPayoutPeriod?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutSubscriptionPlanConfigurationSchema: Schema<CheckoutSubscriptionPlanConfiguration> =
  s.object<CheckoutSubscriptionPlanConfiguration>(
    {
      enabled: s.optional(s.boolean()),
      fixedCycle: s.optional(s.boolean()),
      fixedCycleAmount: s.optional(s.boolean()),
      supportedPaymentTypes: s.optional(s.array(s.lazy(() => checkoutPaymentTypeSchema))),
      minChargeAmount: s.optionalNullable(s.lazy(() => checkoutMoneyAmountSchema)),
      maxPayoutPeriod: s.optionalNullable(s.string()),
      _keysMap: {
        fixedCycle: "fixed_cycle",
        fixedCycleAmount: "fixed_cycle_amount",
        supportedPaymentTypes: "supported_payment_types",
        minChargeAmount: "min_charge_amount",
        maxPayoutPeriod: "max_payout_period",
      },
    },
    { additionalProperties: s.json() },
  );
