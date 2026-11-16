<!-- Generated file — do not edit; regenerated with the SDK. -->

# TransactionTokens — operations

Accessor: `client.transactionTokens` · Source: `src/resources/transaction-tokens.ts` · 9 operations · Request and error types: namespace `TransactionTokens`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createTransactionToken

- **Signature**: `createTransactionToken(request: TransactionTokens.CreateTransactionTokenRequest, options?: RequestOptions): ApiPromise<TransactionToken, TransactionTokens.CreateTransactionTokenError>`
- **Wire**: `POST /tokens`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.CreateTransactionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.CreateTransactionTokenRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `TransactionTokenCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionTokenCreateRequest` | `transactionTokenCreateRequestSchema` | `src/models/transaction-token-create-request.ts` |
| `TransactionToken` | `transactionTokenSchema` | `src/models/unions/transaction-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### deleteTransactionToken

- **Signature**: `deleteTransactionToken(request: TransactionTokens.DeleteTransactionTokenRequest, options?: RequestOptions): ApiPromise<undefined, TransactionTokens.DeleteTransactionTokenError>`
- **Wire**: `DELETE /stores/{storeId}/tokens/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.DeleteTransactionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.DeleteTransactionTokenRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### disableTokenThreeDs

- **Signature**: `disableTokenThreeDs(request: TransactionTokens.DisableTokenThreeDsRequest, options?: RequestOptions): ApiPromise<TransactionToken, TransactionTokens.DisableTokenThreeDsError>`
- **Wire**: `DELETE /stores/{storeId}/tokens/{id}/three_ds`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.DisableTokenThreeDsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.DisableTokenThreeDsRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionToken` | `transactionTokenSchema` | `src/models/unions/transaction-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### enableTokenThreeDs

- **Signature**: `enableTokenThreeDs(request: TransactionTokens.EnableTokenThreeDsRequestParams, options?: RequestOptions): ApiPromise<TransactionToken, TransactionTokens.EnableTokenThreeDsError>`
- **Wire**: `POST /stores/{storeId}/tokens/{id}/three_ds`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.EnableTokenThreeDsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.EnableTokenThreeDsRequestParams` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `EnableTokenThreeDsRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `EnableTokenThreeDsRequest` | `enableTokenThreeDsRequestSchema` | `src/models/enable-token-three-ds-request.ts` |
| `TransactionToken` | `transactionTokenSchema` | `src/models/unions/transaction-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getTokenThreeDsIssuerToken

- **Signature**: `getTokenThreeDsIssuerToken(request: TransactionTokens.GetTokenThreeDsIssuerTokenRequest, options?: RequestOptions): ApiPromise<ThreeDsIssuerToken, TransactionTokens.GetTokenThreeDsIssuerTokenError>`
- **Wire**: `GET /stores/{storeId}/tokens/{id}/three_ds/issuer_token`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ThreeDsIssuerToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.GetTokenThreeDsIssuerTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.GetTokenThreeDsIssuerTokenRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ThreeDsIssuerToken` | `threeDsIssuerTokenSchema` | `src/models/three-ds-issuer-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getTransactionToken

- **Signature**: `getTransactionToken(request: TransactionTokens.GetTransactionTokenRequest, options?: RequestOptions): ApiPromise<TransactionToken, TransactionTokens.GetTransactionTokenError>`
- **Wire**: `GET /stores/{storeId}/tokens/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.GetTransactionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.GetTransactionTokenRequest` (3):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |
| `polling` | `query` | `boolean` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionToken` | `transactionTokenSchema` | `src/models/unions/transaction-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listAllTransactionTokens

- **Signature**: `listAllTransactionTokens(request?: TransactionTokens.ListAllTransactionTokensRequest, options?: RequestOptions): ApiPromise<TransactionTokenList, TransactionTokens.ListAllTransactionTokensError>`
- **Wire**: `GET /tokens`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `TransactionTokenList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.ListAllTransactionTokensError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.ListAllTransactionTokensRequest` (8):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `search` | `query` | — | `string` | no | — |
| `customerId` | `query` | `customer_id` | `string` | no | — |
| `type` | `query` | — | `TransactionTokenListType` | no | — |
| `mode` | `query` | — | `ModeQuery` | no | — |
| `active` | `query` | — | `TransactionTokenActiveFilter` | no | `TransactionTokenActiveFilter.Active` |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionTokenListType` | `transactionTokenListTypeSchema` | `src/models/transaction-token-list-type.ts` |
| `ModeQuery` | `modeQuerySchema` | `src/models/mode-query.ts` |
| `TransactionTokenActiveFilter` | `transactionTokenActiveFilterSchema` | `src/models/transaction-token-active-filter.ts` |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `TransactionTokenList` | `transactionTokenListSchema` | `src/models/transaction-token-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listStoreTransactionTokens

- **Signature**: `listStoreTransactionTokens(request: TransactionTokens.ListStoreTransactionTokensRequest, options?: RequestOptions): ApiPromise<TransactionTokenList, TransactionTokens.ListStoreTransactionTokensError>`
- **Wire**: `GET /stores/{storeId}/tokens`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `TransactionTokenList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.ListStoreTransactionTokensError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.ListStoreTransactionTokensRequest` (9):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `search` | `query` | — | `string` | no | — |
| `customerId` | `query` | `customer_id` | `string` | no | — |
| `type` | `query` | — | `TransactionTokenListType` | no | — |
| `mode` | `query` | — | `ModeQuery` | no | — |
| `active` | `query` | — | `TransactionTokenActiveFilter` | no | `TransactionTokenActiveFilter.Active` |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionTokenListType` | `transactionTokenListTypeSchema` | `src/models/transaction-token-list-type.ts` |
| `ModeQuery` | `modeQuerySchema` | `src/models/mode-query.ts` |
| `TransactionTokenActiveFilter` | `transactionTokenActiveFilterSchema` | `src/models/transaction-token-active-filter.ts` |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `TransactionTokenList` | `transactionTokenListSchema` | `src/models/transaction-token-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateTransactionToken

- **Signature**: `updateTransactionToken(request: TransactionTokens.UpdateTransactionTokenRequest, options?: RequestOptions): ApiPromise<TransactionToken, TransactionTokens.UpdateTransactionTokenError>`
- **Wire**: `PATCH /stores/{storeId}/tokens/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `TransactionTokens.UpdateTransactionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `TransactionTokens.UpdateTransactionTokenRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `TransactionTokenUpdateRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionTokenUpdateRequest` | `transactionTokenUpdateRequestSchema` | `src/models/transaction-token-update-request.ts` |
| `TransactionToken` | `transactionTokenSchema` | `src/models/unions/transaction-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

