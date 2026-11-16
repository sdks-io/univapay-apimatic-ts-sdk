<!-- Generated file — do not edit; regenerated with the SDK. -->

# Webhooks — operations

Accessor: `client.webhooks` · Source: `src/resources/webhooks.ts` · 6 operations · Request and error types: namespace `Webhooks`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createWebhook

- **Signature**: `createWebhook(request: Webhooks.CreateWebhookRequest, options?: RequestOptions): ApiPromise<Webhook, Webhooks.CreateWebhookError>`
- **Wire**: `POST /stores/{storeId}/webhooks`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `Webhook`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Webhooks.CreateWebhookError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Webhooks.CreateWebhookRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `WebhookCreateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `WebhookCreateRequest` | `webhookCreateRequestSchema` | `src/models/webhook-create-request.ts` |
| `Webhook` | `webhookSchema` | `src/models/webhook.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### deleteWebhook

- **Signature**: `deleteWebhook(request: Webhooks.DeleteWebhookRequest, options?: RequestOptions): ApiPromise<undefined, Webhooks.DeleteWebhookError>`
- **Wire**: `DELETE /stores/{storeId}/webhooks/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Webhooks.DeleteWebhookError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Webhooks.DeleteWebhookRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getWebhook

- **Signature**: `getWebhook(request: Webhooks.GetWebhookRequest, options?: RequestOptions): ApiPromise<Webhook, Webhooks.GetWebhookError>`
- **Wire**: `GET /stores/{storeId}/webhooks/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Webhook`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Webhooks.GetWebhookError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Webhooks.GetWebhookRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Webhook` | `webhookSchema` | `src/models/webhook.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listWebhookEvents

- **Signature**: `listWebhookEvents(request: Webhooks.ListWebhookEventsRequest, options?: RequestOptions): ApiPromise<WebhookEventList, Webhooks.ListWebhookEventsError>`
- **Wire**: `GET /stores/{storeId}/webhooks/{id}/events`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `WebhookEventList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Webhooks.ListWebhookEventsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Webhooks.ListWebhookEventsRequest` (5):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `id` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `WebhookEventList` | `webhookEventListSchema` | `src/models/webhook-event-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listWebhooks

- **Signature**: `listWebhooks(request: Webhooks.ListWebhooksRequest, options?: RequestOptions): ApiPromise<WebhookList, Webhooks.ListWebhooksError>`
- **Wire**: `GET /stores/{storeId}/webhooks`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `WebhookList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Webhooks.ListWebhooksError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Webhooks.ListWebhooksRequest` (5):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |
| `active` | `query` | — | `boolean` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `WebhookList` | `webhookListSchema` | `src/models/webhook-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateWebhook

- **Signature**: `updateWebhook(request: Webhooks.UpdateWebhookRequest, options?: RequestOptions): ApiPromise<Webhook, Webhooks.UpdateWebhookError>`
- **Wire**: `PATCH /stores/{storeId}/webhooks/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `Webhook`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Webhooks.UpdateWebhookError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Webhooks.UpdateWebhookRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `WebhookUpdateRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `WebhookUpdateRequest` | `webhookUpdateRequestSchema` | `src/models/webhook-update-request.ts` |
| `Webhook` | `webhookSchema` | `src/models/webhook.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

