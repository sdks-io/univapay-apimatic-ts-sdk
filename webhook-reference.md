# Webhooks

> Source: [parseUnivapayPublicApiWebhookEvent](src/webhooks/univapay-public-api-webhook-event.ts)

課金ライフサイクルイベント。

## Discriminator

The event type is read from the <code>event</code> property of the request body.

| Discriminator value | Event |
| --- | --- |
| <code>charge_updated</code> | ChargeUpdated_POST |
| <code>charge_finished</code> | ChargeFinished_POST |
| <code>tokenCreated</code> | TokenCreated_POST |
| <code>tokenUpdated</code> | TokenUpdated_POST |
| <code>tokenThreeDsUpdated</code> | TokenThreeDsUpdated_POST |
| <code>tokenCvvAuthUpdated</code> | TokenCvvAuthUpdated_POST |
| <code>tokenCvvAuthCheckUpdated</code> | TokenCvvAuthCheckUpdated_POST |
| <code>tokenReplaced</code> | TokenReplaced_POST |
| <code>recurringTokenDeleted</code> | RecurringTokenDeleted_POST |
| <code>refundFinished</code> | 返金処理完了 |
| <code>cancelFinished</code> | キャンセル処理完了 |
| <code>subscriptionCreated</code> | SubscriptionCreated_POST |
| <code>subscriptionPayment</code> | SubscriptionPayment_POST |
| <code>subscriptionCompleted</code> | SubscriptionCompleted_POST |
| <code>subscriptionFailure</code> | SubscriptionFailure_POST |
| <code>subscriptionCanceled</code> | SubscriptionCanceled_POST |
| <code>subscriptionSuspended</code> | SubscriptionSuspended_POST |
| <code>bankTransferStatusUpdated</code> | 銀行振込ステータス更新 |
| <code>customsDeclarationFinished</code> | 税関申告処理完了 |

## Usage

```ts
const webhookRequest = await WebhookRequest.fromRequest(request);

const event = parseUnivapayPublicApiWebhookEvent(webhookRequest);

if (event.isChargeUpdated()) {
  // TODO: Handle 'event.payload' of type ChargeWebhookEvent
} else if (event.isChargeFinished()) {
  // TODO: Handle 'event.payload' of type ChargeWebhookEvent
} else if (event.isTokenCreated()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isTokenUpdated()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isTokenThreeDsUpdated()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isTokenCvvAuthUpdated()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isTokenCvvAuthCheckUpdated()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isTokenReplaced()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isRecurringTokenDeleted()) {
  // TODO: Handle 'event.payload' of type TokenWebhookEvent
} else if (event.isRefundFinished()) {
  // TODO: Handle 'event.payload' of type RefundWebhookCallback
} else if (event.isCancelFinished()) {
  // TODO: Handle 'event.payload' of type CancelWebhookCallback
} else if (event.isSubscriptionCreated()) {
  // TODO: Handle 'event.payload' of type SubscriptionWebhookEvent
} else if (event.isSubscriptionPayment()) {
  // TODO: Handle 'event.payload' of type SubscriptionWebhookEvent
} else if (event.isSubscriptionCompleted()) {
  // TODO: Handle 'event.payload' of type SubscriptionWebhookEvent
} else if (event.isSubscriptionFailure()) {
  // TODO: Handle 'event.payload' of type SubscriptionWebhookEvent
} else if (event.isSubscriptionCanceled()) {
  // TODO: Handle 'event.payload' of type SubscriptionWebhookEvent
} else if (event.isSubscriptionSuspended()) {
  // TODO: Handle 'event.payload' of type SubscriptionWebhookEvent
} else if (event.isBankTransferStatusUpdated()) {
  // TODO: Handle 'event.payload' of type BankTransferStatusWebhookCallback
} else if (event.isCustomsDeclarationFinished()) {
  // TODO: Handle 'event.payload' of type CustomsDeclarationWebhookCallback
} else {
  // TODO: Handle 'event' of type UnivapayPublicApiWebhookEvent, whose type and payload together match no listed event
}
```

