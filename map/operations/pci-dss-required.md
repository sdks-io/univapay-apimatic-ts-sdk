<!-- Generated file — do not edit; regenerated with the SDK. -->

# PciDssRequired — operations

Accessor: `client.pciDssRequired` · Source: `src/resources/pci-dss-required.ts` · 3 operations · Request and error types: namespace `PciDssRequired`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createTransactionToken

- **Signature**: `createTransactionToken(request: PciDssRequired.CreateTransactionTokenRequest, options?: RequestOptions): ApiPromise<TransactionToken, PciDssRequired.CreateTransactionTokenError>`
- **Wire**: `POST /tokens`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `PciDssRequired.CreateTransactionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PciDssRequired.CreateTransactionTokenRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `TransactionTokenCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionTokenCreateRequest` | `transactionTokenCreateRequestSchema` | `src/models/transaction-token-create-request.ts` |
| `TransactionToken` | `transactionTokenSchema` | `src/models/unions/transaction-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getTokenThreeDsIssuerToken

- **Signature**: `getTokenThreeDsIssuerToken(request: PciDssRequired.GetTokenThreeDsIssuerTokenRequest, options?: RequestOptions): ApiPromise<ThreeDsIssuerToken, PciDssRequired.GetTokenThreeDsIssuerTokenError>`
- **Wire**: `GET /stores/{storeId}/tokens/{id}/three_ds/issuer_token`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ThreeDsIssuerToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `PciDssRequired.GetTokenThreeDsIssuerTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PciDssRequired.GetTokenThreeDsIssuerTokenRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ThreeDsIssuerToken` | `threeDsIssuerTokenSchema` | `src/models/three-ds-issuer-token.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateTransactionToken

- **Signature**: `updateTransactionToken(request: PciDssRequired.UpdateTransactionTokenRequest, options?: RequestOptions): ApiPromise<TransactionToken, PciDssRequired.UpdateTransactionTokenError>`
- **Wire**: `PATCH /stores/{storeId}/tokens/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `TransactionToken`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `PciDssRequired.UpdateTransactionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PciDssRequired.UpdateTransactionTokenRequest` (4):

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

