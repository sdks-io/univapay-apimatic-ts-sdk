import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  checkoutBankTransferMatchAmountSchema,
  type CheckoutBankTransferMatchAmount,
} from "./checkout-bank-transfer-match-amount.js";
import { expirationTimeShiftSchema, type ExpirationTimeShift } from "./expiration-time-shift.js";

/** 銀行振込決済の、チェックアウトに適用される設定。 */
export type CheckoutBankTransferConfiguration = {
  /** 銀行振込決済が有効かどうか。 */
  enabled?: boolean;
  /** 銀行振込決済に適用される入金額の照合ポリシー。 */
  matchAmount?: CheckoutBankTransferMatchAmount;
  /** 銀行振込課金が期限切れになるまでの ISO-8601 期間。 */
  expiration?: string;
  /** コンビニ決済および銀行振込設定で共有される、有効期限の算出に適用される時刻オーバーライド。 */
  expirationTimeShift?: ExpirationTimeShift;
  /** 追加の仮想銀行口座をプロビジョニングするためのしきい値となる、未使用の仮想銀行口座数。 */
  virtualBankAccountsThreshold?: number;
  /** 補充バッチあたりに取得される仮想銀行口座の数。 */
  virtualBankAccountsFetchCount?: number;
  /** 支払い期限がデフォルトで延長される ISO-8601 期間。 */
  defaultExtensionPeriod?: string;
  /** 許容される最大延長期間を表す ISO-8601 期間。 */
  maximumExtensionPeriod?: string;
  /** 支払い期限が自動的に延長されるかどうか。 */
  automaticExtensionEnabled?: boolean;
  /** 銀行振込課金が作成されたときに通知を送信するかどうか。 */
  chargeRequestNotificationEnabled?: boolean;
  /** 作成済みの銀行振込課金がキャンセルされたときに通知を送信するかどうか。 */
  chargeRequestCanceledNotificationEnabled?: boolean;
  /** 銀行振込課金の有効期限が切れたときに通知を送信するかどうか。 */
  chargeExpiredNotificationEnabled?: boolean;
  /** 入金が受信されたときに通知を送信するかどうか。 */
  depositReceivedNotificationEnabled?: boolean;
  /** 入金額が不足しているときに通知を送信するかどうか。 */
  depositInsufficientNotificationEnabled?: boolean;
  /** 入金額が想定金額を超えているときに通知を送信するかどうか。 */
  depositExceededNotificationEnabled?: boolean;
  /** 支払い期限が延長されたときに通知を送信するかどうか。 */
  extensionNotificationEnabled?: boolean;
  /** リマインダー通知を送信するまでの、有効期限からの ISO-8601 リードタイム（予告期間）。 */
  remindNotificationPeriod?: string;
  /** 支払い期限が切れる前にリマインダー通知を送信するかどうか。 */
  remindNotificationEnabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const checkoutBankTransferConfigurationProperties: s.Shape<CheckoutBankTransferConfiguration> = {
  enabled: s.optional(s.boolean()),
  matchAmount: s.optional(s.lazy(() => checkoutBankTransferMatchAmountSchema)),
  expiration: s.optional(s.string()),
  expirationTimeShift: s.optional(s.lazy(() => expirationTimeShiftSchema)),
  virtualBankAccountsThreshold: s.optional(s.int()),
  virtualBankAccountsFetchCount: s.optional(s.int()),
  defaultExtensionPeriod: s.optional(s.string()),
  maximumExtensionPeriod: s.optional(s.string()),
  automaticExtensionEnabled: s.optional(s.boolean()),
  chargeRequestNotificationEnabled: s.optional(s.boolean()),
  chargeRequestCanceledNotificationEnabled: s.optional(s.boolean()),
  chargeExpiredNotificationEnabled: s.optional(s.boolean()),
  depositReceivedNotificationEnabled: s.optional(s.boolean()),
  depositInsufficientNotificationEnabled: s.optional(s.boolean()),
  depositExceededNotificationEnabled: s.optional(s.boolean()),
  extensionNotificationEnabled: s.optional(s.boolean()),
  remindNotificationPeriod: s.optional(s.string()),
  remindNotificationEnabled: s.optional(s.boolean()),
  _keysMap: {
    matchAmount: "match_amount",
    expirationTimeShift: "expiration_time_shift",
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
};

export const checkoutBankTransferConfigurationInternalSchema: Schema<CheckoutBankTransferConfiguration> =
  s.object<CheckoutBankTransferConfiguration>(checkoutBankTransferConfigurationProperties, {
    additionalProperties: s.json(),
  });

export const checkoutBankTransferConfigurationSchema: Schema<CheckoutBankTransferConfiguration> =
  s.lazySchema(() =>
    s.object<CheckoutBankTransferConfiguration>(
      {
        ...checkoutBankTransferConfigurationProperties,
        virtualBankAccountsThreshold: s.optional(s.int().check(s.gte(0))),
        virtualBankAccountsFetchCount: s.optional(s.int().check(s.gte(1))),
      },
      { additionalProperties: s.json() },
    ),
  );
