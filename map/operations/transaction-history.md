<!-- Generated file — do not edit; regenerated with the SDK. -->

# TransactionHistory — operations

Accessor: `client.transactionHistory` · Source: `src/resources/transaction-history.ts` · 2 operations · Request and error types: namespace `TransactionHistory`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### listStoreTransactionHistory

- **Signature**: `listStoreTransactionHistory(request: TransactionHistory.ListStoreTransactionHistoryRequest, options?: RequestOptions): ApiPromise<TransactionHistoryList, TransactionHistory.ListStoreTransactionHistoryError>`
- **Wire**: `GET /stores/{storeId}/transaction_history`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `TransactionHistoryList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionHistory.ListStoreTransactionHistoryError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionHistory.ListStoreTransactionHistoryRequest` (27):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `mode` | `query` | — | `TransactionHistoryMode` | no | — |
| `shortId` | `query` | `short_id` | `string` | no | — |
| `from` | `query` | — | `string` | no | — |
| `to` | `query` | — | `string` | no | — |
| `status` | `query` | — | `TransactionHistoryStatus` | no | — |
| `type` | `query` | — | `TransactionHistoryType` | no | — |
| `search` | `query` | — | `string` | no | — |
| `email` | `query` | — | `string` | no | — |
| `id` | `query` | — | `string` | no | — |
| `metadata` | `query` | — | `string` | no | — |
| `cardExp` | `query` | `card_exp` | `string` | no | — |
| `cardLastFour` | `query` | `card_last_four` | `string` | no | — |
| `cardholder` | `query` | — | `string` | no | — |
| `cardBrand` | `query` | `card_brand[]` | `string[]` | no | — |
| `brand` | `query` | `brand[]` | `string[]` | no | — |
| `brands` | `query` | `brands[]` | `string[]` | no | — |
| `currency` | `query` | — | `string` | no | — |
| `serviceProvider` | `query` | `service_provider` | `TransactionHistoryServiceProvider` | no | — |
| `serviceProviders` | `query` | `service_providers[]` | `TransactionHistoryServiceProvider[]` | no | — |
| `gatewayTransactionId` | `query` | `gateway_transaction_id` | `string` | no | — |
| `bankTransferPaymentStatuses` | `query` | `bank_transfer_payment_statuses[]` | `BankTransferPaymentStatus[]` | no | — |
| `bankTransferLatestDepositDateFrom` | `query` | `bank_transfer_latest_deposit_date.from` | `string` | no | — |
| `bankTransferLatestDepositDateTo` | `query` | `bank_transfer_latest_deposit_date.to` | `string` | no | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionHistoryMode` | `transactionHistoryModeSchema` | `src/models/transaction-history-mode.ts` |
| `TransactionHistoryStatus` | `transactionHistoryStatusSchema` | `src/models/transaction-history-status.ts` |
| `TransactionHistoryType` | `transactionHistoryTypeSchema` | `src/models/transaction-history-type.ts` |
| `TransactionHistoryServiceProvider` | `transactionHistoryServiceProviderSchema` | `src/models/transaction-history-service-provider.ts` |
| `BankTransferPaymentStatus` | `bankTransferPaymentStatusSchema` | `src/models/bank-transfer-payment-status.ts` |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `TransactionHistoryList` | `transactionHistoryListSchema` | `src/models/transaction-history-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listTransactionHistory

- **Signature**: `listTransactionHistory(request?: TransactionHistory.ListTransactionHistoryRequest, options?: RequestOptions): ApiPromise<TransactionHistoryList, TransactionHistory.ListTransactionHistoryError>`
- **Wire**: `GET /transaction_history`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `TransactionHistoryList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionHistory.ListTransactionHistoryError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionHistory.ListTransactionHistoryRequest` (26):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `mode` | `query` | — | `TransactionHistoryMode` | no | — |
| `shortId` | `query` | `short_id` | `string` | no | — |
| `from` | `query` | — | `string` | no | — |
| `to` | `query` | — | `string` | no | — |
| `status` | `query` | — | `TransactionHistoryStatus` | no | — |
| `type` | `query` | — | `TransactionHistoryType` | no | — |
| `search` | `query` | — | `string` | no | — |
| `email` | `query` | — | `string` | no | — |
| `id` | `query` | — | `string` | no | — |
| `metadata` | `query` | — | `string` | no | — |
| `cardExp` | `query` | `card_exp` | `string` | no | — |
| `cardLastFour` | `query` | `card_last_four` | `string` | no | — |
| `cardholder` | `query` | — | `string` | no | — |
| `cardBrand` | `query` | `card_brand[]` | `string[]` | no | — |
| `brand` | `query` | `brand[]` | `string[]` | no | — |
| `brands` | `query` | `brands[]` | `string[]` | no | — |
| `currency` | `query` | — | `string` | no | — |
| `serviceProvider` | `query` | `service_provider` | `TransactionHistoryServiceProvider` | no | — |
| `serviceProviders` | `query` | `service_providers[]` | `TransactionHistoryServiceProvider[]` | no | — |
| `gatewayTransactionId` | `query` | `gateway_transaction_id` | `string` | no | — |
| `bankTransferPaymentStatuses` | `query` | `bank_transfer_payment_statuses[]` | `BankTransferPaymentStatus[]` | no | — |
| `bankTransferLatestDepositDateFrom` | `query` | `bank_transfer_latest_deposit_date.from` | `string` | no | — |
| `bankTransferLatestDepositDateTo` | `query` | `bank_transfer_latest_deposit_date.to` | `string` | no | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionHistoryMode` | `transactionHistoryModeSchema` | `src/models/transaction-history-mode.ts` |
| `TransactionHistoryStatus` | `transactionHistoryStatusSchema` | `src/models/transaction-history-status.ts` |
| `TransactionHistoryType` | `transactionHistoryTypeSchema` | `src/models/transaction-history-type.ts` |
| `TransactionHistoryServiceProvider` | `transactionHistoryServiceProviderSchema` | `src/models/transaction-history-service-provider.ts` |
| `BankTransferPaymentStatus` | `bankTransferPaymentStatusSchema` | `src/models/bank-transfer-payment-status.ts` |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `TransactionHistoryList` | `transactionHistoryListSchema` | `src/models/transaction-history-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

