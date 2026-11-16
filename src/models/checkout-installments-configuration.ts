import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  checkoutInstallmentCardProcessorSchema,
  type CheckoutInstallmentCardProcessor,
} from "./checkout-installment-card-processor.js";
import { checkoutMoneyAmountSchema, type CheckoutMoneyAmount } from "./checkout-money-amount.js";
import { checkoutPaymentTypeSchema, type CheckoutPaymentType } from "./checkout-payment-type.js";

/** 分割払いプランの、チェックアウトに適用される設定。 */
export type CheckoutInstallmentsConfiguration = {
  /** 分割払いプランが有効かどうか。 */
  enabled?: boolean;
  /** 分割払い決済で利用可能なカードプロセッサの機能。 */
  cardProcessor?: CheckoutInstallmentCardProcessor;
  /** 分割払いプランを使用できる決済手段の種類。 */
  supportedPaymentTypes?: CheckoutPaymentType[];
  /** 分割払いプランの対象となる最低課金額。制限がない場合は `null` になります。 */
  minChargeAmount?: CheckoutMoneyAmount | null;
  /** 分割払い精算のために許容される最大支払い遅延期間を表す ISO-8601 期間。制限がない場合は `null` になります。 */
  maxPayoutPeriod?: string | null;
  /** 分割払いの利用をプロセッサ対応フローのみに制限するかどうか。後方互換性のため常に `true` です。 */
  onlyWithProcessor?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutInstallmentsConfigurationSchema: Schema<CheckoutInstallmentsConfiguration> =
  s.object<CheckoutInstallmentsConfiguration>(
    {
      enabled: s.optional(s.boolean()),
      cardProcessor: s.optional(s.lazy(() => checkoutInstallmentCardProcessorSchema)),
      supportedPaymentTypes: s.optional(s.array(s.lazy(() => checkoutPaymentTypeSchema))),
      minChargeAmount: s.optionalNullable(s.lazy(() => checkoutMoneyAmountSchema)),
      maxPayoutPeriod: s.optionalNullable(s.string()),
      onlyWithProcessor: s.optional(s.boolean()),
      _keysMap: {
        cardProcessor: "card_processor",
        supportedPaymentTypes: "supported_payment_types",
        minChargeAmount: "min_charge_amount",
        maxPayoutPeriod: "max_payout_period",
        onlyWithProcessor: "only_with_processor",
      },
    },
    { additionalProperties: s.json() },
  );
