import * as s from "../core/validation/index.js";
import { readWebhookBody } from "../core/webhooks/webhook-event-parser.js";
import type { WebhookRequest } from "../core/webhooks/webhook-request.js";
import { resolveWebhookType } from "../core/webhooks/webhook-type-source.js";
import {
  bankTransferStatusWebhookCallbackSchema,
  type BankTransferStatusWebhookCallback,
} from "../models/bank-transfer-status-webhook-callback.js";
import {
  cancelWebhookCallbackSchema,
  type CancelWebhookCallback,
} from "../models/cancel-webhook-callback.js";
import { chargeWebhookEventInternalSchema, type ChargeWebhookEvent } from "../models/charge-webhook-event.js";
import {
  customsDeclarationWebhookCallbackSchema,
  type CustomsDeclarationWebhookCallback,
} from "../models/customs-declaration-webhook-callback.js";
import {
  refundWebhookCallbackSchema,
  type RefundWebhookCallback,
} from "../models/refund-webhook-callback.js";
import {
  subscriptionWebhookEventInternalSchema,
  type SubscriptionWebhookEvent,
} from "../models/subscription-webhook-event.js";
import { tokenWebhookEventInternalSchema, type TokenWebhookEvent } from "../models/token-webhook-event.js";

type UnivapayPublicApiEventPayload =
  | ChargeWebhookEvent
  | TokenWebhookEvent
  | RefundWebhookCallback
  | CancelWebhookCallback
  | SubscriptionWebhookEvent
  | BankTransferStatusWebhookCallback
  | CustomsDeclarationWebhookCallback
  | Record<string, unknown>;

const univapayPublicApiEventPayloadSchema = s.bestFit<UnivapayPublicApiEventPayload>([
  chargeWebhookEventInternalSchema,
  tokenWebhookEventInternalSchema,
  refundWebhookCallbackSchema,
  cancelWebhookCallbackSchema,
  subscriptionWebhookEventInternalSchema,
  bankTransferStatusWebhookCallbackSchema,
  customsDeclarationWebhookCallbackSchema,
]);

export class UnivapayPublicApiWebhookEvent<
  out T extends string = string,
  out P extends UnivapayPublicApiEventPayload = UnivapayPublicApiEventPayload,
