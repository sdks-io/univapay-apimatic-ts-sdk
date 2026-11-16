import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 加盟店のトランザクション通知設定。 */
export type MerchantWebhookUserTransactionsConfiguration = {
  /** 加盟店宛てのトランザクション通知を有効にします。 */
  enabled?: boolean | null;
  /** 消費者にトランザクション通知を送信します。 */
  notifyCustomer?: boolean | null;
  /** テストモードのエントリに対して通知を送信します。 */
  notifyOnTest?: boolean | null;
  /** リカーリングトークンが作成されたときに通知を送信します。 */
  notifyOnRecurringTokenCreation?: boolean | null;
  /** リカーリングトークンの CVV 確認に失敗したときに通知を送信します。 */
  notifyOnRecurringTokenCvvFailed?: boolean | null;
  /** ウェブフックの配信失敗が繰り返された後に通知を送信します。 */
  notifyOnWebhookFailure?: boolean | null;
  /** ウェブフックの配信が無効化されたときに通知を送信します。 */
  notifyOnWebhookDisabled?: boolean | null;
  /** 失敗したトランザクションについて加盟店への通知を送信します。 */
  notifyUserOnFailedTransactions?: boolean | null;
  /** 失敗したトランザクションについて消費者への通知を送信します。 */
  notifyCustomerOnFailedTransactions?: boolean | null;
  /** コンビニ決済の支払い案内を含む通知を加盟店へ送信します。 */
  notifyUserOnConvenienceInstructions?: boolean | null;
  /** 定期課金のライフサイクルイベントに関する通知を送信します。 */
  notifyOnSubscriptions?: boolean | null;
  /** オーソリ（保留）のみの課金に対して通知を送信します。 */
  notifyOnAuthorizations?: boolean | null;
  /** CVV 認証イベントに関する通知を送信します。 */
  notifyOnCvvAuthorizations?: boolean | null;
  /** 課金がキャンセルされたときに通知を送信します。 */
  notifyOnCancels?: boolean | null;
  /** サポートされている通知に消費者用のセルフサービスリンクを含めます。 */
  customerReferLinkEnabled?: boolean | null;
  /** コンビニ決済の有効期限が切れたときに通知を送信します。 */
  notifyOnConvenienceExpiry?: boolean | null;
  /** 3Dセキュアを介してリカーリングトークンが作成されたときに通知を送信します。 */
  notifyOnRecurringTokenCreationWithThreeDs?: boolean | null;
  /** チャージバックイベントに関する通知を送信します。 */
  notifyOnChargebacks?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookUserTransactionsConfigurationSchema: Schema<MerchantWebhookUserTransactionsConfiguration> =
  s.object<MerchantWebhookUserTransactionsConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      notifyCustomer: s.optionalNullable(s.boolean()),
      notifyOnTest: s.optionalNullable(s.boolean()),
      notifyOnRecurringTokenCreation: s.optionalNullable(s.boolean()),
      notifyOnRecurringTokenCvvFailed: s.optionalNullable(s.boolean()),
      notifyOnWebhookFailure: s.optionalNullable(s.boolean()),
      notifyOnWebhookDisabled: s.optionalNullable(s.boolean()),
      notifyUserOnFailedTransactions: s.optionalNullable(s.boolean()),
      notifyCustomerOnFailedTransactions: s.optionalNullable(s.boolean()),
      notifyUserOnConvenienceInstructions: s.optionalNullable(s.boolean()),
      notifyOnSubscriptions: s.optionalNullable(s.boolean()),
      notifyOnAuthorizations: s.optionalNullable(s.boolean()),
      notifyOnCvvAuthorizations: s.optionalNullable(s.boolean()),
      notifyOnCancels: s.optionalNullable(s.boolean()),
      customerReferLinkEnabled: s.optionalNullable(s.boolean()),
      notifyOnConvenienceExpiry: s.optionalNullable(s.boolean()),
      notifyOnRecurringTokenCreationWithThreeDs: s.optionalNullable(s.boolean()),
      notifyOnChargebacks: s.optionalNullable(s.boolean()),
      _keysMap: {
        notifyCustomer: "notify_customer",
        notifyOnTest: "notify_on_test",
        notifyOnRecurringTokenCreation: "notify_on_recurring_token_creation",
        notifyOnRecurringTokenCvvFailed: "notify_on_recurring_token_cvv_failed",
        notifyOnWebhookFailure: "notify_on_webhook_failure",
        notifyOnWebhookDisabled: "notify_on_webhook_disabled",
        notifyUserOnFailedTransactions: "notify_user_on_failed_transactions",
        notifyCustomerOnFailedTransactions: "notify_customer_on_failed_transactions",
        notifyUserOnConvenienceInstructions: "notify_user_on_convenience_instructions",
        notifyOnSubscriptions: "notify_on_subscriptions",
        notifyOnAuthorizations: "notify_on_authorizations",
        notifyOnCvvAuthorizations: "notify_on_cvv_authorizations",
        notifyOnCancels: "notify_on_cancels",
        customerReferLinkEnabled: "customer_refer_link_enabled",
        notifyOnConvenienceExpiry: "notify_on_convenience_expiry",
        notifyOnRecurringTokenCreationWithThreeDs: "notify_on_recurring_token_creation_with_three_ds",
        notifyOnChargebacks: "notify_on_chargebacks",
      },
    },
    { additionalProperties: s.json() },
  );
