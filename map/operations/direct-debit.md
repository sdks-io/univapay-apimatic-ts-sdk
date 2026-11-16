<!-- Generated file — do not edit; regenerated with the SDK. -->

# DirectDebit — operations

Accessor: `client.directDebit` · Source: `src/resources/direct-debit.ts` · 14 operations · Request and error types: namespace `DirectDebit`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createDirectDebitBankAccount

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `createDirectDebitBankAccount(request: DirectDebit.CreateDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise<DirectDebitBankAccount, DirectDebit.CreateDirectDebitBankAccountError>`
- **Wire**: `POST /merchants/{merchantId}/bank-accounts`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `DirectDebitBankAccount`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.CreateDirectDebitBankAccountError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.CreateDirectDebitBankAccountRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `DirectDebitBankAccountCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankAccountCreateRequest` | `directDebitBankAccountCreateRequestSchema` | `src/models/direct-debit-bank-account-create-request.ts` |
| `DirectDebitBankAccount` | `directDebitBankAccountSchema` | `src/models/direct-debit-bank-account.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### createDirectDebitBankTransfer

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `createDirectDebitBankTransfer(request: DirectDebit.CreateDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise<DirectDebitBankTransfer, DirectDebit.CreateDirectDebitBankTransferError>`
- **Wire**: `POST /merchants/{merchantId}/bank-accounts/{bankAccountId}/bank-transfers`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `DirectDebitBankTransfer`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.CreateDirectDebitBankTransferError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.CreateDirectDebitBankTransferRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes |
| `bankAccountId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `DirectDebitBankTransferCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankTransferCreateRequest` | `directDebitBankTransferCreateRequestSchema` | `src/models/direct-debit-bank-transfer-create-request.ts` |
| `DirectDebitBankTransfer` | `directDebitBankTransferSchema` | `src/models/direct-debit-bank-transfer.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### deactivateDirectDebitBankAccount

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `deactivateDirectDebitBankAccount(request: DirectDebit.DeactivateDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise<DirectDebitBankAccount, DirectDebit.DeactivateDirectDebitBankAccountError>`
- **Wire**: `DELETE /merchants/{merchantId}/bank-accounts/{bankAccountId}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `DirectDebitBankAccount`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.DeactivateDirectDebitBankAccountError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.DeactivateDirectDebitBankAccountRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |
| `bankAccountId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankAccount` | `directDebitBankAccountSchema` | `src/models/direct-debit-bank-account.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### deleteDirectDebitBankTransfer

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `deleteDirectDebitBankTransfer(request: DirectDebit.DeleteDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise<undefined, DirectDebit.DeleteDirectDebitBankTransferError>`
- **Wire**: `DELETE /merchants/{merchantId}/bank-transfers/{bankTransferId}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.DeleteDirectDebitBankTransferError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.DeleteDirectDebitBankTransferRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |
| `bankTransferId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getDirectDebitBankAccount

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `getDirectDebitBankAccount(request: DirectDebit.GetDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise<DirectDebitBankAccount, DirectDebit.GetDirectDebitBankAccountError>`
- **Wire**: `GET /merchants/{merchantId}/bank-accounts/{bankAccountId}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitBankAccount`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.GetDirectDebitBankAccountError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.GetDirectDebitBankAccountRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |
| `bankAccountId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankAccount` | `directDebitBankAccountSchema` | `src/models/direct-debit-bank-account.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getDirectDebitBankTransfer

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `getDirectDebitBankTransfer(request: DirectDebit.GetDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise<DirectDebitBankTransfer, DirectDebit.GetDirectDebitBankTransferError>`
- **Wire**: `GET /merchants/{merchantId}/bank-transfers/{bankTransferId}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitBankTransfer`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.GetDirectDebitBankTransferError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.GetDirectDebitBankTransferRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |
| `bankTransferId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankTransfer` | `directDebitBankTransferSchema` | `src/models/direct-debit-bank-transfer.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getDirectDebitConfiguration

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `getDirectDebitConfiguration(request: DirectDebit.GetDirectDebitConfigurationRequest, options?: RequestOptions): ApiPromise<DirectDebitMerchantConfiguration, DirectDebit.GetDirectDebitConfigurationError>`
- **Wire**: `GET /merchants/{merchantId}/configuration`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitMerchantConfiguration`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.GetDirectDebitConfigurationError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.GetDirectDebitConfigurationRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitMerchantConfiguration` | `directDebitMerchantConfigurationSchema` | `src/models/direct-debit-merchant-configuration.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getDirectDebitCurrentSchedule

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `getDirectDebitCurrentSchedule(request: DirectDebit.GetDirectDebitCurrentScheduleRequest, options?: RequestOptions): ApiPromise<DirectDebitSchedule, DirectDebit.GetDirectDebitCurrentScheduleError>`
- **Wire**: `GET /merchants/{merchantId}/schedules/current`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitSchedule`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.GetDirectDebitCurrentScheduleError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.GetDirectDebitCurrentScheduleRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitSchedule` | `directDebitScheduleSchema` | `src/models/direct-debit-schedule.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getDirectDebitNotificationConfiguration

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `getDirectDebitNotificationConfiguration(request: DirectDebit.GetDirectDebitNotificationConfigurationRequest, options?: RequestOptions): ApiPromise<DirectDebitNotificationConfiguration, DirectDebit.GetDirectDebitNotificationConfigurationError>`
- **Wire**: `GET /merchants/{merchantId}/notification-configuration`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitNotificationConfiguration`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.GetDirectDebitNotificationConfigurationError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.GetDirectDebitNotificationConfigurationRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `merchantId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitNotificationConfiguration` | `directDebitNotificationConfigurationSchema` | `src/models/direct-debit-notification-configuration.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listDirectDebitBankAccounts

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `listDirectDebitBankAccounts(request: DirectDebit.ListDirectDebitBankAccountsRequest, options?: RequestOptions): ApiPromise<DirectDebitBankAccountList, DirectDebit.ListDirectDebitBankAccountsError>`
- **Wire**: `GET /merchants/{merchantId}/bank-accounts`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitBankAccountList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.ListDirectDebitBankAccountsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.ListDirectDebitBankAccountsRequest` (16):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `userNumber` | `query` | `user_number` | `string` | no | — |
| `bankAccountId` | `query` | `bank_account_id` | `string` | no | — |
| `bankCode` | `query` | `bank_code` | `string` | no | — |
| `bankName` | `query` | `bank_name` | `string` | no | — |
| `branchCode` | `query` | `branch_code` | `string` | no | — |
| `bankAccountType` | `query` | `bank_account_type` | `DirectDebitBankAccountType` | no | — |
| `bankAccountNumber` | `query` | `bank_account_number` | `string` | no | — |
| `bankAccountName` | `query` | `bank_account_name` | `string` | no | — |
| `registrationOrigin` | `query` | `registration_origin` | `DirectDebitRegistrationOrigin` | no | — |
| `bankAccountStatus` | `query` | `bank_account_status` | `DirectDebitBankAccountStatus` | no | — |
| `from` | `query` | — | `string` | no | — |
| `to` | `query` | — | `string` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `DirectDebitBankAccountType` | `directDebitBankAccountTypeSchema` | `src/models/direct-debit-bank-account-type.ts` |
| `DirectDebitRegistrationOrigin` | `directDebitRegistrationOriginSchema` | `src/models/direct-debit-registration-origin.ts` |
| `DirectDebitBankAccountStatus` | `directDebitBankAccountStatusSchema` | `src/models/direct-debit-bank-account-status.ts` |
| `DirectDebitBankAccountList` | `directDebitBankAccountListSchema` | `src/models/direct-debit-bank-account-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listDirectDebitBankTransfers

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `listDirectDebitBankTransfers(request: DirectDebit.ListDirectDebitBankTransfersRequest, options?: RequestOptions): ApiPromise<DirectDebitBankTransferList, DirectDebit.ListDirectDebitBankTransfersError>`
- **Wire**: `GET /merchants/{merchantId}/bank-transfers`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitBankTransferList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.ListDirectDebitBankTransfersError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.ListDirectDebitBankTransfersRequest` (13):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `bankTransferId` | `query` | `bank_transfer_id` | `string` | no | — |
| `bankTransferStart` | `query` | `bank_transfer_start` | `string` | no | — |
| `bankTransferEnd` | `query` | `bank_transfer_end` | `string` | no | — |
| `debitDate` | `query` | `debit_date` | `DirectDebitDebitDate` | no | — |
| `userNumber` | `query` | `user_number` | `string` | no | — |
| `bankAccountNumber` | `query` | `bank_account_number` | `string` | no | — |
| `bankAccountName` | `query` | `bank_account_name` | `string` | no | — |
| `lockStatus` | `query` | `lock_status` | `DirectDebitBankTransferLock` | no | — |
| `bankTransferStatus` | `query` | `bank_transfer_status` | `DirectDebitBankTransferStatus` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `DirectDebitDebitDate` | `directDebitDebitDateSchema` | `src/models/direct-debit-debit-date.ts` |
| `DirectDebitBankTransferLock` | `directDebitBankTransferLockSchema` | `src/models/direct-debit-bank-transfer-lock.ts` |
| `DirectDebitBankTransferStatus` | `directDebitBankTransferStatusSchema` | `src/models/direct-debit-bank-transfer-status.ts` |
| `DirectDebitBankTransferList` | `directDebitBankTransferListSchema` | `src/models/direct-debit-bank-transfer-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### reenableDirectDebitBankAccount

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `reenableDirectDebitBankAccount(request: DirectDebit.ReenableDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise<DirectDebitBankAccount, DirectDebit.ReenableDirectDebitBankAccountError>`
- **Wire**: `POST /merchants/{merchantId}/bank-accounts/{bankAccountId}/re-enable`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `DirectDebitBankAccount`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.ReenableDirectDebitBankAccountError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.ReenableDirectDebitBankAccountRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes |
| `bankAccountId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankAccount` | `directDebitBankAccountSchema` | `src/models/direct-debit-bank-account.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateDirectDebitBankAccount

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `updateDirectDebitBankAccount(request: DirectDebit.UpdateDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise<DirectDebitBankAccount, DirectDebit.UpdateDirectDebitBankAccountError>`
- **Wire**: `PATCH /merchants/{merchantId}/bank-accounts/{bankAccountId}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `DirectDebitBankAccount`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.UpdateDirectDebitBankAccountError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.UpdateDirectDebitBankAccountRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes |
| `bankAccountId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `DirectDebitBankAccountUpdateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankAccountUpdateRequest` | `directDebitBankAccountUpdateRequestSchema` | `src/models/direct-debit-bank-account-update-request.ts` |
| `DirectDebitBankAccount` | `directDebitBankAccountSchema` | `src/models/direct-debit-bank-account.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateDirectDebitBankTransfer

- **Server**: `directDebit` — not the `default` group; see Servers & auth in sdk-map.md
- **Signature**: `updateDirectDebitBankTransfer(request: DirectDebit.UpdateDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise<DirectDebitBankTransfer, DirectDebit.UpdateDirectDebitBankTransferError>`
- **Wire**: `PATCH /merchants/{merchantId}/bank-transfers/{bankTransferId}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `DirectDebitBankTransfer`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `DirectDebit.UpdateDirectDebitBankTransferError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `DirectDebit.UpdateDirectDebitBankTransferRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes |
| `bankTransferId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `DirectDebitBankTransferPatchRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `DirectDebitBankTransferPatchRequest` | `directDebitBankTransferPatchRequestSchema` | `src/models/direct-debit-bank-transfer-patch-request.ts` |
| `DirectDebitBankTransfer` | `directDebitBankTransferSchema` | `src/models/direct-debit-bank-transfer.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

