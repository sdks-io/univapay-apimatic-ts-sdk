<!-- Generated file — do not edit; regenerated with the SDK. -->

# Stores — operations

Accessor: `client.stores` · Source: `src/resources/stores.ts` · 3 operations · Request and error types: namespace `Stores`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createCustomerId

- **Signature**: `createCustomerId(request: Stores.CreateCustomerIdRequestParams, options?: RequestOptions): ApiPromise<CreateCustomerIdResponse, Stores.CreateCustomerIdError>`
- **Wire**: `POST /stores/{storeId}/create_customer_id`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `CreateCustomerIdResponse`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Stores.CreateCustomerIdError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Stores.CreateCustomerIdRequestParams` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `body` | `body` | `CreateCustomerIdRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `CreateCustomerIdRequest` | `createCustomerIdRequestSchema` | `src/models/create-customer-id-request.ts` |
| `CreateCustomerIdResponse` | `createCustomerIdResponseSchema` | `src/models/create-customer-id-response.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getStore

- **Signature**: `getStore(request: Stores.GetStoreRequest, options?: RequestOptions): ApiPromise<Store, Stores.GetStoreError>`
- **Wire**: `GET /stores/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Store`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Stores.GetStoreError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Stores.GetStoreRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Store` | `storeSchema` | `src/models/store.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listStores

- **Signature**: `listStores(request?: Stores.ListStoresRequest, options?: RequestOptions): ApiPromise<StoreList, Stores.ListStoresError>`
- **Wire**: `GET /stores`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `StoreList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Stores.ListStoresError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Stores.ListStoresRequest` (5):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `shortId` | `query` | `short_id` | `string` | no | — |
| `search` | `query` | — | `string` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `StoreList` | `storeListSchema` | `src/models/store-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