> {
  readonly type: T;
  readonly payload: P;

  constructor(type: T, payload: P) {
    this.type = type;
    this.payload = payload;
  }

  /**
   * 課金が新しいステータスに遷移したとき（例：`pending` → `awaiting`）にトリガーされます。`data` フィールドには、イベント発生時点の完全な Charge
   * オブジェクトが含まれます。
   */
  isChargeUpdated(): this is UnivapayPublicApiWebhookEvent<"charge_updated", ChargeWebhookEvent> {
    return this.type === "charge_updated" && chargeWebhookEventInternalSchema.matches(this.payload);
  }

  /**
   * 課金が最終状態（`successful`、`failed`、`error`）に達したときにトリガーされます。`data` フィールドには、完全な Charge オブジェクトが含まれます。
   */
  isChargeFinished(): this is UnivapayPublicApiWebhookEvent<"charge_finished", ChargeWebhookEvent> {
    return this.type === "charge_finished" && chargeWebhookEventInternalSchema.matches(this.payload);
  }

  /** 新しいトランザクション・トークンが作成されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。 */
  isTokenCreated(): this is UnivapayPublicApiWebhookEvent<"tokenCreated", TokenWebhookEvent> {
    return this.type === "tokenCreated" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /**
   * トランザクション・トークンが更新されたとき（例：メタデータの変更など）にトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。
   */
  isTokenUpdated(): this is UnivapayPublicApiWebhookEvent<"tokenUpdated", TokenWebhookEvent> {
    return this.type === "tokenUpdated" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /** トークンに関連付けられた3Dセキュアデータが更新されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。 */
  isTokenThreeDsUpdated(): this is UnivapayPublicApiWebhookEvent<"tokenThreeDsUpdated", TokenWebhookEvent> {
    return this.type === "tokenThreeDsUpdated" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /** トークンの CVV 認証結果が更新されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。 */
  isTokenCvvAuthUpdated(): this is UnivapayPublicApiWebhookEvent<"tokenCvvAuthUpdated", TokenWebhookEvent> {
    return this.type === "tokenCvvAuthUpdated" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /** トークンの CVV 認証チェックステータスが変更されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。 */
  isTokenCvvAuthCheckUpdated(): this is UnivapayPublicApiWebhookEvent<
    "tokenCvvAuthCheckUpdated",
    TokenWebhookEvent
  > {
    return this.type === "tokenCvvAuthCheckUpdated" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /**
   * トランザクション・トークンが新しいトークンに置き換えられたとき（例：カード情報更新後など）にトリガーされます。`data` フィールドには、置き換え後の新しい
   * TransactionToken オブジェクトが含まれます。
   */
  isTokenReplaced(): this is UnivapayPublicApiWebhookEvent<"tokenReplaced", TokenWebhookEvent> {
    return this.type === "tokenReplaced" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /** 継続用のトランザクション・トークンが削除されたときにトリガーされます。`data` フィールドには、削除された TransactionToken オブジェクトが含まれます。 */
  isRecurringTokenDeleted(): this is UnivapayPublicApiWebhookEvent<
    "recurringTokenDeleted",
    TokenWebhookEvent
  > {
    return this.type === "recurringTokenDeleted" && tokenWebhookEventInternalSchema.matches(this.payload);
  }

  /**
   * 返金が最終状態（`successful`、`failed`、`error`）に達したときにトリガーされます。`data` フィールドには、完全な Refund オブジェクトが含まれます。
   */
  isRefundFinished(): this is UnivapayPublicApiWebhookEvent<"refundFinished", RefundWebhookCallback> {
    return this.type === "refundFinished" && refundWebhookCallbackSchema.matches(this.payload);
  }

  /**
   * キャンセルリクエストが最終状態（`successful`、`failed`、`error`）に達したときにトリガーされます。`data` フィールドには、完全な Cancel
   * オブジェクトが含まれます。
   */
  isCancelFinished(): this is UnivapayPublicApiWebhookEvent<"cancelFinished", CancelWebhookCallback> {
    return this.type === "cancelFinished" && cancelWebhookCallbackSchema.matches(this.payload);
  }

  /** 新しい定期課金が作成され、その最初の支払いが開始されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。 */
  isSubscriptionCreated(): this is UnivapayPublicApiWebhookEvent<
    "subscriptionCreated",
    SubscriptionWebhookEvent
  > {
    return (
      this.type === "subscriptionCreated" && subscriptionWebhookEventInternalSchema.matches(this.payload)
    );
  }

  /** スケジュールされた定期課金支払いが正常に処理されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。 */
  isSubscriptionPayment(): this is UnivapayPublicApiWebhookEvent<
    "subscriptionPayment",
    SubscriptionWebhookEvent
  > {
    return (
      this.type === "subscriptionPayment" && subscriptionWebhookEventInternalSchema.matches(this.payload)
    );
  }

  /** 定期課金の、スケジュールされていたすべての支払いが完了したときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。 */
  isSubscriptionCompleted(): this is UnivapayPublicApiWebhookEvent<
    "subscriptionCompleted",
    SubscriptionWebhookEvent
  > {
    return (
      this.type === "subscriptionCompleted" && subscriptionWebhookEventInternalSchema.matches(this.payload)
    );
  }

  /** スケジュールされていた定期課金支払いが失敗したときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。 */
  isSubscriptionFailure(): this is UnivapayPublicApiWebhookEvent<
    "subscriptionFailure",
    SubscriptionWebhookEvent
  > {
    return (
      this.type === "subscriptionFailure" && subscriptionWebhookEventInternalSchema.matches(this.payload)
    );
  }

  /** すべての支払いが完了する前に、定期課金が解約されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。 */
  isSubscriptionCanceled(): this is UnivapayPublicApiWebhookEvent<
    "subscriptionCanceled",
    SubscriptionWebhookEvent
  > {
    return (
      this.type === "subscriptionCanceled" && subscriptionWebhookEventInternalSchema.matches(this.payload)
    );
  }

  /** 定期課金が一時停止（ポーズ）されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。 */
  isSubscriptionSuspended(): this is UnivapayPublicApiWebhookEvent<
    "subscriptionSuspended",
    SubscriptionWebhookEvent
  > {
    return (
      this.type === "subscriptionSuspended" && subscriptionWebhookEventInternalSchema.matches(this.payload)
    );
  }

  /**
   * 銀行振込課金の決済ステータスが変更されたとき（例：入金が受信され、期待される金額と一致したときなど）にトリガーされます。`data`
   * フィールドには、拡張レコード、入金金額、および元となった課金/トークンのメタデータを含む `BankTransferStatusData` オブジェクトが含まれます。
   */
  isBankTransferStatusUpdated(): this is UnivapayPublicApiWebhookEvent<
    "bankTransferStatusUpdated",
    BankTransferStatusWebhookCallback
  > {
    return (
      this.type === "bankTransferStatusUpdated" &&
      bankTransferStatusWebhookCallbackSchema.matches(this.payload)
    );
  }

  /**
   * 課金に関連付けられた税関申告が最終状態に達したときにトリガーされます。`data` フィールドには、バックエンドフォーマッタによって返される CustomsDeclaration
   * リソースが含まれます。
   */
  isCustomsDeclarationFinished(): this is UnivapayPublicApiWebhookEvent<
    "customsDeclarationFinished",
    CustomsDeclarationWebhookCallback
  > {
    return (
      this.type === "customsDeclarationFinished" &&
      customsDeclarationWebhookCallbackSchema.matches(this.payload)
    );
  }
}

/**
 * 課金ライフサイクルイベント。
 */
export function parseUnivapayPublicApiWebhookEvent(request: WebhookRequest): UnivapayPublicApiWebhookEvent {
  const body = readWebhookBody(request);
  return new UnivapayPublicApiWebhookEvent(
    resolveWebhookType({ kind: "body", field: "event" }, body, request),
    univapayPublicApiEventPayloadSchema.decode(body),
  );
}
