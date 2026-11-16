import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  cardProcessorInstallmentConfigSchema,
  type CardProcessorInstallmentConfig,
} from "./card-processor-installment-config.js";
import {
  merchantWebhookMoneyAmountSchema,
  type MerchantWebhookMoneyAmount,
} from "./merchant-webhook-money-amount.js";

/** 分割払いプランの設定。 */
export type MerchantWebhookInstallmentPlanConfiguration = {
  /** 対象となる決済に対して分割払いプラン機能を有効にします。 */
  enabled?: boolean | null;
  /** 分割払い決済で利用可能なカードプロセッサの機能。 */
  cardProcessor?: CardProcessorInstallmentConfig;
  /** 分割払いプランを使用できる決済手段の種類。 */
  supportedPaymentTypes?: string[] | null;
  /** バックエンド設定モデルによってシリアライズされた金額オブジェクト。 */
  minChargeAmount?: MerchantWebhookMoneyAmount;
  /** 分割払い精算のために許容される最大支払い遅延期間。 */
  maxPayoutPeriod?: string | null;
  /** 分割払いの利用をプロセッサ対応フローのみに制限します。 */
  onlyWithProcessor?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookInstallmentPlanConfigurationSchema: Schema<MerchantWebhookInstallmentPlanConfiguration> =
  s.object<MerchantWebhookInstallmentPlanConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      cardProcessor: s.optional(s.lazy(() => cardProcessorInstallmentConfigSchema)),
      supportedPaymentTypes: s.optionalNullable(s.array(s.string())),
      minChargeAmount: s.optional(s.lazy(() => merchantWebhookMoneyAmountSchema)),
      maxPayoutPeriod: s.optionalNullable(s.string()),
      onlyWithProcessor: s.optionalNullable(s.boolean()),
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
