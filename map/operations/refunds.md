<!-- Generated file — do not edit; regenerated with the SDK. -->

# Refunds — operations

Accessor: `client.refunds` · Source: `src/resources/refunds.ts` · 4 operations · Request and error types: namespace `Refunds`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createRefund

- **Signature**: `createRefund(request: Refunds.CreateRefundRequest, options?: RequestOptions): ApiPromise<Refund, Refunds.CreateRefundError>`
- **Wire**: `POST /stores/{storeId}/charges/{chargeId}/refunds`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `Refund`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Refunds.CreateRefundError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Refunds.CreateRefundRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `chargeId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `RefundCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `RefundCreateRequest` | `refundCreateRequestSchema` | `src/models/refund-create-request.ts` |
| `Refund` | `refundSchema` | `src/models/refund.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getRefund

- **Signature**: `getRefund(request: Refunds.GetRefundRequest, options?: RequestOptions): ApiPromise<Refund, Refunds.GetRefundError>`
- **Wire**: `GET /stores/{storeId}/charges/{chargeId}/refunds/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Refund`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Refunds.GetRefundError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Refunds.GetRefundRequest` (4):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `chargeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |
| `polling` | `query` | `boolean` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Refund` | `refundSchema` | `src/models/refund.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listRefunds

- **Signature**: `listRefunds(request: Refunds.ListRefundsRequest, options?: RequestOptions): ApiPromise<RefundList, Refunds.ListRefundsError>`
- **Wire**: `GET /stores/{storeId}/charges/{chargeId}/refunds`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `RefundList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Refunds.ListRefundsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Refunds.ListRefundsRequest` (6):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `chargeId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `metadata` | `query` | — | `string` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `RefundList` | `refundListSchema` | `src/models/refund-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateRefund

- **Signature**: `updateRefund(request: Refunds.UpdateRefundRequest, options?: RequestOptions): ApiPromise<Refund, Refunds.UpdateRefundError>`
- **Wire**: `PATCH /stores/{storeId}/charges/{chargeId}/refunds/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `Refund`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Refunds.UpdateRefundError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Refunds.UpdateRefundRequest` (5):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `chargeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `RefundUpdateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `RefundUpdateRequest` | `refundUpdateRequestSchema` | `src/models/refund-update-request.ts` |
| `Refund` | `refundSchema` | `src/models/refund.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

