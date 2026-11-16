<!-- Generated file — do not edit; regenerated with the SDK. -->

# Checkout — operations

Accessor: `client.checkout` · Source: `src/resources/checkout.ts` · 1 operation · Request and error types: namespace `Checkout`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### getCheckoutInfo

- **Signature**: `getCheckoutInfo(options?: RequestOptions): ApiPromise<CheckoutInfo, Checkout.GetCheckoutInfoError>`
- **Wire**: `GET /checkout_info`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `CheckoutInfo`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Checkout.GetCheckoutInfoError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `CheckoutInfo` | `checkoutInfoSchema` | `src/models/checkout-info.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

