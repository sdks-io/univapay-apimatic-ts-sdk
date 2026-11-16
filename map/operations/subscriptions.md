<!-- Generated file — do not edit; regenerated with the SDK. -->

# Subscriptions — operations

Accessor: `client.subscriptions` · Source: `src/resources/subscriptions.ts` · 17 operations · Request and error types: namespace `Subscriptions`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### cancelSubscription

- **Signature**: `cancelSubscription(request: Subscriptions.CancelSubscriptionRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.CancelSubscriptionError>`
- **Wire**: `DELETE /stores/{storeId}/subscriptions/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.CancelSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.CancelSubscriptionRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### createSubscription

- **Signature**: `createSubscription(request?: Subscriptions.CreateSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, ApiError>`
- **Wire**: `POST /subscriptions`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `Subscription`
- **Error**: `UnivapayPublicApiError` with `kind: "api"` — untyped, `payload.kind` always `"undeclared"`

**Fields** — `Subscriptions.CreateSubscriptionRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionCreateRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionCreateRequest` | `subscriptionCreateRequestSchema` | `src/models/subscription-create-request.ts` |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |

### getSubscription

- **Signature**: `getSubscription(request: Subscriptions.GetSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.GetSubscriptionError>`
- **Wire**: `GET /stores/{storeId}/subscriptions/{id}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Subscription`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.GetSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.GetSubscriptionRequest` (3):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `id` | `path` | `string` | yes |
| `polling` | `query` | `boolean` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getSubscriptionLatestCharge

- **Signature**: `getSubscriptionLatestCharge(request: Subscriptions.GetSubscriptionLatestChargeRequest, options?: RequestOptions): ApiPromise<Charge, Subscriptions.GetSubscriptionLatestChargeError>`
- **Wire**: `GET /stores/{storeId}/subscriptions/{subscriptionId}/charges/latest`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Charge`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.GetSubscriptionLatestChargeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.GetSubscriptionLatestChargeRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `subscriptionId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Charge` | `chargeSchema` | `src/models/charge.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### getSubscriptionPayment

- **Signature**: `getSubscriptionPayment(request: Subscriptions.GetSubscriptionPaymentRequest, options?: RequestOptions): ApiPromise<SubscriptionPayment, Subscriptions.GetSubscriptionPaymentError>`
- **Wire**: `GET /stores/{storeId}/subscriptions/{subscriptionId}/payments/{paymentId}`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SubscriptionPayment`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.GetSubscriptionPaymentError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.GetSubscriptionPaymentRequest` (3):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `storeId` | `path` | `string` | yes |
| `subscriptionId` | `path` | `string` | yes |
| `paymentId` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionPayment` | `subscriptionPaymentSchema` | `src/models/subscription-payment.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listAllSubscriptions

- **Signature**: `listAllSubscriptions(request?: Subscriptions.ListAllSubscriptionsRequest, options?: RequestOptions): ApiPromise<SubscriptionList, ApiError>`
- **Wire**: `GET /subscriptions`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SubscriptionList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"` — untyped, `payload.kind` always `"undeclared"`

**Fields** — `Subscriptions.ListAllSubscriptionsRequest` (6):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `search` | `query` | — | `string` | no | — |
| `status` | `query` | — | `SubscriptionStatus` | no | — |
| `mode` | `query` | — | `ChargeMode` | no | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionStatus` | `subscriptionStatusSchema` | `src/models/subscription-status.ts` |
| `ChargeMode` | `chargeModeSchema` | `src/models/charge-mode.ts` |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `SubscriptionList` | `subscriptionListSchema` | `src/models/subscription-list.ts` |

### listChargesForSubscriptionPayment

- **Signature**: `listChargesForSubscriptionPayment(request: Subscriptions.ListChargesForSubscriptionPaymentRequest, options?: RequestOptions): ApiPromise<ChargeList, Subscriptions.ListChargesForSubscriptionPaymentError>`
- **Wire**: `GET /stores/{storeId}/subscriptions/{subscriptionId}/payments/{paymentId}/charges`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ChargeList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.ListChargesForSubscriptionPaymentError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ListChargesForSubscriptionPaymentRequest` (6):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `subscriptionId` | `path` | — | `string` | yes | — |
| `paymentId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `ChargeList` | `chargeListSchema` | `src/models/charge-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listStoreSubscriptions

- **Signature**: `listStoreSubscriptions(request: Subscriptions.ListStoreSubscriptionsRequest, options?: RequestOptions): ApiPromise<SubscriptionList, ApiError>`
- **Wire**: `GET /stores/{storeId}/subscriptions`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SubscriptionList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"` — untyped, `payload.kind` always `"undeclared"`

**Fields** — `Subscriptions.ListStoreSubscriptionsRequest` (7):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `search` | `query` | — | `string` | no | — |
| `status` | `query` | — | `SubscriptionStatus` | no | — |
| `mode` | `query` | — | `ChargeMode` | no | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionStatus` | `subscriptionStatusSchema` | `src/models/subscription-status.ts` |
| `ChargeMode` | `chargeModeSchema` | `src/models/charge-mode.ts` |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `SubscriptionList` | `subscriptionListSchema` | `src/models/subscription-list.ts` |

### listSubscriptionCharges

- **Signature**: `listSubscriptionCharges(request: Subscriptions.ListSubscriptionChargesRequest, options?: RequestOptions): ApiPromise<ChargeList, Subscriptions.ListSubscriptionChargesError>`
- **Wire**: `GET /merchants/{merchantId}/stores/{storeId}/subscriptions/{subscriptionId}/charges`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ChargeList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.ListSubscriptionChargesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ListSubscriptionChargesRequest` (6):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | `path` | — | `string` | yes | — |
| `storeId` | `path` | — | `string` | yes | — |
| `subscriptionId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `ChargeList` | `chargeListSchema` | `src/models/charge-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### listSubscriptionPayments

- **Signature**: `listSubscriptionPayments(request: Subscriptions.ListSubscriptionPaymentsRequest, options?: RequestOptions): ApiPromise<SubscriptionPaymentList, Subscriptions.ListSubscriptionPaymentsError>`
- **Wire**: `GET /stores/{storeId}/subscriptions/{subscriptionId}/payments`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SubscriptionPaymentList`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.ListSubscriptionPaymentsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ListSubscriptionPaymentsRequest` (5):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes | — |
| `subscriptionId` | `path` | — | `string` | yes | — |
| `limit` | `query` | — | `number` | no | `10` |
| `cursor` | `query` | — | `string` | no | — |
| `cursorDirection` | `query` | `cursor_direction` | `CursorDirectionQuery` | no | `CursorDirectionQuery.Desc` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CursorDirectionQuery` | `cursorDirectionQuerySchema` | `src/models/cursor-direction-query.ts` |
| `SubscriptionPaymentList` | `subscriptionPaymentListSchema` | `src/models/subscription-payment-list.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### simulateStoreSubscriptionPlan

- **Signature**: `simulateStoreSubscriptionPlan(request: Subscriptions.SimulateStoreSubscriptionPlanRequest, options?: RequestOptions): ApiPromise<SubscriptionSimulationPayment[], Subscriptions.SimulateStoreSubscriptionPlanError>`
- **Wire**: `POST /stores/{storeId}/subscriptions/simulate_plan`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `SubscriptionSimulationPayment[]` — a bare `application/json` array; the success type *is* the array, not a wrapper model
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.SimulateStoreSubscriptionPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.SimulateStoreSubscriptionPlanRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionSimulationRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionSimulationRequest` | `subscriptionSimulationRequestSchema` | `src/models/subscription-simulation-request.ts` |
| `SubscriptionSimulationPayment` | `subscriptionSimulationPaymentSchema` | `src/models/subscription-simulation-payment.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### simulateSubscriptionPlan

- **Signature**: `simulateSubscriptionPlan(request?: Subscriptions.SimulateSubscriptionPlanRequest, options?: RequestOptions): ApiPromise<SubscriptionSimulationPayment[], Subscriptions.SimulateSubscriptionPlanError>`
- **Wire**: `POST /subscriptions/simulate_plan`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `SubscriptionSimulationPayment[]` — a bare `application/json` array; the success type *is* the array, not a wrapper model
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.SimulateSubscriptionPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.SimulateSubscriptionPlanRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionSimulationRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionSimulationRequest` | `subscriptionSimulationRequestSchema` | `src/models/subscription-simulation-request.ts` |
| `SubscriptionSimulationPayment` | `subscriptionSimulationPaymentSchema` | `src/models/subscription-simulation-payment.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### suspendSubscription

- **Signature**: `suspendSubscription(request: Subscriptions.SuspendSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.SuspendSubscriptionError>`
- **Wire**: `PATCH /stores/{storeId}/subscriptions/{subscriptionId}/suspend`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `Subscription`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.SuspendSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.SuspendSubscriptionRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `subscriptionId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionSuspendRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionSuspendRequest` | `subscriptionSuspendRequestSchema` | `src/models/subscription-suspend-request.ts` |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### unsuspendSubscription

- **Signature**: `unsuspendSubscription(request: Subscriptions.UnsuspendSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.UnsuspendSubscriptionError>`
- **Wire**: `PATCH /stores/{storeId}/subscriptions/{subscriptionId}/unsuspend`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Subscription`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.UnsuspendSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.UnsuspendSubscriptionRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `subscriptionId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateSubscription

- **Signature**: `updateSubscription(request: Subscriptions.UpdateSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.UpdateSubscriptionError>`
- **Wire**: `PATCH /stores/{storeId}/subscriptions/{id}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `Subscription`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.UpdateSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.UpdateSubscriptionRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `id` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionUpdateRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionUpdateRequest` | `subscriptionUpdateRequestSchema` | `src/models/subscription-update-request.ts` |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateSubscriptionPayment

- **Signature**: `updateSubscriptionPayment(request: Subscriptions.UpdateSubscriptionPaymentRequest, options?: RequestOptions): ApiPromise<SubscriptionPayment, Subscriptions.UpdateSubscriptionPaymentError>`
- **Wire**: `PATCH /stores/{storeId}/subscriptions/{subscriptionId}/payments/{paymentId}`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `SubscriptionPayment`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.UpdateSubscriptionPaymentError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.UpdateSubscriptionPaymentRequest` (5):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `subscriptionId` | `path` | — | `string` | yes |
| `paymentId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionPatchPaymentRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionPatchPaymentRequest` | `subscriptionPatchPaymentRequestSchema` | `src/models/subscription-patch-payment-request.ts` |
| `SubscriptionPayment` | `subscriptionPaymentSchema` | `src/models/subscription-payment.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

### updateSubscriptionToken

- **Signature**: `updateSubscriptionToken(request: Subscriptions.UpdateSubscriptionTokenRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.UpdateSubscriptionTokenError>`
- **Wire**: `PATCH /stores/{storeId}/subscriptions/{subscriptionId}/token`
- **Auth**: `jwtToken`
- **Request body**: `application/json` — the `body` field
- **Returns**: `Subscription`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Subscriptions.UpdateSubscriptionTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [400] `ApiErrorModel` · `"apiErrorModel2"` [401] `ApiErrorModel` · `"apiErrorModel3"` [403] `ApiErrorModel` · `"apiErrorModel4"` [404] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.UpdateSubscriptionTokenRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `storeId` | `path` | — | `string` | yes |
| `subscriptionId` | `path` | — | `string` | yes |
| `idempotencyKey` | `header` | `Idempotency-Key` | `string` | no |
| `body` | `body` | — | `SubscriptionPatchTokenRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionPatchTokenRequest` | `subscriptionPatchTokenRequestSchema` | `src/models/subscription-patch-token-request.ts` |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

