<!-- Generated file — do not edit; regenerated with the SDK. -->

# Charges — operations

Accessor: `client.charges` · Source: `src/resources/charges.ts` · 12 operations · Request and error types: namespace `Charges`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### captureCharge

- **Signature**: `captureCharge(request: Charges.CaptureChargeRequest, options?: RequestOptions): ApiPromise<undefined, Charges.CaptureChargeError>`
- **Wire**: `POST /stores/{storeId}/charges/{id}/capture`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.CaptureChargeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.CaptureChargeRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `ChargeCaptureRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ChargeCaptureRequest` | `chargeCaptureRequestSchema` | `src/models/charge-capture-request.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### createCharge

- **Signature**: `createCharge(request?: Charges.CreateChargeRequest, options?: RequestOptions): ApiPromise<Charge, Charges.CreateChargeError>`
- **Wire**: `POST /charges`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `Charge`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.CreateChargeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.CreateChargeRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `ChargeCreateRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ChargeCreateRequest` | `chargeCreateRequestSchema` | `src/models/charge-create-request.ts` |
| `Charge` | `chargeSchema` | `src/models/charge.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### createCustomsDeclaration

- **Signature**: `createCustomsDeclaration(request: Charges.CreateCustomsDeclarationRequest, options?: RequestOptions): ApiPromise<CustomsDeclarationWebhookData, Charges.CreateCustomsDeclarationError>`
- **Wire**: `POST /stores/{storeId}/charges/{chargeId}/customs`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `CustomsDeclarationWebhookData`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.CreateCustomsDeclarationError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.CreateCustomsDeclarationRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `chargeId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `CustomsDeclarationCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `CustomsDeclarationCreateRequest` | `customsDeclarationCreateRequestSchema` | `src/models/customs-declaration-create-request.ts` |
| `CustomsDeclarationWebhookData` | `customsDeclarationWebhookDataSchema` | `src/models/customs-declaration-webhook-data.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getCharge

- **Signature**: `getCharge(request: Charges.GetChargeRequest, options?: RequestOptions): ApiPromise<Charge, Charges.GetChargeError>`
- **Wire**: `GET /stores/{storeId}/charges/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Charge`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.GetChargeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.GetChargeRequest` (3):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |
| `polling` | `query` | `boolean` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Charge` | `chargeSchema` | `src/models/charge.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getChargeIssuerToken

- **Signature**: `getChargeIssuerToken(request: Charges.GetChargeIssuerTokenRequest, options?: RequestOptions): ApiPromise<IssuerToken, Charges.GetChargeIssuerTokenError>`
- **Wire**: `GET /stores/{storeId}/charges/{id}/issuer_token`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `IssuerToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.GetChargeIssuerTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.GetChargeIssuerTokenRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `IssuerToken` | `issuerTokenSchema` | `src/models/issuer-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getChargeThreeDsIssuerToken

- **Signature**: `getChargeThreeDsIssuerToken(request: Charges.GetChargeThreeDsIssuerTokenRequest, options?: RequestOptions): ApiPromise<ThreeDsIssuerToken, Charges.GetChargeThreeDsIssuerTokenError>`
- **Wire**: `GET /stores/{storeId}/charges/{id}/three_ds/issuer_token`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ThreeDsIssuerToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.GetChargeThreeDsIssuerTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.GetChargeThreeDsIssuerTokenRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ThreeDsIssuerToken` | `threeDsIssuerTokenSchema` | `src/models/three-ds-issuer-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getCustomsDeclaration

- **Signature**: `getCustomsDeclaration(request: Charges.GetCustomsDeclarationRequest, options?: RequestOptions): ApiPromise<CustomsDeclarationWebhookData, Charges.GetCustomsDeclarationError>`
- **Wire**: `GET /stores/{storeId}/charges/{chargeId}/customs/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `CustomsDeclarationWebhookData`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.GetCustomsDeclarationError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.GetCustomsDeclarationRequest` (4):

| Field | Channel | Type | Req | Default |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes | — |
| `chargeId` | `path` | `string` | yes | — |
| `id` | `path` | `string` | yes | — |
| `polling` | `query` | `boolean` | no | `false` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CustomsDeclarationWebhookData` | `customsDeclarationWebhookDataSchema` | `src/models/customs-declaration-webhook-data.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listAllCharges

