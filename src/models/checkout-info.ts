import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  checkoutBankTransferConfigurationInternalSchema,
  checkoutBankTransferConfigurationSchema,
  type CheckoutBankTransferConfiguration,
} from "./checkout-bank-transfer-configuration.js";
import {
  checkoutCardConfigurationSchema,
  type CheckoutCardConfiguration,
} from "./checkout-card-configuration.js";
import {
  checkoutConvenienceConfigurationSchema,
  type CheckoutConvenienceConfiguration,
} from "./checkout-convenience-configuration.js";
import { checkoutEcConfigurationSchema, type CheckoutEcConfiguration } from "./checkout-ec-configuration.js";
import {
  checkoutInstallmentsConfigurationSchema,
  type CheckoutInstallmentsConfiguration,
} from "./checkout-installments-configuration.js";
import { checkoutModeSchema, type CheckoutMode } from "./checkout-mode.js";
import {
  checkoutOnlineConfigurationSchema,
  type CheckoutOnlineConfiguration,
} from "./checkout-online-configuration.js";
import {
  checkoutPaidyConfigurationSchema,
  type CheckoutPaidyConfiguration,
} from "./checkout-paidy-configuration.js";
import {
  checkoutQrScanConfigurationSchema,
  type CheckoutQrScanConfiguration,
} from "./checkout-qr-scan-configuration.js";
import {
  checkoutRecurringTokenPrivilegeSchema,
  type CheckoutRecurringTokenPrivilege,
} from "./checkout-recurring-token-privilege.js";
import {
  checkoutSubscriptionConfigurationSchema,
  type CheckoutSubscriptionConfiguration,
} from "./checkout-subscription-configuration.js";
import {
  checkoutSubscriptionPlanConfigurationSchema,
  type CheckoutSubscriptionPlanConfiguration,
} from "./checkout-subscription-plan-configuration.js";
import { checkoutSupportedBrandSchema, type CheckoutSupportedBrand } from "./checkout-supported-brand.js";
import { checkoutThemeSchema, type CheckoutTheme } from "./checkout-theme.js";
import {
  recurringCvvConfirmationSchema,
  type RecurringCvvConfirmation,
} from "./recurring-cvv-confirmation.js";

/**
 * 加盟店／店舗のチェックアウト設定：有効な決済手段とその上限、分割払い・定期課金プランの設定、コンビニおよび銀行振込の設定、ウィジェットテーマ、ブランドごとの機能サポート。呼び出しのたびに全体が返され、部分更新や一覧形式のバリエーションはありません。
 */
