import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookBankTransferConfigurationSchema,
  type MerchantWebhookBankTransferConfiguration,
} from "./merchant-webhook-bank-transfer-configuration.js";
import {
  merchantWebhookCardBrandPercentFeesSchema,
  type MerchantWebhookCardBrandPercentFees,
} from "./merchant-webhook-card-brand-percent-fees.js";
import {
  merchantWebhookCardConfigurationSchema,
  type MerchantWebhookCardConfiguration,
} from "./merchant-webhook-card-configuration.js";
import {
  merchantWebhookCheckoutConfigurationSchema,
  type MerchantWebhookCheckoutConfiguration,
} from "./merchant-webhook-checkout-configuration.js";
import {
  merchantWebhookConvenienceConfigurationSchema,
  type MerchantWebhookConvenienceConfiguration,
} from "./merchant-webhook-convenience-configuration.js";
import {
  merchantWebhookCustomerManagementConfigurationSchema,
  type MerchantWebhookCustomerManagementConfiguration,
} from "./merchant-webhook-customer-management-configuration.js";
import {
  merchantWebhookInstallmentPlanConfigurationSchema,
  type MerchantWebhookInstallmentPlanConfiguration,
} from "./merchant-webhook-installment-plan-configuration.js";
import {
  merchantWebhookMoneyAmountSchema,
  type MerchantWebhookMoneyAmount,
} from "./merchant-webhook-money-amount.js";
import {
  merchantWebhookOnlineConfigurationSchema,
  type MerchantWebhookOnlineConfiguration,
} from "./merchant-webhook-online-configuration.js";
import {
  merchantWebhookPaidyConfigurationSchema,
  type MerchantWebhookPaidyConfiguration,
} from "./merchant-webhook-paidy-configuration.js";
import {
  merchantWebhookQrMerchantConfigurationSchema,
  type MerchantWebhookQrMerchantConfiguration,
} from "./merchant-webhook-qr-merchant-configuration.js";
import {
  merchantWebhookQrScanConfigurationSchema,
  type MerchantWebhookQrScanConfiguration,
} from "./merchant-webhook-qr-scan-configuration.js";
import {
  merchantWebhookRecurringTokenConfigurationSchema,
  type MerchantWebhookRecurringTokenConfiguration,
} from "./merchant-webhook-recurring-token-configuration.js";
import {
  merchantWebhookSecurityConfigurationSchema,
  type MerchantWebhookSecurityConfiguration,
} from "./merchant-webhook-security-configuration.js";
import {
  merchantWebhookSubscriptionConfigurationSchema,
  type MerchantWebhookSubscriptionConfiguration,
} from "./merchant-webhook-subscription-configuration.js";
import {
  merchantWebhookSubscriptionPlanConfigurationSchema,
  type MerchantWebhookSubscriptionPlanConfiguration,
} from "./merchant-webhook-subscription-plan-configuration.js";
import {
  merchantWebhookTransferScheduleConfigurationSchema,
  type MerchantWebhookTransferScheduleConfiguration,
} from "./merchant-webhook-transfer-schedule-configuration.js";
import {
  merchantWebhookUserTransactionsConfigurationSchema,
  type MerchantWebhookUserTransactionsConfiguration,
} from "./merchant-webhook-user-transactions-configuration.js";

