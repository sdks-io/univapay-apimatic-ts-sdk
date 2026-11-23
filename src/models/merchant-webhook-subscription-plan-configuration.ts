import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookMoneyAmountSchema,
  type MerchantWebhookMoneyAmount,
} from "./merchant-webhook-money-amount.js";

/** 定期課金プランの設定。 */
export type MerchantWebhookSubscriptionPlanConfiguration = {
  /** 回数限定の定期課金プランを有効にします。 */
  enabled?: boolean | null;
  /** 固定サイクル数（回数）に限定されたプランを許可します。 */
  fixedCycle?: boolean | null;
  /** 総目標金額に限定されたプランを許可します。 */
  fixedCycleAmount?: boolean | null;
  /** 定期課金プランを使用できる決済手段の種類。 */
  supportedPaymentTypes?: string[] | null;
  minChargeAmount?: MerchantWebhookMoneyAmount | null;
  /** 定期課金プラン精算のために許容される最大支払い遅延期間。 */
  maxPayoutPeriod?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookSubscriptionPlanConfigurationSchema: Schema<MerchantWebhookSubscriptionPlanConfiguration> =
  s.object<MerchantWebhookSubscriptionPlanConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      fixedCycle: s.optionalNullable(s.boolean()),
      fixedCycleAmount: s.optionalNullable(s.boolean()),
      supportedPaymentTypes: s.optionalNullable(s.array(s.string())),
      minChargeAmount: s.optionalNullable(s.lazy(() => merchantWebhookMoneyAmountSchema)),
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