export type CheckoutInfo = {
  /**
   * チェックアウト設定に反映される、店舗の処理モード。`live` と `test` は認証に使用された資格情報を反映し、`live_test`
   * は本番モードのデータに対してテストを行う特権を持つ呼び出し元向けに予約されています。
   */
  mode?: CheckoutMode;
  /**
   * この店舗で作成されるトランザクション・トークンに付与される、継続課金の権限レベル。`none` は継続利用を許可せず、`bounded`
   * は回数制限付きで継続課金を許可し、`infinite` は無制限の継続課金を許可します。
   */
  recurringTokenPrivilege?: CheckoutRecurringTokenPrivilege;
  /** 店舗の表示名。 */
  name?: string;
  /** チェックアウトに適用されるカード決済の設定。 */
  cardConfiguration?: CheckoutCardConfiguration;
  /** Univapay がホストする定期課金機能の切り替え設定。 */
  subscriptionConfiguration?: CheckoutSubscriptionConfiguration;
  /** 分割払いプランの、チェックアウトに適用される設定。 */
  installmentsConfiguration?: CheckoutInstallmentsConfiguration;
  /** Univapay 側の定期課金プランの、チェックアウトに適用される設定。 */
  subscriptionPlanConfiguration?: CheckoutSubscriptionPlanConfiguration;
  /** EC メール受信および商品明細のホスト機能に関する、チェックアウトの切り替え設定。 */
  checkoutConfiguration?: CheckoutEcConfiguration;
  /** QR スキャン（CPM）決済の、チェックアウトに適用される設定。 */
  qrScanConfiguration?: CheckoutQrScanConfiguration;
  /** コンビニエンスストア決済の、チェックアウトに適用される設定。 */
  convenienceConfiguration?: CheckoutConvenienceConfiguration;
  /** Paidy 決済機能の切り替え設定。 */
  paidyConfiguration?: CheckoutPaidyConfiguration;
  /** Paidy ウィジェットの初期化に使用される公開鍵。この店舗で Paidy が設定されていない場合は `null` になります。 */
  paidyPublicKey?: string | null;
  /**
   * 店舗のチェックアウトロゴ画像の URL。ロゴが設定されていない場合は `null` になります。注意：このレスポンスフィールドは `logo_image`
   * ですが、対応する店舗設定更新側のフィールドは `logo_url` であり、この2つの名前は自動的には往復変換されません。
   */
  logoImage?: string | null;
  /** チェックアウトに適用されるウィジェットテーマ。 */
  theme?: CheckoutTheme;
  /** 継続的なカード課金（定期課金および継続権限を持つトークン）に適用される CVV 再確認ポリシー。 */
  recurringCardChargeCvvConfirmation?: RecurringCvvConfirmation;
  /** オンラインリダイレクト／ウォレット決済機能の切り替え設定。 */
  onlineConfiguration?: CheckoutOnlineConfiguration;
  /** 銀行振込決済の、チェックアウトに適用される設定。 */
  bankTransferConfiguration?: CheckoutBankTransferConfiguration;
  /** 店舗が受け付け可能な、すべての決済手段／ブランドの組み合わせに対する機能サポートおよび対応可否フラグ。 */
  supportedBrands?: CheckoutSupportedBrand[];
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const checkoutInfoProperties: s.Shape<CheckoutInfo> = {
  mode: s.optional(s.lazy(() => checkoutModeSchema)),
  recurringTokenPrivilege: s.optional(s.lazy(() => checkoutRecurringTokenPrivilegeSchema)),
  name: s.optional(s.string()),
  cardConfiguration: s.optional(s.lazy(() => checkoutCardConfigurationSchema)),
  subscriptionConfiguration: s.optional(s.lazy(() => checkoutSubscriptionConfigurationSchema)),
  installmentsConfiguration: s.optional(s.lazy(() => checkoutInstallmentsConfigurationSchema)),
  subscriptionPlanConfiguration: s.optional(s.lazy(() => checkoutSubscriptionPlanConfigurationSchema)),
  checkoutConfiguration: s.optional(s.lazy(() => checkoutEcConfigurationSchema)),
  qrScanConfiguration: s.optional(s.lazy(() => checkoutQrScanConfigurationSchema)),
  convenienceConfiguration: s.optional(s.lazy(() => checkoutConvenienceConfigurationSchema)),
  paidyConfiguration: s.optional(s.lazy(() => checkoutPaidyConfigurationSchema)),
  paidyPublicKey: s.optionalNullable(s.string()),
  logoImage: s.optionalNullable(s.string()),
  theme: s.optional(s.lazy(() => checkoutThemeSchema)),
  recurringCardChargeCvvConfirmation: s.optional(s.lazy(() => recurringCvvConfirmationSchema)),
  onlineConfiguration: s.optional(s.lazy(() => checkoutOnlineConfigurationSchema)),
  bankTransferConfiguration: s.optional(s.lazy(() => checkoutBankTransferConfigurationInternalSchema)),
  supportedBrands: s.optional(s.array(s.lazy(() => checkoutSupportedBrandSchema))),
  _keysMap: {
    recurringTokenPrivilege: "recurring_token_privilege",
    cardConfiguration: "card_configuration",
    subscriptionConfiguration: "subscription_configuration",
    installmentsConfiguration: "installments_configuration",
    subscriptionPlanConfiguration: "subscription_plan_configuration",
    checkoutConfiguration: "checkout_configuration",
    qrScanConfiguration: "qr_scan_configuration",
    convenienceConfiguration: "convenience_configuration",
    paidyConfiguration: "paidy_configuration",
    paidyPublicKey: "paidy_public_key",
    logoImage: "logo_image",
    recurringCardChargeCvvConfirmation: "recurring_card_charge_cvv_confirmation",
    onlineConfiguration: "online_configuration",
    bankTransferConfiguration: "bank_transfer_configuration",
    supportedBrands: "supported_brands",
  },
};

export const checkoutInfoInternalSchema: Schema<CheckoutInfo> = s.object<CheckoutInfo>(
  checkoutInfoProperties,
  { additionalProperties: s.json() },
);

export const checkoutInfoSchema: Schema<CheckoutInfo> = s.lazySchema(() =>
  s.object<CheckoutInfo>(
    {
      ...checkoutInfoProperties,
      logoImage: s.optionalNullable(s.string().check(s.url())),
      bankTransferConfiguration: s.optional(s.lazy(() => checkoutBankTransferConfigurationSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
