import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 銀行振込決済の設定。 */
export type MerchantWebhookBankTransferConfiguration = {
  /** 銀行振込決済を有効にします。 */
  enabled?: boolean | null;
  /** 受信した振込入金金額が、課金金額と完全に一致することを要求します。 */
  matchAmount?: boolean | null;
  /** 課金が期限切れになるまでの ISO-8601 期間。 */
  expiration?: string | null;
  /** 追加の仮想銀行口座をプロビジョニングするためのしきい値。 */
  virtualBankAccountsThreshold?: number | null;
  /** 補充バッチあたりに取得される仮想銀行口座の数。 */
  virtualBankAccountsFetchCount?: number | null;
  /** 対象となる課金に適用されるデフォルトの ISO-8601 延長期間。 */
  defaultExtensionPeriod?: string | null;
  /** 課金に対して許容される最大の ISO-8601 延長期間。 */
  maximumExtensionPeriod?: string | null;
  /** 対象となる銀行振込課金を自動的に延長します。 */
  automaticExtensionEnabled?: boolean | null;
  /** 銀行振込課金が作成されたときに通知を送信します。 */
  chargeRequestNotificationEnabled?: boolean | null;
  /** 銀行振込課金がキャンセルされたときに通知を送信します。 */
  chargeRequestCanceledNotificationEnabled?: boolean | null;
  /** 銀行振込課金の有効期限が切れたときに通知を送信します。 */
  chargeExpiredNotificationEnabled?: boolean | null;
  /** 入金が受信されたときに通知を送信します。 */
  depositReceivedNotificationEnabled?: boolean | null;
  /** 入金額が期待される金額を下回っているときに通知を送信します。 */
  depositInsufficientNotificationEnabled?: boolean | null;
  /** 入金額が期待される金額を超えているときに通知を送信します。 */
  depositExceededNotificationEnabled?: boolean | null;
  /** 銀行振込課金が延長されたときに通知を送信します。 */
  extensionNotificationEnabled?: boolean | null;
  /** 支払いリマインダー通知を送信するまでの ISO-8601 リードタイム（予告期間）。 */
  remindNotificationPeriod?: string | null;
  /** 銀行振込の有効期限が切れる前にリマインダー通知を送信します。 */
  remindNotificationEnabled?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookBankTransferConfigurationSchema: Schema<MerchantWebhookBankTransferConfiguration> =
  s.object<MerchantWebhookBankTransferConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      matchAmount: s.optionalNullable(s.boolean()),
      expiration: s.optionalNullable(s.string()),
      virtualBankAccountsThreshold: s.optionalNullable(s.int()),
      virtualBankAccountsFetchCount: s.optionalNullable(s.int()),
      defaultExtensionPeriod: s.optionalNullable(s.string()),
      maximumExtensionPeriod: s.optionalNullable(s.string()),
      automaticExtensionEnabled: s.optionalNullable(s.boolean()),
      chargeRequestNotificationEnabled: s.optionalNullable(s.boolean()),
      chargeRequestCanceledNotificationEnabled: s.optionalNullable(s.boolean()),
      chargeExpiredNotificationEnabled: s.optionalNullable(s.boolean()),
      depositReceivedNotificationEnabled: s.optionalNullable(s.boolean()),
      depositInsufficientNotificationEnabled: s.optionalNullable(s.boolean()),
      depositExceededNotificationEnabled: s.optionalNullable(s.boolean()),
      extensionNotificationEnabled: s.optionalNullable(s.boolean()),
      remindNotificationPeriod: s.optionalNullable(s.string()),
      remindNotificationEnabled: s.optionalNullable(s.boolean()),
      _keysMap: {
        matchAmount: "match_amount",
        virtualBankAccountsThreshold: "virtual_bank_accounts_threshold",
        virtualBankAccountsFetchCount: "virtual_bank_accounts_fetch_count",
        defaultExtensionPeriod: "default_extension_period",
        maximumExtensionPeriod: "maximum_extension_period",
        automaticExtensionEnabled: "automatic_extension_enabled",
        chargeRequestNotificationEnabled: "charge_request_notification_enabled",
        chargeRequestCanceledNotificationEnabled: "charge_request_canceled_notification_enabled",
        chargeExpiredNotificationEnabled: "charge_expired_notification_enabled",
        depositReceivedNotificationEnabled: "deposit_received_notification_enabled",
        depositInsufficientNotificationEnabled: "deposit_insufficient_notification_enabled",
        depositExceededNotificationEnabled: "deposit_exceeded_notification_enabled",
        extensionNotificationEnabled: "extension_notification_enabled",
        remindNotificationPeriod: "remind_notification_period",
        remindNotificationEnabled: "remind_notification_enabled",
      },
    },
    { additionalProperties: s.json() },
  );
