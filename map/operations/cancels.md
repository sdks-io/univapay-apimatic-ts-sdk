<!-- Generated file — do not edit; regenerated with the SDK. -->

# Cancels — operations

Accessor: `client.cancels` · Source: `src/resources/cancels.ts` · 4 operations · Request and error types: namespace `Cancels`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createCancel

- **Signature**: `createCancel(request: Cancels.CreateCancelRequest, options?: RequestOptions): ApiPromise<Cancel, Cancels.CreateCancelError>`
- **Wire**: `POST /stores/{storeId}/charges/{chargeId}/cancels`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `Cancel`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Cancels.CreateCancelError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Cancels.CreateCancelRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `chargeId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `CancelCreateRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `CancelCreateRequest` | `cancelCreateRequestSchema` | `src/models/cancel-create-request.ts` |
| `Cancel` | `cancelSchema` | `src/models/cancel.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getCancel

- **Signature**: `getCancel(request: Cancels.GetCancelRequest, options?: RequestOptions): ApiPromise<Cancel, Cancels.GetCancelError>`
- **Wire**: `GET /stores/{storeId}/charges/{chargeId}/cancels/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Cancel`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Cancels.GetCancelError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Cancels.GetCancelRequest` (4):

| Field | Channel | Type | Req | Default |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes | — |
| `chargeId` | `path` | `string` | yes | — |
| `id` | `path` | `string` | yes | — |
| `polling` | `query` | `boolean` | no | `false` |

| Type | Schema value | Source |
| --- | --- | --- |
| `Cancel` | `cancelSchema` | `src/models/cancel.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listCancels

- **Signature**: `listCancels(request: Cancels.ListCancelsRequest, options?: RequestOptions): ApiPromise<CancelList, Cancels.ListCancelsError>`
- **Wire**: `GET /stores/{storeId}/charges/{chargeId}/cancels`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `CancelList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Cancels.ListCancelsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Cancels.ListCancelsRequest` (5):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `chargeId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `CancelList` | `cancelListSchema` | `src/models/cancel-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateCancel

- **Signature**: `updateCancel(request: Cancels.UpdateCancelRequest, options?: RequestOptions): ApiPromise<Cancel, Cancels.UpdateCancelError>`
- **Wire**: `PATCH /stores/{storeId}/charges/{chargeId}/cancels/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `Cancel`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Cancels.UpdateCancelError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Cancels.UpdateCancelRequest` (5):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `chargeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `CancelUpdateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `CancelUpdateRequest` | `cancelUpdateRequestSchema` | `src/models/cancel-update-request.ts` |
| `Cancel` | `cancelSchema` | `src/models/cancel.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