<details>
<summary>ChargeUpdated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

課金が新しいステータスに遷移したとき（例：`pending` → `awaiting`）にトリガーされます。`data` フィールドには、イベント発生時点の完全な Charge オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[ChargeWebhookEvent](src/models/charge-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>ChargeFinished_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

課金が最終状態（`successful`、`failed`、`error`）に達したときにトリガーされます。`data` フィールドには、完全な Charge オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[ChargeWebhookEvent](src/models/charge-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>TokenCreated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

新しいトランザクション・トークンが作成されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>TokenUpdated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

トランザクション・トークンが更新されたとき（例：メタデータの変更など）にトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>TokenThreeDsUpdated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

トークンに関連付けられた3Dセキュアデータが更新されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>TokenCvvAuthUpdated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

トークンの CVV 認証結果が更新されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>TokenCvvAuthCheckUpdated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

トークンの CVV 認証チェックステータスが変更されたときにトリガーされます。`data` フィールドには、完全な TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>TokenReplaced_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

トランザクション・トークンが新しいトークンに置き換えられたとき（例：カード情報更新後など）にトリガーされます。`data` フィールドには、置き換え後の新しい TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>RecurringTokenDeleted_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

継続用のトランザクション・トークンが削除されたときにトリガーされます。`data` フィールドには、削除された TransactionToken オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[TokenWebhookEvent](src/models/token-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>返金処理完了</summary>

<dl>
<dd>

### Description

<dl>
<dd>

返金が最終状態（`successful`、`failed`、`error`）に達したときにトリガーされます。`data` フィールドには、完全な Refund オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[RefundWebhookCallback](src/models/refund-webhook-callback.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>キャンセル処理完了</summary>

<dl>
<dd>

### Description

<dl>
<dd>

キャンセルリクエストが最終状態（`successful`、`failed`、`error`）に達したときにトリガーされます。`data` フィールドには、完全な Cancel オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[CancelWebhookCallback](src/models/cancel-webhook-callback.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>SubscriptionCreated_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

新しい定期課金が作成され、その最初の支払いが開始されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[SubscriptionWebhookEvent](src/models/subscription-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>SubscriptionPayment_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

スケジュールされた定期課金支払いが正常に処理されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[SubscriptionWebhookEvent](src/models/subscription-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>SubscriptionCompleted_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

定期課金の、スケジュールされていたすべての支払いが完了したときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[SubscriptionWebhookEvent](src/models/subscription-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>SubscriptionFailure_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

スケジュールされていた定期課金支払いが失敗したときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[SubscriptionWebhookEvent](src/models/subscription-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>SubscriptionCanceled_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

すべての支払いが完了する前に、定期課金が解約されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[SubscriptionWebhookEvent](src/models/subscription-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>SubscriptionSuspended_POST</summary>

<dl>
<dd>

### Description

<dl>
<dd>

定期課金が一時停止（ポーズ）されたときにトリガーされます。`data` フィールドには、完全な Subscription オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[SubscriptionWebhookEvent](src/models/subscription-webhook-event.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>銀行振込ステータス更新</summary>

<dl>
<dd>

### Description

<dl>
<dd>

銀行振込課金の決済ステータスが変更されたとき（例：入金が受信され、期待される金額と一致したときなど）にトリガーされます。`data` フィールドには、拡張レコード、入金金額、および元となった課金/トークンのメタデータを含む `BankTransferStatusData` オブジェクトが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[BankTransferStatusWebhookCallback](src/models/bank-transfer-status-webhook-callback.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary>税関申告処理完了</summary>

<dl>
<dd>

### Description

<dl>
<dd>

課金に関連付けられた税関申告が最終状態に達したときにトリガーされます。`data` フィールドには、バックエンドフォーマッタによって返される CustomsDeclaration リソースが含まれます。

</dd>
</dl>

### Payload

<dl>
<dd>

<code>[CustomsDeclarationWebhookCallback](src/models/customs-declaration-webhook-callback.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

