import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** ウェブフック通知をトリガーするイベントタイプ。 */
export const WebhookTrigger = {
  TokenCreated: "token_created",
  TokenUpdated: "token_updated",
  TokenThreeDsUpdated: "token_three_d_s_updated",
  TokenCvvAuthUpdated: "token_cvv_auth_updated",
  TokenCvvAuthCheckUpdated: "token_cvv_auth_check_updated",
  TokenReplaced: "token_replaced",
  ChargeUpdated: "charge_updated",
  ChargeFinished: "charge_finished",
  RefundFinished: "refund_finished",
  CancelFinished: "cancel_finished",
  CustomsDeclarationFinished: "customs_declaration_finished",
  RecurringTokenDeleted: "recurring_token_deleted",
  BankTransferStatusUpdated: "bank_transfer_status_updated",
  SubscriptionCreated: "subscription_created",
  SubscriptionPayment: "subscription_payment",
  SubscriptionCompleted: "subscription_completed",
  SubscriptionFailure: "subscription_failure",
  SubscriptionCanceled: "subscription_canceled",
  SubscriptionSuspended: "subscription_suspended",
} as const;
export type WebhookTrigger = (typeof WebhookTrigger)[keyof typeof WebhookTrigger] | (string & {});

export const webhookTriggerSchema: EnumSchema<WebhookTrigger> = s.enumOf<WebhookTrigger>(WebhookTrigger);
