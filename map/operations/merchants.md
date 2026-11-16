<!-- Generated file — do not edit; regenerated with the SDK. -->

# Merchants — operations

Accessor: `client.merchants` · Source: `src/resources/merchants.ts` · 1 operation · Request and error types: namespace `Merchants`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `univapay-public-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### getCurrentMerchant

- **Signature**: `getCurrentMerchant(options?: RequestOptions): ApiPromise<Merchant, Merchants.GetCurrentMerchantError>`
- **Wire**: `GET /me`
- **Auth**: `jwtToken`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Merchant`
- **Error**: `UnivapayPublicApiError` with `kind: "api"`, an instance of `Merchants.GetCurrentMerchantError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"apiErrorModel"` [401] `ApiErrorModel` · `"apiErrorModel2"` [403] `ApiErrorModel` · `"error429"` [429] `Record<string, unknown>` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `Merchant` | `merchantSchema` | `src/models/merchant.ts` |
| `ApiErrorModel` | `apiErrorModelSchema` | `src/models/api-error-model.ts` |