/** バックエンドによってシリアライズされた加盟店設定オブジェクト。 */
export type MerchantWebhookConfiguration = {
  /** カードブランドごとの上書き設定が存在しない場合に適用されるデフォルトの料率（パーセント手数料）。 */
  percentFee?: number | null;
  /** 通貨ごとの一律手数料（フラットフィ）の上書き設定。 */
  flatFees?: MerchantWebhookMoneyAmount[];
  /** 加盟店のロゴ URL。 */
  logoUrl?: string | null;
  /** 加盟店の国コード。 */
  country?: string | null;
  /** 加盟店のデフォルト言語。 */
  language?: string | null;
  /** 加盟店の表示タイムゾーン。 */
  displayTimeZone?: string | null;
  /** バックエンド設定モデルによってシリアライズされた金額オブジェクト。 */
  minTransferPayout?: MerchantWebhookMoneyAmount;
  /** 通貨ごとの許容最小課金金額。 */
  minimumChargeAmounts?: MerchantWebhookMoneyAmount[];
  /** 通貨ごとの許容最大課金金額。 */
  maximumChargeAmounts?: MerchantWebhookMoneyAmount[];
  /** 加盟店が継承した振込（精算）スケジュール設定。 */
  transferSchedule?: MerchantWebhookTransferScheduleConfiguration;
  /** 加盟店のトランザクション通知設定。 */
  userTransactionsConfiguration?: MerchantWebhookUserTransactionsConfiguration;
  /** 加盟店が継承したリカーリングトークンの設定。 */
  recurringTokenConfiguration?: MerchantWebhookRecurringTokenConfiguration;
  /** 加盟店レベルの不正利用対策および返金安全性に関する設定。 */
  securityConfiguration?: MerchantWebhookSecurityConfiguration;
  /** チェックアウトフィールドの収集設定。 */
  checkoutConfiguration?: MerchantWebhookCheckoutConfiguration;
  /** 分割払いプランの設定。 */
  installmentsConfiguration?: MerchantWebhookInstallmentPlanConfiguration;
  /** 定期課金プランの設定。 */
  subscriptionPlanConfiguration?: MerchantWebhookSubscriptionPlanConfiguration;
  /** カードブランドごとの料率（パーセント手数料）の上書き設定。 */
  cardBrandPercentFees?: MerchantWebhookCardBrandPercentFees;
  /** 定期課金機能の設定。 */
  subscriptionConfiguration?: MerchantWebhookSubscriptionConfiguration;
  /** 消費者管理機能のデフォルト設定。 */
  customerManagementConfiguration?: MerchantWebhookCustomerManagementConfiguration;
  /** 加盟店側から利用明細書表記（ディスクリプタ）を提供できるかどうか。 */
  descriptorProvidedConfiguration?: boolean | null;
  /** カード決済の設定。 */
  cardConfiguration?: MerchantWebhookCardConfiguration;
  /** 店舗スキャン（QR/バーコード読み取り）決済の設定。 */
  qrScanConfiguration?: MerchantWebhookQrScanConfiguration;
  /** コンビニエンスストア決済の設定。 */
  convenienceConfiguration?: MerchantWebhookConvenienceConfiguration;
  /** Paidy 決済の設定。 */
  paidyConfiguration?: MerchantWebhookPaidyConfiguration;
  /** ユーザースキャン（QRコード表示）決済の設定。 */
  qrMerchantConfiguration?: MerchantWebhookQrMerchantConfiguration;
  /** オンライン（各種ウォレット・リダイレクト）決済の設定。 */
  onlineConfiguration?: MerchantWebhookOnlineConfiguration;
  /** 銀行振込決済の設定。 */
  bankTransferConfiguration?: MerchantWebhookBankTransferConfiguration;
  /** プラットフォーム資格情報が有効になっているかどうか。 */
  platformCredentialsEnabled?: boolean | null;
  /** タグ付きプラットフォーム資格情報が有効になっているかどうか。 */
  taggedPlatformCredentialsEnabled?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const merchantWebhookConfigurationProperties: s.Shape<MerchantWebhookConfiguration> = {
  percentFee: s.optionalNullable(s.float64()),
  flatFees: s.optional(s.array(s.lazy(() => merchantWebhookMoneyAmountSchema))),
  logoUrl: s.optionalNullable(s.string()),
  country: s.optionalNullable(s.string()),
  language: s.optionalNullable(s.string()),
  displayTimeZone: s.optionalNullable(s.string()),
  minTransferPayout: s.optional(s.lazy(() => merchantWebhookMoneyAmountSchema)),
  minimumChargeAmounts: s.optional(s.array(s.lazy(() => merchantWebhookMoneyAmountSchema))),
  maximumChargeAmounts: s.optional(s.array(s.lazy(() => merchantWebhookMoneyAmountSchema))),
  transferSchedule: s.optional(s.lazy(() => merchantWebhookTransferScheduleConfigurationSchema)),
  userTransactionsConfiguration: s.optional(s.lazy(() => merchantWebhookUserTransactionsConfigurationSchema)),
  recurringTokenConfiguration: s.optional(s.lazy(() => merchantWebhookRecurringTokenConfigurationSchema)),
  securityConfiguration: s.optional(s.lazy(() => merchantWebhookSecurityConfigurationSchema)),
  checkoutConfiguration: s.optional(s.lazy(() => merchantWebhookCheckoutConfigurationSchema)),
  installmentsConfiguration: s.optional(s.lazy(() => merchantWebhookInstallmentPlanConfigurationSchema)),
  subscriptionPlanConfiguration: s.optional(s.lazy(() => merchantWebhookSubscriptionPlanConfigurationSchema)),
  cardBrandPercentFees: s.optional(s.lazy(() => merchantWebhookCardBrandPercentFeesSchema)),
  subscriptionConfiguration: s.optional(s.lazy(() => merchantWebhookSubscriptionConfigurationSchema)),
  customerManagementConfiguration: s.optional(
    s.lazy(() => merchantWebhookCustomerManagementConfigurationSchema),
  ),
  descriptorProvidedConfiguration: s.optionalNullable(s.boolean()),
  cardConfiguration: s.optional(s.lazy(() => merchantWebhookCardConfigurationSchema)),
  qrScanConfiguration: s.optional(s.lazy(() => merchantWebhookQrScanConfigurationSchema)),
  convenienceConfiguration: s.optional(s.lazy(() => merchantWebhookConvenienceConfigurationSchema)),
  paidyConfiguration: s.optional(s.lazy(() => merchantWebhookPaidyConfigurationSchema)),
  qrMerchantConfiguration: s.optional(s.lazy(() => merchantWebhookQrMerchantConfigurationSchema)),
  onlineConfiguration: s.optional(s.lazy(() => merchantWebhookOnlineConfigurationSchema)),
  bankTransferConfiguration: s.optional(s.lazy(() => merchantWebhookBankTransferConfigurationSchema)),
  platformCredentialsEnabled: s.optionalNullable(s.boolean()),
  taggedPlatformCredentialsEnabled: s.optionalNullable(s.boolean()),
  _keysMap: {
    percentFee: "percent_fee",
    flatFees: "flat_fees",
    logoUrl: "logo_url",
    displayTimeZone: "display_time_zone",
    minTransferPayout: "min_transfer_payout",
    minimumChargeAmounts: "minimum_charge_amounts",
    maximumChargeAmounts: "maximum_charge_amounts",
    transferSchedule: "transfer_schedule",
    userTransactionsConfiguration: "user_transactions_configuration",
    recurringTokenConfiguration: "recurring_token_configuration",
    securityConfiguration: "security_configuration",
    checkoutConfiguration: "checkout_configuration",
    installmentsConfiguration: "installments_configuration",
    subscriptionPlanConfiguration: "subscription_plan_configuration",
    cardBrandPercentFees: "card_brand_percent_fees",
    subscriptionConfiguration: "subscription_configuration",
    customerManagementConfiguration: "customer_management_configuration",
    descriptorProvidedConfiguration: "descriptor_provided_configuration",
    cardConfiguration: "card_configuration",
    qrScanConfiguration: "qr_scan_configuration",
    convenienceConfiguration: "convenience_configuration",
    paidyConfiguration: "paidy_configuration",
    qrMerchantConfiguration: "qr_merchant_configuration",
    onlineConfiguration: "online_configuration",
    bankTransferConfiguration: "bank_transfer_configuration",
    platformCredentialsEnabled: "platform_credentials_enabled",
    taggedPlatformCredentialsEnabled: "tagged_platform_credentials_enabled",
  },
};

export const merchantWebhookConfigurationInternalSchema: Schema<MerchantWebhookConfiguration> =
  s.object<MerchantWebhookConfiguration>(merchantWebhookConfigurationProperties, {
    additionalProperties: s.json(),
  });

export const merchantWebhookConfigurationSchema: Schema<MerchantWebhookConfiguration> = s.lazySchema(() =>
  s.object<MerchantWebhookConfiguration>(
    {
      ...merchantWebhookConfigurationProperties,
      logoUrl: s.optionalNullable(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