- **Signature**: `listAllCharges(request?: Charges.ListAllChargesRequest, options?: RequestOptions): ApiPromise<ChargeList, Charges.ListAllChargesError>`
- **Wire**: `GET /charges`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ChargeList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.ListAllChargesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.ListAllChargesRequest` (17):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `lastFour` | `query` | `last_four` | `string` | no | — |
| `name` | `query` | — | `string` | no | — |
| `expMonth` | `query` | `exp_month` | `number` | no | — |
| `expYear` | `query` | `exp_year` | `number` | no | — |
| `from` | `query` | — | `string` | no | — |
| `to` | `query` | — | `string` | no | — |
| `email` | `query` | — | `string` | no | — |
| `phone` | `query` | — | `string` | no | — |
| `amountFrom` | `query` | `amount_from` | `number` | no | — |
| `amountTo` | `query` | `amount_to` | `number` | no | — |
| `currency` | `query` | — | `string` | no | — |
| `mode` | `query` | — | `ModeQuery` | no | — |
| `metadata` | `query` | — | `string` | no | — |
| `transactionTokenId` | `query` | `transaction_token_id` | `string` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `ModeQuery` | `modeQuerySchema` | `src/models/mode-query.ts` |
| `ChargeList` | `chargeListSchema` | `src/models/charge-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listBankTransferLedgers

- **Signature**: `listBankTransferLedgers(request: Charges.ListBankTransferLedgersRequest, options?: RequestOptions): ApiPromise<BankTransferLedgerList, Charges.ListBankTransferLedgersError>`
- **Wire**: `GET /stores/{storeId}/charges/{id}/bank_transfer_ledgers`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `BankTransferLedgerList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.ListBankTransferLedgersError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.ListBankTransferLedgersRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `BankTransferLedgerList` | `bankTransferLedgerListSchema` | `src/models/bank-transfer-ledger-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listStoreCharges

- **Signature**: `listStoreCharges(request: Charges.ListStoreChargesRequest, options?: RequestOptions): ApiPromise<ChargeList, Charges.ListStoreChargesError>`
- **Wire**: `GET /stores/{storeId}/charges`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ChargeList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.ListStoreChargesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.ListStoreChargesRequest` (18):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `lastFour` | `query` | `last_four` | `string` | no | — |
| `name` | `query` | — | `string` | no | — |
| `expMonth` | `query` | `exp_month` | `number` | no | — |
| `expYear` | `query` | `exp_year` | `number` | no | — |
| `from` | `query` | — | `string` | no | — |
| `to` | `query` | — | `string` | no | — |
| `email` | `query` | — | `string` | no | — |
| `phone` | `query` | — | `string` | no | — |
| `amountFrom` | `query` | `amount_from` | `number` | no | — |
| `amountTo` | `query` | `amount_to` | `number` | no | — |
| `currency` | `query` | — | `string` | no | — |
| `mode` | `query` | — | `ModeQuery` | no | — |
| `metadata` | `query` | — | `string` | no | — |
| `transactionTokenId` | `query` | `transaction_token_id` | `string` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `ModeQuery` | `modeQuerySchema` | `src/models/mode-query.ts` |
| `ChargeList` | `chargeListSchema` | `src/models/charge-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### patchCustomsDeclaration

- **Signature**: `patchCustomsDeclaration(request: Charges.PatchCustomsDeclarationRequest, options?: RequestOptions): ApiPromise<CustomsDeclarationWebhookData, Charges.PatchCustomsDeclarationError>`
- **Wire**: `PATCH /stores/{storeId}/charges/{chargeId}/customs/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `CustomsDeclarationWebhookData`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.PatchCustomsDeclarationError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.PatchCustomsDeclarationRequest` (5):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `chargeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `CustomsDeclarationPatchRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `CustomsDeclarationPatchRequest` | `customsDeclarationPatchRequestSchema` | `src/models/customs-declaration-patch-request.ts` |
| `CustomsDeclarationWebhookData` | `customsDeclarationWebhookDataSchema` | `src/models/customs-declaration-webhook-data.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateCharge

- **Signature**: `updateCharge(request: Charges.UpdateChargeRequest, options?: RequestOptions): ApiPromise<Charge, Charges.UpdateChargeError>`
- **Wire**: `PATCH /stores/{storeId}/charges/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `Charge`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Charges.UpdateChargeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Charges.UpdateChargeRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `ChargeUpdateRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ChargeUpdateRequest` | `chargeUpdateRequestSchema` | `src/models/charge-update-request.ts` |
| `Charge` | `chargeSchema` | `src/models/charge.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

