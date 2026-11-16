# Reference

> Source: [UnivapayPublicApiClient](src/client.ts)

## Charges

> Source: [Charges](src/resources/charges.ts)

<details>
<summary><code>captureCharge(request: Charges.CaptureChargeRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Charges.CaptureChargeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

以前にオーソリ（保留）された課金（作成時に `capture` が false に設定されていたもの）をキャプチャして売上を確定させます。キャプチャ金額はオーソリ金額以下である必要があり、通貨も一致する必要があります。リクエストボディ（およびその両方のフィールド）は任意です。完全に省略した場合、オーソリ済みの未決済全額（元のリクエスト通貨で）がキャプチャされます。部分キャプチャ（オーソリ金額より少ない金額のキャプチャ）は、有効化されている場合にのみ利用できます。有効化されていない場合、リクエストは `amount` フィールドに対する `PARTIAL_CAPTURE_NOT_ALLOWED` で拒否されます。銀行振込の課金では常に利用できます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.captureCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1000, currency: "JPY" },
  });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Charges.CaptureChargeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .captureCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1000, currency: "JPY" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[ChargeCaptureRequest](src/models/charge-capture-request.ts)</code> | オーソリ済み課金のキャプチャ用の任意のリクエスト・ペイロード。オーソリ済みの未決済全額をキャプチャするには、完全に省略してください。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.captureCharge(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Charges.CaptureChargeError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.captureCharge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Charges.CaptureChargeError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createCharge(request?: Charges.CreateChargeRequest, options?: RequestOptions): ApiPromise&lt;Charge, Charges.CreateChargeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

決済手段（例：トランザクション・トークン）に対して課金を作成します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.createCharge({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      transactionTokenId: "11ef32a7-3a71-8662-803f-1bc27702eeec",
      amount: 1000,
      currency: "JPY",
      metadata: { orderId: "12345" },
      redirect: { endpoint: "https://test.url/" },
    },
  });
  // TODO: Handle 'response' of type Charge
} catch (err) {
  // TODO: Handle 'err' of type Charges.CreateChargeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .createCharge({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      transactionTokenId: "11ef32a7-3a71-8662-803f-1bc27702eeec",
      amount: 1000,
      currency: "JPY",
      metadata: { orderId: "12345" },
      redirect: { endpoint: "https://test.url/" },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Charge
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[ChargeCreateRequest](src/models/charge-create-request.ts)</code> | 課金作成用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.createCharge(request)`

- **OnSuccess**: <code>[Charge](src/models/charge.ts)</code>
- **OnError**: throws <code>[Charges.CreateChargeError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.createCharge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Charge, Charges.CreateChargeError&gt;</code>, with `result.value` of type <code>[Charge](src/models/charge.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createCustomsDeclaration(request: Charges.CreateCustomsDeclarationRequest, options?: RequestOptions): ApiPromise&lt;CustomsDeclarationWebhookData, Charges.CreateCustomsDeclarationError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

成功した課金に対して税関申告を作成します。バックエンドは、WeChat Online および WeChat MPM の課金に対してのみこのリクエストを受け付けます。申告がすでに存在し、かつ処理中（pending）でない場合、バックエンドは新しいレコードを作成するのではなく、その識別情報フィールドを更新して処理を再開します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.createCustomsDeclaration({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      customs: "TOKYO",
      merchantCustomsNo: "1234567890",
      certificateId: "AB1234567",
      certificateName: "TARO YAMADA",
    },
  });
  // TODO: Handle 'response' of type CustomsDeclarationWebhookData
} catch (err) {
  // TODO: Handle 'err' of type Charges.CreateCustomsDeclarationError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .createCustomsDeclaration({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      customs: "TOKYO",
      merchantCustomsNo: "1234567890",
      certificateId: "AB1234567",
      certificateName: "TARO YAMADA",
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type CustomsDeclarationWebhookData
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[CustomsDeclarationCreateRequest](src/models/customs-declaration-create-request.ts)</code> | 税関申告作成用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.createCustomsDeclaration(request)`

- **OnSuccess**: <code>[CustomsDeclarationWebhookData](src/models/customs-declaration-webhook-data.ts)</code>
- **OnError**: throws <code>[Charges.CreateCustomsDeclarationError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.createCustomsDeclaration(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;CustomsDeclarationWebhookData, Charges.CreateCustomsDeclarationError&gt;</code>, with `result.value` of type <code>[CustomsDeclarationWebhookData](src/models/customs-declaration-webhook-data.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getCharge(request: Charges.GetChargeRequest, options?: RequestOptions): ApiPromise&lt;Charge, Charges.GetChargeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存の課金の詳細を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.getCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: true,
  });
  // TODO: Handle 'response' of type Charge
} catch (err) {
  // TODO: Handle 'err' of type Charges.GetChargeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .getCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: true,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Charge
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>polling?</code> | <code>boolean</code> | true に設定すると、課金ステータスが初期ステータスの 'pending' から別のステータスに変わるまで、API が内部でステータスをポーリングし続けるよう指示します。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.getCharge(request)`

- **OnSuccess**: <code>[Charge](src/models/charge.ts)</code>
- **OnError**: throws <code>[Charges.GetChargeError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.getCharge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Charge, Charges.GetChargeError&gt;</code>, with `result.value` of type <code>[Charge](src/models/charge.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getChargeIssuerToken(request: Charges.GetChargeIssuerTokenRequest, options?: RequestOptions): ApiPromise&lt;IssuerToken, Charges.GetChargeIssuerTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

決済の実行に必要な URL（オンライン決済の場合）または銀行口座の詳細（銀行振込の場合）を取得します。**⚠️ 前提条件:** イシュアートークンを要求する前に、課金の `status` が `awaiting` になっている必要があります。課金が他のステータスにあるときに要求された場合、エラーが返されます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.getChargeIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type IssuerToken
} catch (err) {
  // TODO: Handle 'err' of type Charges.GetChargeIssuerTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .getChargeIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type IssuerToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.getChargeIssuerToken(request)`

- **OnSuccess**: <code>[IssuerToken](src/models/issuer-token.ts)</code>
- **OnError**: throws <code>[Charges.GetChargeIssuerTokenError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.getChargeIssuerToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;IssuerToken, Charges.GetChargeIssuerTokenError&gt;</code>, with `result.value` of type <code>[IssuerToken](src/models/issuer-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getChargeThreeDsIssuerToken(request: Charges.GetChargeThreeDsIssuerTokenRequest, options?: RequestOptions): ApiPromise&lt;ThreeDsIssuerToken, Charges.GetChargeThreeDsIssuerTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

カード課金を認証するために必要な3Dセキュアイシュアートークンの詳細を取得します。**⚠️ 前提条件:** 1. 課金作成時に `three_ds.mode` が `normal` または `force` に設定されている必要があります。 2. このリクエストを行う前に、課金をポーリングし、その `status` が `awaiting` になるまで待つ必要があります。**実行フロー:** 取得後、クライアント（ブラウザ）は `issuer_token` の URL に対して `http_post` リクエストを実行する必要があります。返された `payload` オブジェクトを `content_type` に合わせて（例：URL エンコード形式に）フォーマットし、ボディに含めて送信します。これはリダイレクトを介して、または iframe 内で実行できます。iframe を使用する場合は、ステータスが `successful`、`failed`、または `error` のいずれかの最終状態に達するまで、バックグラウンドで課金ステータスのポーリングを継続してください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.getChargeThreeDsIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type ThreeDsIssuerToken
} catch (err) {
  // TODO: Handle 'err' of type Charges.GetChargeThreeDsIssuerTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .getChargeThreeDsIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ThreeDsIssuerToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.getChargeThreeDsIssuerToken(request)`

- **OnSuccess**: <code>[ThreeDsIssuerToken](src/models/three-ds-issuer-token.ts)</code>
- **OnError**: throws <code>[Charges.GetChargeThreeDsIssuerTokenError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.getChargeThreeDsIssuerToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ThreeDsIssuerToken, Charges.GetChargeThreeDsIssuerTokenError&gt;</code>, with `result.value` of type <code>[ThreeDsIssuerToken](src/models/three-ds-issuer-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getCustomsDeclaration(request: Charges.GetCustomsDeclarationRequest, options?: RequestOptions): ApiPromise&lt;CustomsDeclarationWebhookData, Charges.GetCustomsDeclarationError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

課金に対する税関申告情報を取得します。`polling=true` の場合にロングポーリングをサポートし、申告が現在のステータスから抜けるか、ポーリングのタイムアウトに達した時点で応答を返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.getCustomsDeclaration({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "11ef0000-0000-4000-8000-000000000040",
    polling: false,
  });
  // TODO: Handle 'response' of type CustomsDeclarationWebhookData
} catch (err) {
  // TODO: Handle 'err' of type Charges.GetCustomsDeclarationError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .getCustomsDeclaration({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "11ef0000-0000-4000-8000-000000000040",
    polling: false,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type CustomsDeclarationWebhookData
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>id</code> | <code>string</code> | 税関申告の一意の識別子。 |
| <code>polling?</code> | <code>boolean</code> | ステータスの変更を待つ間、リクエストの接続を開いたまま保持します。<br>**Default**: false |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.getCustomsDeclaration(request)`

- **OnSuccess**: <code>[CustomsDeclarationWebhookData](src/models/customs-declaration-webhook-data.ts)</code>
- **OnError**: throws <code>[Charges.GetCustomsDeclarationError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.getCustomsDeclaration(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;CustomsDeclarationWebhookData, Charges.GetCustomsDeclarationError&gt;</code>, with `result.value` of type <code>[CustomsDeclarationWebhookData](src/models/customs-declaration-webhook-data.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listAllCharges(request?: Charges.ListAllChargesRequest, options?: RequestOptions): ApiPromise&lt;ChargeList, Charges.ListAllChargesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

認証されたユーザーのすべての店舗にわたるすべての課金の一覧を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.listAllCharges({
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    lastFour: "4242",
    name: "TARO YAMADA",
    expMonth: 12,
    expYear: 2026,
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999000Z",
    email: "user@example.com",
    phone: "+8108012341234",
    amountFrom: 1000,
    amountTo: 5000,
    currency: "JPY",
    mode: ModeQuery.Live,
    metadata: "order_id: 12345",
    transactionTokenId: "f33b673e-564c-4645-ae17-ca03846a86b7",
  });
  // TODO: Handle 'response' of type ChargeList
} catch (err) {
  // TODO: Handle 'err' of type Charges.ListAllChargesError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .listAllCharges({
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    lastFour: "4242",
    name: "TARO YAMADA",
    expMonth: 12,
    expYear: 2026,
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999000Z",
    email: "user@example.com",
    phone: "+8108012341234",
    amountFrom: 1000,
    amountTo: 5000,
    currency: "JPY",
    mode: ModeQuery.Live,
    metadata: "order_id: 12345",
    transactionTokenId: "f33b673e-564c-4645-ae17-ca03846a86b7",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ChargeList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>lastFour?</code> | <code>string</code> | カードの下4桁でフィルタリングします。**注意:** 指定する場合、`name`、`exp_month`、`exp_year` も含める必要があります。 |
| <code>name?</code> | <code>string</code> | カード名義人でフィルタリングします。**注意:** 指定する場合、`last_four`、`exp_month`、`exp_year` も含める必要があります。 |
| <code>expMonth?</code> | <code>number</code> | 有効期限（月）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_year` も含める必要があります。 |
| <code>expYear?</code> | <code>number</code> | 有効期限（年）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_month` も含める必要があります。 |
| <code>from?</code> | <code>string</code> | この日付（ISO-8601 形式）以降に作成された課金を表示します。 |
| <code>to?</code> | <code>string</code> | この日付（ISO-8601 形式）より前に作成された課金を表示します。 |
| <code>email?</code> | <code>string</code> | メールアドレスでフィルタリングします。 |
| <code>phone?</code> | <code>string</code> | 電話番号でフィルタリングします。 |
| <code>amountFrom?</code> | <code>number</code> | 金額がこの値以上の課金を表示します。 |
| <code>amountTo?</code> | <code>number</code> | 金額がこの値未満の課金を表示します。 |
| <code>currency?</code> | <code>string</code> | 通貨（ISO-4217 形式）でフィルタリングします。 |
| <code>mode?</code> | <code>[ModeQuery](src/models/mode-query.ts)</code> | 環境モード（本番/テスト）でフィルタリングします。 |
| <code>metadata?</code> | <code>string</code> | メタデータでフィルタリングします。 |
| <code>transactionTokenId?</code> | <code>string</code> | トランザクション・トークン ID でフィルタリングします。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.listAllCharges(request)`

- **OnSuccess**: <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: throws <code>[Charges.ListAllChargesError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.listAllCharges(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ChargeList, Charges.ListAllChargesError&gt;</code>, with `result.value` of type <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listBankTransferLedgers(request: Charges.ListBankTransferLedgersRequest, options?: RequestOptions): ApiPromise&lt;BankTransferLedgerList, Charges.ListBankTransferLedgersError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

課金に関連付けられた銀行振込台帳エントリを取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.listBankTransferLedgers({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type BankTransferLedgerList
} catch (err) {
  // TODO: Handle 'err' of type Charges.ListBankTransferLedgersError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .listBankTransferLedgers({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type BankTransferLedgerList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.listBankTransferLedgers(request)`

- **OnSuccess**: <code>[BankTransferLedgerList](src/models/bank-transfer-ledger-list.ts)</code>
- **OnError**: throws <code>[Charges.ListBankTransferLedgersError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.listBankTransferLedgers(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;BankTransferLedgerList, Charges.ListBankTransferLedgersError&gt;</code>, with `result.value` of type <code>[BankTransferLedgerList](src/models/bank-transfer-ledger-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listStoreCharges(request: Charges.ListStoreChargesRequest, options?: RequestOptions): ApiPromise&lt;ChargeList, Charges.ListStoreChargesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の店舗のすべての課金の一覧を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.listStoreCharges({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    lastFour: "4242",
    name: "TARO YAMADA",
    expMonth: 12,
    expYear: 2026,
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999000Z",
    email: "user@example.com",
    phone: "+8108012341234",
    amountFrom: 1000,
    amountTo: 5000,
    currency: "JPY",
    mode: ModeQuery.Live,
    metadata: "order_id: 12345",
    transactionTokenId: "f33b673e-564c-4645-ae17-ca03846a86b7",
  });
  // TODO: Handle 'response' of type ChargeList
} catch (err) {
  // TODO: Handle 'err' of type Charges.ListStoreChargesError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .listStoreCharges({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    lastFour: "4242",
    name: "TARO YAMADA",
    expMonth: 12,
    expYear: 2026,
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999000Z",
    email: "user@example.com",
    phone: "+8108012341234",
    amountFrom: 1000,
    amountTo: 5000,
    currency: "JPY",
    mode: ModeQuery.Live,
    metadata: "order_id: 12345",
    transactionTokenId: "f33b673e-564c-4645-ae17-ca03846a86b7",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ChargeList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>lastFour?</code> | <code>string</code> | カードの下4桁でフィルタリングします。**注意:** 指定する場合、`name`、`exp_month`、`exp_year` も含める必要があります。 |
| <code>name?</code> | <code>string</code> | カード名義人でフィルタリングします。**注意:** 指定する場合、`last_four`、`exp_month`、`exp_year` も含める必要があります。 |
| <code>expMonth?</code> | <code>number</code> | 有効期限（月）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_year` も含める必要があります。 |
| <code>expYear?</code> | <code>number</code> | 有効期限（年）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_month` も含める必要があります。 |
| <code>from?</code> | <code>string</code> | この日付（ISO-8601 形式）以降に作成された課金を表示します。 |
| <code>to?</code> | <code>string</code> | この日付（ISO-8601 形式）より前に作成された課金を表示します。 |
| <code>email?</code> | <code>string</code> | メールアドレスでフィルタリングします。 |
| <code>phone?</code> | <code>string</code> | 電話番号でフィルタリングします。 |
| <code>amountFrom?</code> | <code>number</code> | 金額がこの値以上の課金を表示します。 |
| <code>amountTo?</code> | <code>number</code> | 金額がこの値未満の課金を表示します。 |
| <code>currency?</code> | <code>string</code> | 通貨（ISO-4217 形式）でフィルタリングします。 |
| <code>mode?</code> | <code>[ModeQuery](src/models/mode-query.ts)</code> | 環境モード（本番/テスト）でフィルタリングします。 |
| <code>metadata?</code> | <code>string</code> | メタデータでフィルタリングします。 |
| <code>transactionTokenId?</code> | <code>string</code> | トランザクション・トークン ID でフィルタリングします。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.listStoreCharges(request)`

- **OnSuccess**: <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: throws <code>[Charges.ListStoreChargesError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.listStoreCharges(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ChargeList, Charges.ListStoreChargesError&gt;</code>, with `result.value` of type <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>patchCustomsDeclaration(request: Charges.PatchCustomsDeclarationRequest, options?: RequestOptions): ApiPromise&lt;CustomsDeclarationWebhookData, Charges.PatchCustomsDeclarationError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

税関申告を更新し、処理を再キューイング（再実行待ちに）します。バックエンドのパッチ処理では元の `customs`、`certificate_id`、`certificate_name` の値が保持され、新しい `merchant_customs_no` のみを受け付けます。処理中（pending）の申告はパッチ更新できません。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.patchCustomsDeclaration({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "11ef0000-0000-4000-8000-000000000040",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { merchantCustomsNo: "1234567891" },
  });
  // TODO: Handle 'response' of type CustomsDeclarationWebhookData
} catch (err) {
  // TODO: Handle 'err' of type Charges.PatchCustomsDeclarationError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .patchCustomsDeclaration({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "11ef0000-0000-4000-8000-000000000040",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { merchantCustomsNo: "1234567891" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type CustomsDeclarationWebhookData
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>id</code> | <code>string</code> | 税関申告の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[CustomsDeclarationPatchRequest](src/models/customs-declaration-patch-request.ts)</code> | 税関申告パッチ用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.patchCustomsDeclaration(request)`

- **OnSuccess**: <code>[CustomsDeclarationWebhookData](src/models/customs-declaration-webhook-data.ts)</code>
- **OnError**: throws <code>[Charges.PatchCustomsDeclarationError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.patchCustomsDeclaration(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;CustomsDeclarationWebhookData, Charges.PatchCustomsDeclarationError&gt;</code>, with `result.value` of type <code>[CustomsDeclarationWebhookData](src/models/customs-declaration-webhook-data.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateCharge(request: Charges.UpdateChargeRequest, options?: RequestOptions): ApiPromise&lt;Charge, Charges.UpdateChargeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存の課金に対して、任意のメタデータを追加または変更するためにこのリクエストを使用します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.charges.updateCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "1234" } },
  });
  // TODO: Handle 'response' of type Charge
} catch (err) {
  // TODO: Handle 'err' of type Charges.UpdateChargeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.charges
  .updateCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "1234" } },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Charge
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[ChargeUpdateRequest](src/models/charge-update-request.ts)</code> | 課金メタデータ更新用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.charges.updateCharge(request)`

- **OnSuccess**: <code>[Charge](src/models/charge.ts)</code>
- **OnError**: throws <code>[Charges.UpdateChargeError](src/resources/charges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.charges.updateCharge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Charge, Charges.UpdateChargeError&gt;</code>, with `result.value` of type <code>[Charge](src/models/charge.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## TransactionTokens

> Source: [TransactionTokens](src/resources/transaction-tokens.ts)

<details>
<summary><code>createTransactionToken(request: TransactionTokens.CreateTransactionTokenRequest, options?: RequestOptions): ApiPromise&lt;TransactionToken, TransactionTokens.CreateTransactionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

生の決済データを安全なトークンと交換します。生のカード番号を送信する場合は、**PCI DSS への準拠が必須**です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.createTransactionToken({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      paymentType: TransactionTokenCreateRequestPaymentType.Card,
      type: TransactionTokenCreateRequestType.Recurring,
      email: "test@univapay.com",
      metadata: { univapayPhoneNumber: "+81 08012341234" },
      data: {
        cardholder: "TEST TEST",
        cardNumber: "4242424242424242",
        expMonth: "09",
        expYear: "26",
        cvv: "123",
        phoneNumber: { countryCode: "81", localNumber: "08012341234" },
        cvvAuthorize: { enabled: false, currency: "JPY" },
        threeDs: { redirectEndpoint: "https://univapay.com/redirect/index.html" },
      },
    },
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.CreateTransactionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .createTransactionToken({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      paymentType: TransactionTokenCreateRequestPaymentType.Card,
      type: TransactionTokenCreateRequestType.Recurring,
      email: "test@univapay.com",
      metadata: { univapayPhoneNumber: "+81 08012341234" },
      data: {
        cardholder: "TEST TEST",
        cardNumber: "4242424242424242",
        expMonth: "09",
        expYear: "26",
        cvv: "123",
        phoneNumber: { countryCode: "81", localNumber: "08012341234" },
        cvvAuthorize: { enabled: false, currency: "JPY" },
        threeDs: { redirectEndpoint: "https://univapay.com/redirect/index.html" },
      },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[TransactionTokenCreateRequest](src/models/transaction-token-create-request.ts)</code> | トランザクション・トークン作成用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.createTransactionToken(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[TransactionTokens.CreateTransactionTokenError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.createTransactionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, TransactionTokens.CreateTransactionTokenError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deleteTransactionToken(request: TransactionTokens.DeleteTransactionTokenRequest, options?: RequestOptions): ApiPromise&lt;undefined, TransactionTokens.DeleteTransactionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定のトランザクション・トークンを削除します。⚠️ **警告: リンクされている定期課金への影響** トランザクション・トークンを削除すると、そのトークンにリンクされている継続課金や定期課金の処理が即座に行えなくなります。十分にご注意の上、実行してください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.transactionTokens.deleteTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.DeleteTransactionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .deleteTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.deleteTransactionToken(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[TransactionTokens.DeleteTransactionTokenError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.deleteTransactionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, TransactionTokens.DeleteTransactionTokenError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>disableTokenThreeDs(request: TransactionTokens.DisableTokenThreeDsRequest, options?: RequestOptions): ApiPromise&lt;TransactionToken, TransactionTokens.DisableTokenThreeDsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存の継続（recurring）トランザクション・トークンに対して3Dセキュアを無効化します。`recurring` トークンにのみ適用されます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.disableTokenThreeDs({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.DisableTokenThreeDsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .disableTokenThreeDs({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.disableTokenThreeDs(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[TransactionTokens.DisableTokenThreeDsError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.disableTokenThreeDs(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, TransactionTokens.DisableTokenThreeDsError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>enableTokenThreeDs(request: TransactionTokens.EnableTokenThreeDsRequestParams, options?: RequestOptions): ApiPromise&lt;TransactionToken, TransactionTokens.EnableTokenThreeDsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

3DS なしで作成された既存の継続（recurring）トランザクション・トークンに対して3Dセキュアを有効化します。`recurring` トークンにのみ適用され、すでに 3DS が有効な場合はエラーを返します。このエンドポイントを呼び出した後、トークンをポーリングして `data.three_ds.status` が `awaiting` になるのを待ち、トークン 3DS イシュアートークンエンドポイントを使用して認証を完了してください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.enableTokenThreeDs({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { redirectEndpoint: "https://univapay.com/3ds-redirect" },
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.EnableTokenThreeDsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .enableTokenThreeDs({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { redirectEndpoint: "https://univapay.com/3ds-redirect" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[EnableTokenThreeDsRequest](src/models/enable-token-three-ds-request.ts)</code> | 任意のリクエスト・ペイロード。リダイレクトが不要な場合は、本文全体、または `redirect_endpoint` を省略してください。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.enableTokenThreeDs(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[TransactionTokens.EnableTokenThreeDsError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.enableTokenThreeDs(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, TransactionTokens.EnableTokenThreeDsError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getTokenThreeDsIssuerToken(request: TransactionTokens.GetTokenThreeDsIssuerTokenRequest, options?: RequestOptions): ApiPromise&lt;ThreeDsIssuerToken, TransactionTokens.GetTokenThreeDsIssuerTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

継続（recurring）用のトランザクション・トークンを作成する際に、3Dセキュア認証を実行するために必要な情報を取得します。**⚠️ 重要な注意点:** 1. **PCI DSS 準拠:** このエンドポイントは、API 経由で直接生のカードデータを送信してトークンを作成することを許可されている、PCI DSS に準拠した加盟店のみが利用できます。 2. **対象トークン:** これは `type` が `recurring`（継続用）のトークンにのみ適用されます。`one_time`（ワンタイム）や `subscription`（定期課金専用）のトークンについては、トークン作成時ではなく課金作成時に3Dセキュアがリクエストされます。 3. **実行フロー:** - トークンを作成した後、トークンオブジェクトをポーリングし、`data.three_ds.status` が `awaiting` になるまで待ちます。 - `awaiting` になったら、このエンドポイントを使用してイシュアートークンの詳細を取得します。 - 返された `payload` を `content_type` に合わせて（例：URL エンコード形式に）フォーマットし、消費者のブラウザから `issuer_token` の URL に対して `http_post` リクエストを実行します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.getTokenThreeDsIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type ThreeDsIssuerToken
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.GetTokenThreeDsIssuerTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .getTokenThreeDsIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ThreeDsIssuerToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.getTokenThreeDsIssuerToken(request)`

- **OnSuccess**: <code>[ThreeDsIssuerToken](src/models/three-ds-issuer-token.ts)</code>
- **OnError**: throws <code>[TransactionTokens.GetTokenThreeDsIssuerTokenError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.getTokenThreeDsIssuerToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ThreeDsIssuerToken, TransactionTokens.GetTokenThreeDsIssuerTokenError&gt;</code>, with `result.value` of type <code>[ThreeDsIssuerToken](src/models/three-ds-issuer-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getTransactionToken(request: TransactionTokens.GetTransactionTokenRequest, options?: RequestOptions): ApiPromise&lt;TransactionToken, TransactionTokens.GetTransactionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存のトランザクション・トークンの詳細を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.getTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: true,
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.GetTransactionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .getTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: true,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>polling?</code> | <code>boolean</code> | true に設定すると、トークンの 3DS または CVV 認証のサブステータスが別のステータスに変わるか、サーバー側の約 3 秒のタイムアウトに達するまで、API が内部でポーリングを行うよう指示します。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.getTransactionToken(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[TransactionTokens.GetTransactionTokenError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.getTransactionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, TransactionTokens.GetTransactionTokenError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listAllTransactionTokens(request?: TransactionTokens.ListAllTransactionTokensRequest, options?: RequestOptions): ApiPromise&lt;TransactionTokenList, TransactionTokens.ListAllTransactionTokensError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

すべての店舗にわたるすべてのトランザクション・トークンの一覧を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.listAllTransactionTokens({
    search: "tokyo",
    customerId: "8a3f1b8e-2c1a-4b7a-9c2e-6f6b6f6e2b10",
    type: TransactionTokenListType.Recurring,
    mode: ModeQuery.Live,
    active: TransactionTokenActiveFilter.Active,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type TransactionTokenList
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.ListAllTransactionTokensError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .listAllTransactionTokens({
    search: "tokyo",
    customerId: "8a3f1b8e-2c1a-4b7a-9c2e-6f6b6f6e2b10",
    type: TransactionTokenListType.Recurring,
    mode: ModeQuery.Live,
    active: TransactionTokenActiveFilter.Active,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionTokenList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>search?</code> | <code>string</code> | 大文字と小文字を区別しないフリーテキスト検索。 |
| <code>customerId?</code> | <code>string</code> | 消費者 ID でフィルタリングします。 |
| <code>type?</code> | <code>[TransactionTokenListType](src/models/transaction-token-list-type.ts)</code> | トークンタイプでフィルタリングします。`one_time` トークンは一覧から除外されており、フィルタリング対象にはできません。`recurring` でフィルタリングするにはアプリケーション・トークンのシークレットが必要です。 |
| <code>mode?</code> | <code>[ModeQuery](src/models/mode-query.ts)</code> | 環境モード（本番/テスト）でフィルタリングします。 |
| <code>active?</code> | <code>[TransactionTokenActiveFilter](src/models/transaction-token-active-filter.ts)</code> | 継続（recurring）トークンをアクティブかどうかでフィルタリングします。<br>**Default**: "active" |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.listAllTransactionTokens(request)`

- **OnSuccess**: <code>[TransactionTokenList](src/models/transaction-token-list.ts)</code>
- **OnError**: throws <code>[TransactionTokens.ListAllTransactionTokensError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.listAllTransactionTokens(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionTokenList, TransactionTokens.ListAllTransactionTokensError&gt;</code>, with `result.value` of type <code>[TransactionTokenList](src/models/transaction-token-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listStoreTransactionTokens(request: TransactionTokens.ListStoreTransactionTokensRequest, options?: RequestOptions): ApiPromise&lt;TransactionTokenList, TransactionTokens.ListStoreTransactionTokensError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の店舗のすべてのトランザクション・トークンの一覧を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.listStoreTransactionTokens({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    search: "tokyo",
    customerId: "8a3f1b8e-2c1a-4b7a-9c2e-6f6b6f6e2b10",
    type: TransactionTokenListType.Recurring,
    mode: ModeQuery.Live,
    active: TransactionTokenActiveFilter.Active,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type TransactionTokenList
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.ListStoreTransactionTokensError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .listStoreTransactionTokens({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    search: "tokyo",
    customerId: "8a3f1b8e-2c1a-4b7a-9c2e-6f6b6f6e2b10",
    type: TransactionTokenListType.Recurring,
    mode: ModeQuery.Live,
    active: TransactionTokenActiveFilter.Active,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionTokenList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>search?</code> | <code>string</code> | 大文字と小文字を区別しないフリーテキスト検索。 |
| <code>customerId?</code> | <code>string</code> | 消費者 ID でフィルタリングします。 |
| <code>type?</code> | <code>[TransactionTokenListType](src/models/transaction-token-list-type.ts)</code> | トークンタイプでフィルタリングします。`one_time` トークンは一覧から除外されており、フィルタリング対象にはできません。`recurring` でフィルタリングするにはアプリケーション・トークンのシークレットが必要です。 |
| <code>mode?</code> | <code>[ModeQuery](src/models/mode-query.ts)</code> | 環境モード（本番/テスト）でフィルタリングします。 |
| <code>active?</code> | <code>[TransactionTokenActiveFilter](src/models/transaction-token-active-filter.ts)</code> | 継続（recurring）トークンをアクティブかどうかでフィルタリングします。<br>**Default**: "active" |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.listStoreTransactionTokens(request)`

- **OnSuccess**: <code>[TransactionTokenList](src/models/transaction-token-list.ts)</code>
- **OnError**: throws <code>[TransactionTokens.ListStoreTransactionTokensError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.listStoreTransactionTokens(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionTokenList, TransactionTokens.ListStoreTransactionTokensError&gt;</code>, with `result.value` of type <code>[TransactionTokenList](src/models/transaction-token-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateTransactionToken(request: TransactionTokens.UpdateTransactionTokenRequest, options?: RequestOptions): ApiPromise&lt;TransactionToken, TransactionTokens.UpdateTransactionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

⚠️ **レガシー警告: 非推奨の操作** 技術的にはトランザクション・トークンを更新することは可能ですが、この運用は強く非推奨とされており、過去の互換性（レガシーな理由）のためだけに維持されています。**生のカード詳細を更新するには、サーバー環境が完全に PCI DSS に準拠している必要があります。****推奨されるアプローチ:** 既存のトークンを更新する代わりに、Univapay のフロントエンド統合機能（**リンクフォーム**、**ウィジェット**、または**インラインフォーム**）を使用して、完全に新しいトランザクション・トークンを作成するのがベストプラクティスです。これにより、お客様の決済データが貴社のサーバーを一切通過することなく、Univapay が安全に処理できます。--- **レガシーな使用方法:** CVV、住所、メールアドレス、またはカードの詳細を更新します。*注意: `RECURRING_USAGE_REQUIRES_CVV` エラーを解消するために CVV のみを更新する場合、アプリケーション・トークンのシークレットは不要です。*

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionTokens.updateTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      email: "test.update@test.com",
      data: {
        cvv: "123",
        cardholder: "TARO YAMADA",
        cardNumber: "4000020000000000",
        expMonth: 12,
        expYear: 2099,
        line1: "11111",
        line2: "222",
        state: "Tokyo",
        city: "テスト区一丁目",
        country: "JP",
        zip: "1234567",
        phoneNumber: { countryCode: "81", localNumber: "08000000000" },
      },
    },
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type TransactionTokens.UpdateTransactionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionTokens
  .updateTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      email: "test.update@test.com",
      data: {
        cvv: "123",
        cardholder: "TARO YAMADA",
        cardNumber: "4000020000000000",
        expMonth: 12,
        expYear: 2099,
        line1: "11111",
        line2: "222",
        state: "Tokyo",
        city: "テスト区一丁目",
        country: "JP",
        zip: "1234567",
        phoneNumber: { countryCode: "81", localNumber: "08000000000" },
      },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[TransactionTokenUpdateRequest](src/models/transaction-token-update-request.ts)</code> | トランザクション・トークン更新用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionTokens.updateTransactionToken(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[TransactionTokens.UpdateTransactionTokenError](src/resources/transaction-tokens.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionTokens.updateTransactionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, TransactionTokens.UpdateTransactionTokenError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## PciDssRequired

> Source: [PciDssRequired](src/resources/pci-dss-required.ts)

<details>
<summary><code>createTransactionToken(request: PciDssRequired.CreateTransactionTokenRequest, options?: RequestOptions): ApiPromise&lt;TransactionToken, PciDssRequired.CreateTransactionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

生の決済データを安全なトークンと交換します。生のカード番号を送信する場合は、**PCI DSS への準拠が必須**です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.pciDssRequired.createTransactionToken({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      paymentType: TransactionTokenCreateRequestPaymentType.Card,
      type: TransactionTokenCreateRequestType.Recurring,
      email: "test@univapay.com",
      metadata: { univapayPhoneNumber: "+81 08012341234" },
      data: {
        cardholder: "TEST TEST",
        cardNumber: "4242424242424242",
        expMonth: "09",
        expYear: "26",
        cvv: "123",
        phoneNumber: { countryCode: "81", localNumber: "08012341234" },
        cvvAuthorize: { enabled: false, currency: "JPY" },
        threeDs: { redirectEndpoint: "https://univapay.com/redirect/index.html" },
      },
    },
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type PciDssRequired.CreateTransactionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.pciDssRequired
  .createTransactionToken({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      paymentType: TransactionTokenCreateRequestPaymentType.Card,
      type: TransactionTokenCreateRequestType.Recurring,
      email: "test@univapay.com",
      metadata: { univapayPhoneNumber: "+81 08012341234" },
      data: {
        cardholder: "TEST TEST",
        cardNumber: "4242424242424242",
        expMonth: "09",
        expYear: "26",
        cvv: "123",
        phoneNumber: { countryCode: "81", localNumber: "08012341234" },
        cvvAuthorize: { enabled: false, currency: "JPY" },
        threeDs: { redirectEndpoint: "https://univapay.com/redirect/index.html" },
      },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[TransactionTokenCreateRequest](src/models/transaction-token-create-request.ts)</code> | トランザクション・トークン作成用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.pciDssRequired.createTransactionToken(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[PciDssRequired.CreateTransactionTokenError](src/resources/pci-dss-required.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.pciDssRequired.createTransactionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, PciDssRequired.CreateTransactionTokenError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getTokenThreeDsIssuerToken(request: PciDssRequired.GetTokenThreeDsIssuerTokenRequest, options?: RequestOptions): ApiPromise&lt;ThreeDsIssuerToken, PciDssRequired.GetTokenThreeDsIssuerTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

継続（recurring）用のトランザクション・トークンを作成する際に、3Dセキュア認証を実行するために必要な情報を取得します。**⚠️ 重要な注意点:** 1. **PCI DSS 準拠:** このエンドポイントは、API 経由で直接生のカードデータを送信してトークンを作成することを許可されている、PCI DSS に準拠した加盟店のみが利用できます。 2. **対象トークン:** これは `type` が `recurring`（継続用）のトークンにのみ適用されます。`one_time`（ワンタイム）や `subscription`（定期課金専用）のトークンについては、トークン作成時ではなく課金作成時に3Dセキュアがリクエストされます。 3. **実行フロー:** - トークンを作成した後、トークンオブジェクトをポーリングし、`data.three_ds.status` が `awaiting` になるまで待ちます。 - `awaiting` になったら、このエンドポイントを使用してイシュアートークンの詳細を取得します。 - 返された `payload` を `content_type` に合わせて（例：URL エンコード形式に）フォーマットし、消費者のブラウザから `issuer_token` の URL に対して `http_post` リクエストを実行します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.pciDssRequired.getTokenThreeDsIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type ThreeDsIssuerToken
} catch (err) {
  // TODO: Handle 'err' of type PciDssRequired.GetTokenThreeDsIssuerTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.pciDssRequired
  .getTokenThreeDsIssuerToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ThreeDsIssuerToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.pciDssRequired.getTokenThreeDsIssuerToken(request)`

- **OnSuccess**: <code>[ThreeDsIssuerToken](src/models/three-ds-issuer-token.ts)</code>
- **OnError**: throws <code>[PciDssRequired.GetTokenThreeDsIssuerTokenError](src/resources/pci-dss-required.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.pciDssRequired.getTokenThreeDsIssuerToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ThreeDsIssuerToken, PciDssRequired.GetTokenThreeDsIssuerTokenError&gt;</code>, with `result.value` of type <code>[ThreeDsIssuerToken](src/models/three-ds-issuer-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateTransactionToken(request: PciDssRequired.UpdateTransactionTokenRequest, options?: RequestOptions): ApiPromise&lt;TransactionToken, PciDssRequired.UpdateTransactionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

⚠️ **レガシー警告: 非推奨の操作** 技術的にはトランザクション・トークンを更新することは可能ですが、この運用は強く非推奨とされており、過去の互換性（レガシーな理由）のためだけに維持されています。**生のカード詳細を更新するには、サーバー環境が完全に PCI DSS に準拠している必要があります。****推奨されるアプローチ:** 既存のトークンを更新する代わりに、Univapay のフロントエンド統合機能（**リンクフォーム**、**ウィジェット**、または**インラインフォーム**）を使用して、完全に新しいトランザクション・トークンを作成するのがベストプラクティスです。これにより、お客様の決済データが貴社のサーバーを一切通過することなく、Univapay が安全に処理できます。--- **レガシーな使用方法:** CVV、住所、メールアドレス、またはカードの詳細を更新します。*注意: `RECURRING_USAGE_REQUIRES_CVV` エラーを解消するために CVV のみを更新する場合、アプリケーション・トークンのシークレットは不要です。*

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.pciDssRequired.updateTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      email: "test.update@test.com",
      data: {
        cvv: "123",
        cardholder: "TARO YAMADA",
        cardNumber: "4000020000000000",
        expMonth: 12,
        expYear: 2099,
        line1: "11111",
        line2: "222",
        state: "Tokyo",
        city: "テスト区一丁目",
        country: "JP",
        zip: "1234567",
        phoneNumber: { countryCode: "81", localNumber: "08000000000" },
      },
    },
  });
  // TODO: Handle 'response' of type TransactionToken
} catch (err) {
  // TODO: Handle 'err' of type PciDssRequired.UpdateTransactionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.pciDssRequired
  .updateTransactionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      email: "test.update@test.com",
      data: {
        cvv: "123",
        cardholder: "TARO YAMADA",
        cardNumber: "4000020000000000",
        expMonth: 12,
        expYear: 2099,
        line1: "11111",
        line2: "222",
        state: "Tokyo",
        city: "テスト区一丁目",
        country: "JP",
        zip: "1234567",
        phoneNumber: { countryCode: "81", localNumber: "08000000000" },
      },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionToken
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[TransactionTokenUpdateRequest](src/models/transaction-token-update-request.ts)</code> | トランザクション・トークン更新用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.pciDssRequired.updateTransactionToken(request)`

- **OnSuccess**: <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: throws <code>[PciDssRequired.UpdateTransactionTokenError](src/resources/pci-dss-required.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.pciDssRequired.updateTransactionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionToken, PciDssRequired.UpdateTransactionTokenError&gt;</code>, with `result.value` of type <code>[TransactionToken](src/models/unions/transaction-token.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Refunds

> Source: [Refunds](src/resources/refunds.ts)

<details>
<summary><code>createRefund(request: Refunds.CreateRefundRequest, options?: RequestOptions): ApiPromise&lt;Refund, Refunds.CreateRefundError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

成功した課金に対して返金を作成します。課金のステータスは `successful`（成功）である必要があります。コンビニ決済および銀行振込の課金は返金できません。返金は非同期で処理されるため、初期ステータスは `pending`（処理中）になります。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.refunds.createRefund({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1000, currency: "JPY", reason: RefundReasonRequest.CustomerRequest },
  });
  // TODO: Handle 'response' of type Refund
} catch (err) {
  // TODO: Handle 'err' of type Refunds.CreateRefundError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.refunds
  .createRefund({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1000, currency: "JPY", reason: RefundReasonRequest.CustomerRequest },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Refund
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[RefundCreateRequest](src/models/refund-create-request.ts)</code> | 返金作成用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.refunds.createRefund(request)`

- **OnSuccess**: <code>[Refund](src/models/refund.ts)</code>
- **OnError**: throws <code>[Refunds.CreateRefundError](src/resources/refunds.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.refunds.createRefund(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Refund, Refunds.CreateRefundError&gt;</code>, with `result.value` of type <code>[Refund](src/models/refund.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getRefund(request: Refunds.GetRefundRequest, options?: RequestOptions): ApiPromise&lt;Refund, Refunds.GetRefundError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の返金の詳細を取得します。ロングポーリングをサポートしており、`polling=true` を設定すると、返金ステータスが `pending`（処理中）から最終状態（`successful`、`failed`、または `error`）に遷移するまで接続を維持します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.refunds.getRefund({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: true,
  });
  // TODO: Handle 'response' of type Refund
} catch (err) {
  // TODO: Handle 'err' of type Refunds.GetRefundError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.refunds
  .getRefund({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: true,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Refund
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>polling?</code> | <code>boolean</code> | `true` の場合、サーバーは返金ステータスが最終状態に遷移するか、ポーリングのタイムアウトに達するまで接続を開いたまま保持します。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.refunds.getRefund(request)`

- **OnSuccess**: <code>[Refund](src/models/refund.ts)</code>
- **OnError**: throws <code>[Refunds.GetRefundError](src/resources/refunds.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.refunds.getRefund(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Refund, Refunds.GetRefundError&gt;</code>, with `result.value` of type <code>[Refund](src/models/refund.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listRefunds(request: Refunds.ListRefundsRequest, options?: RequestOptions): ApiPromise&lt;RefundList, Refunds.ListRefundsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の課金に対するすべての返金リストを取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.refunds.listRefunds({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    metadata: "order_id: 12345",
  });
  // TODO: Handle 'response' of type RefundList
} catch (err) {
  // TODO: Handle 'err' of type Refunds.ListRefundsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.refunds
  .listRefunds({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    metadata: "order_id: 12345",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type RefundList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>metadata?</code> | <code>string</code> | メタデータの内容で返金をフィルタリングします。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.refunds.listRefunds(request)`

- **OnSuccess**: <code>[RefundList](src/models/refund-list.ts)</code>
- **OnError**: throws <code>[Refunds.ListRefundsError](src/resources/refunds.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.refunds.listRefunds(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;RefundList, Refunds.ListRefundsError&gt;</code>, with `result.value` of type <code>[RefundList](src/models/refund-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateRefund(request: Refunds.UpdateRefundRequest, options?: RequestOptions): ApiPromise&lt;Refund, Refunds.UpdateRefundError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存の返金におけるメタデータ、メッセージ、または理由を更新します。許可されていない理由への変更は `INVALID_REFUND_REASON` で拒否されます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.refunds.updateRefund({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "12345" }, message: "Updated reason note" },
  });
  // TODO: Handle 'response' of type Refund
} catch (err) {
  // TODO: Handle 'err' of type Refunds.UpdateRefundError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.refunds
  .updateRefund({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "12345" }, message: "Updated reason note" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Refund
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[RefundUpdateRequest](src/models/refund-update-request.ts)</code> | 返金メタデータまたは理由更新用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.refunds.updateRefund(request)`

- **OnSuccess**: <code>[Refund](src/models/refund.ts)</code>
- **OnError**: throws <code>[Refunds.UpdateRefundError](src/resources/refunds.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.refunds.updateRefund(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Refund, Refunds.UpdateRefundError&gt;</code>, with `result.value` of type <code>[Refund](src/models/refund.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Subscriptions

> Source: [Subscriptions](src/resources/subscriptions.ts)

<details>
<summary><code>cancelSubscription(request: Subscriptions.CancelSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;undefined, Subscriptions.CancelSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存の定期課金を解約します。定期課金のステータスは恒久的に `canceled` に変更され、再開することはできません。十分にご注意の上、実行してください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.subscriptions.cancelSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.CancelSubscriptionError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .cancelSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.cancelSubscription(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[Subscriptions.CancelSubscriptionError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.cancelSubscription(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, Subscriptions.CancelSubscriptionError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createSubscription(request?: Subscriptions.CreateSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;Subscription, ApiError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

新規定期課金を作成します。トークンの決済手段は、その定期課金で許可されている必要があります。`subscription_plan` または `installment_plan` を指定する場合は、プランで許可された決済手段でなければなりません（そうでない場合は `SUBSCRIPTION_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN` または `INSTALLMENT_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN`）。プランを指定しない場合は、カード、コンビニ決済、Apple Pay、Paidy のトークンのみ使用できます。銀行振込のトークンは `PAYMENT_TYPE_NOT_ALLOWED` で拒否されます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.createSubscription({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      transactionTokenId: "11ef32a7-3a71-8662-803f-1bc27702eeec",
      amount: 1000,
      currency: "JPY",
      period: SubscriptionPeriod.Monthly,
    },
  });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  // TODO: Handle 'err' of type ApiError, where 'err.payload' is always the Undeclared arm
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .createSubscription({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      transactionTokenId: "11ef32a7-3a71-8662-803f-1bc27702eeec",
      amount: 1000,
      currency: "JPY",
      period: SubscriptionPeriod.Monthly,
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Subscription
} else {
  // TODO: Handle 'result', where 'result.payload' is always the Undeclared arm
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[SubscriptionCreateRequest](src/models/subscription-create-request.ts)</code> | 定期課金作成リクエスト |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.createSubscription(request)`

- **OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: throws <code>[ApiError](src/core/api-error.ts)</code>, with `err.payload` always the <code>[Undeclared](src/core/api-error.ts)</code> arm

**As ApiResult**: `await client.subscriptions.createSubscription(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Subscription, ApiError&gt;</code>, with `result.value` of type <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: `result.payload` always the <code>[Undeclared](src/core/api-error.ts)</code> arm, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getSubscription(request: Subscriptions.GetSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.GetSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存の定期課金の詳細を取得します。ステータスの変更を待つための内部ポーリングをサポートしています。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.getSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    polling: true,
  });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.GetSubscriptionError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .getSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    polling: true,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Subscription
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | 定期課金 ID。 |
| <code>polling?</code> | <code>boolean</code> | true に設定すると、定期課金のステータスが初期ステータスの 'unverified' から別のステータスに変わるまで、API が内部でポーリングを行うよう指示します。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.getSubscription(request)`

- **OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: throws <code>[Subscriptions.GetSubscriptionError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.getSubscription(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Subscription, Subscriptions.GetSubscriptionError&gt;</code>, with `result.value` of type <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getSubscriptionLatestCharge(request: Subscriptions.GetSubscriptionLatestChargeRequest, options?: RequestOptions): ApiPromise&lt;Charge, Subscriptions.GetSubscriptionLatestChargeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の定期課金に対して作成された、最も直近の課金を取得します。まだ課金が試行されていない場合は 404 を返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.getSubscriptionLatestCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
  });
  // TODO: Handle 'response' of type Charge
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.GetSubscriptionLatestChargeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .getSubscriptionLatestCharge({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Charge
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.getSubscriptionLatestCharge(request)`

- **OnSuccess**: <code>[Charge](src/models/charge.ts)</code>
- **OnError**: throws <code>[Subscriptions.GetSubscriptionLatestChargeError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.getSubscriptionLatestCharge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Charge, Subscriptions.GetSubscriptionLatestChargeError&gt;</code>, with `result.value` of type <code>[Charge](src/models/charge.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getSubscriptionPayment(request: Subscriptions.GetSubscriptionPaymentRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionPayment, Subscriptions.GetSubscriptionPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の定期課金に関連付けられた、個々の支払いの詳細を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.getSubscriptionPayment({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    paymentId: "11e89a0a-8cee-d660-b984-3fcaaed46e7c",
  });
  // TODO: Handle 'response' of type SubscriptionPayment
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.GetSubscriptionPaymentError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .getSubscriptionPayment({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    paymentId: "11e89a0a-8cee-d660-b984-3fcaaed46e7c",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionPayment
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>paymentId</code> | <code>string</code> | 定期課金の予定された支払いの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.getSubscriptionPayment(request)`

- **OnSuccess**: <code>[SubscriptionPayment](src/models/subscription-payment.ts)</code>
- **OnError**: throws <code>[Subscriptions.GetSubscriptionPaymentError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.getSubscriptionPayment(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionPayment, Subscriptions.GetSubscriptionPaymentError&gt;</code>, with `result.value` of type <code>[SubscriptionPayment](src/models/subscription-payment.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listAllSubscriptions(request?: Subscriptions.ListAllSubscriptionsRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionList, ApiError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

すべての店舗にわたるすべての定期課金の一覧を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listAllSubscriptions({
    search: "order_id:12345",
    status: SubscriptionStatus.Current,
    mode: ChargeMode.Live,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type SubscriptionList
} catch (err) {
  // TODO: Handle 'err' of type ApiError, where 'err.payload' is always the Undeclared arm
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .listAllSubscriptions({
    search: "order_id:12345",
    status: SubscriptionStatus.Current,
    mode: ChargeMode.Live,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionList
} else {
  // TODO: Handle 'result', where 'result.payload' is always the Undeclared arm
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>search?</code> | <code>string</code> | メタデータ値による検索。 |
| <code>status?</code> | <code>[SubscriptionStatus](src/models/subscription-status.ts)</code> | 現在のステータスで定期課金をフィルタリングします。 |
| <code>mode?</code> | <code>[ChargeMode](src/models/charge-mode.ts)</code> | 処理モード（本番/テスト）で定期課金をフィルタリングします。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.listAllSubscriptions(request)`

- **OnSuccess**: <code>[SubscriptionList](src/models/subscription-list.ts)</code>
- **OnError**: throws <code>[ApiError](src/core/api-error.ts)</code>, with `err.payload` always the <code>[Undeclared](src/core/api-error.ts)</code> arm

**As ApiResult**: `await client.subscriptions.listAllSubscriptions(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionList, ApiError&gt;</code>, with `result.value` of type <code>[SubscriptionList](src/models/subscription-list.ts)</code>
- **OnError**: `result.payload` always the <code>[Undeclared](src/core/api-error.ts)</code> arm, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listChargesForSubscriptionPayment(request: Subscriptions.ListChargesForSubscriptionPaymentRequest, options?: RequestOptions): ApiPromise&lt;ChargeList, Subscriptions.ListChargesForSubscriptionPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

定期課金の予定された特定の支払いに対して行われた、すべての課金試行のページネーションされたリストを取得します。リトライの履歴を調査するのに便利です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listChargesForSubscriptionPayment({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    paymentId: "11e89a0a-8cee-d660-b984-3fcaaed46e7c",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type ChargeList
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.ListChargesForSubscriptionPaymentError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .listChargesForSubscriptionPayment({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    paymentId: "11e89a0a-8cee-d660-b984-3fcaaed46e7c",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ChargeList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>paymentId</code> | <code>string</code> | 定期課金の予定された支払いの一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.listChargesForSubscriptionPayment(request)`

- **OnSuccess**: <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: throws <code>[Subscriptions.ListChargesForSubscriptionPaymentError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.listChargesForSubscriptionPayment(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ChargeList, Subscriptions.ListChargesForSubscriptionPaymentError&gt;</code>, with `result.value` of type <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listStoreSubscriptions(request: Subscriptions.ListStoreSubscriptionsRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionList, ApiError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の店舗のすべての定期課金の一覧を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listStoreSubscriptions({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    search: "order_id:12345",
    status: SubscriptionStatus.Current,
    mode: ChargeMode.Live,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type SubscriptionList
} catch (err) {
  // TODO: Handle 'err' of type ApiError, where 'err.payload' is always the Undeclared arm
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .listStoreSubscriptions({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    search: "order_id:12345",
    status: SubscriptionStatus.Current,
    mode: ChargeMode.Live,
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionList
} else {
  // TODO: Handle 'result', where 'result.payload' is always the Undeclared arm
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>search?</code> | <code>string</code> | メタデータ値による検索。 |
| <code>status?</code> | <code>[SubscriptionStatus](src/models/subscription-status.ts)</code> | 現在のステータスで定期課金をフィルタリングします。 |
| <code>mode?</code> | <code>[ChargeMode](src/models/charge-mode.ts)</code> | 処理モード（本番/テスト）で定期課金をフィルタリングします。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.listStoreSubscriptions(request)`

- **OnSuccess**: <code>[SubscriptionList](src/models/subscription-list.ts)</code>
- **OnError**: throws <code>[ApiError](src/core/api-error.ts)</code>, with `err.payload` always the <code>[Undeclared](src/core/api-error.ts)</code> arm

**As ApiResult**: `await client.subscriptions.listStoreSubscriptions(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionList, ApiError&gt;</code>, with `result.value` of type <code>[SubscriptionList](src/models/subscription-list.ts)</code>
- **OnError**: `result.payload` always the <code>[Undeclared](src/core/api-error.ts)</code> arm, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listSubscriptionCharges(request: Subscriptions.ListSubscriptionChargesRequest, options?: RequestOptions): ApiPromise&lt;ChargeList, Subscriptions.ListSubscriptionChargesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

定期課金にリンクされている課金のページネーションされたリストを取得します。バックエンド検索では、通常の課金一覧と同じ検索インターフェースを使用し、要求された定期課金のフィルターを追加します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listSubscriptionCharges({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type ChargeList
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.ListSubscriptionChargesError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .listSubscriptionCharges({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ChargeList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.listSubscriptionCharges(request)`

- **OnSuccess**: <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: throws <code>[Subscriptions.ListSubscriptionChargesError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.listSubscriptionCharges(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ChargeList, Subscriptions.ListSubscriptionChargesError&gt;</code>, with `result.value` of type <code>[ChargeList](src/models/charge-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listSubscriptionPayments(request: Subscriptions.ListSubscriptionPaymentsRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionPaymentList, Subscriptions.ListSubscriptionPaymentsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の定期課金について、過去の履歴および今後スケジュールされているすべての支払いリストを取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.listSubscriptionPayments({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type SubscriptionPaymentList
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.ListSubscriptionPaymentsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .listSubscriptionPayments({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionPaymentList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.listSubscriptionPayments(request)`

- **OnSuccess**: <code>[SubscriptionPaymentList](src/models/subscription-payment-list.ts)</code>
- **OnError**: throws <code>[Subscriptions.ListSubscriptionPaymentsError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.listSubscriptionPayments(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionPaymentList, Subscriptions.ListSubscriptionPaymentsError&gt;</code>, with `result.value` of type <code>[SubscriptionPaymentList](src/models/subscription-payment-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>simulateStoreSubscriptionPlan(request: Subscriptions.SimulateStoreSubscriptionPlanRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionSimulationPayment[], Subscriptions.SimulateStoreSubscriptionPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

ライブの定期課金やトランザクション・トークンを作成せずに、特定の店舗について定期課金が従う支払いスケジュールをシミュレートします。指定された金額、通貨、期間（またはカスタム期間）、およびプラン設定から導かれるスケジュール済み支払いの配列（エンベロープなし）を返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.simulateStoreSubscriptionPlan({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      amount: 1000,
      currency: "JPY",
      paymentType: TransactionTokenPaymentType.Card,
      period: SubscriptionSimulationPeriod.Monthly,
      scheduleSettings: { zoneId: "Asia/Tokyo" },
    },
  });
  // TODO: Handle 'response' of type SubscriptionSimulationPayment[]
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.SimulateStoreSubscriptionPlanError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .simulateStoreSubscriptionPlan({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      amount: 1000,
      currency: "JPY",
      paymentType: TransactionTokenPaymentType.Card,
      period: SubscriptionSimulationPeriod.Monthly,
      scheduleSettings: { zoneId: "Asia/Tokyo" },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionSimulationPayment[]
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[SubscriptionSimulationRequest](src/models/subscription-simulation-request.ts)</code> | 定期課金・プラン・シミュレーションのリクエスト |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.simulateStoreSubscriptionPlan(request)`

- **OnSuccess**: <code>[SubscriptionSimulationPayment](src/models/subscription-simulation-payment.ts)[]</code>
- **OnError**: throws <code>[Subscriptions.SimulateStoreSubscriptionPlanError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.simulateStoreSubscriptionPlan(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionSimulationPayment[], Subscriptions.SimulateStoreSubscriptionPlanError&gt;</code>, with `result.value` of type <code>[SubscriptionSimulationPayment](src/models/subscription-simulation-payment.ts)[]</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>simulateSubscriptionPlan(request?: Subscriptions.SimulateSubscriptionPlanRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionSimulationPayment[], Subscriptions.SimulateSubscriptionPlanError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

ライブの定期課金やトランザクション・トークンを作成せずに、定期課金が従う支払いスケジュールをシミュレートします。指定された金額、通貨、期間（またはカスタム期間）、およびプラン設定から導かれるスケジュール済み支払いの配列（エンベロープなし）を返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.simulateSubscriptionPlan({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      amount: 1000,
      currency: "JPY",
      paymentType: TransactionTokenPaymentType.Card,
      period: SubscriptionSimulationPeriod.Monthly,
      scheduleSettings: { zoneId: "Asia/Tokyo" },
    },
  });
  // TODO: Handle 'response' of type SubscriptionSimulationPayment[]
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.SimulateSubscriptionPlanError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .simulateSubscriptionPlan({
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      amount: 1000,
      currency: "JPY",
      paymentType: TransactionTokenPaymentType.Card,
      period: SubscriptionSimulationPeriod.Monthly,
      scheduleSettings: { zoneId: "Asia/Tokyo" },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionSimulationPayment[]
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[SubscriptionSimulationRequest](src/models/subscription-simulation-request.ts)</code> | 定期課金・プラン・シミュレーションのリクエスト |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.simulateSubscriptionPlan(request)`

- **OnSuccess**: <code>[SubscriptionSimulationPayment](src/models/subscription-simulation-payment.ts)[]</code>
- **OnError**: throws <code>[Subscriptions.SimulateSubscriptionPlanError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.simulateSubscriptionPlan(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionSimulationPayment[], Subscriptions.SimulateSubscriptionPlanError&gt;</code>, with `result.value` of type <code>[SubscriptionSimulationPayment](src/models/subscription-simulation-payment.ts)[]</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>suspendSubscription(request: Subscriptions.SuspendSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.SuspendSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

現在 `current`（有効）または `unpaid`（未払い）の定期課金を一時停止します。`termination_mode` で一時停止が発効するタイミングを制御します：`immediate`（デフォルト）はすぐに停止し、`on_next_payment` は次回の支払い予定日まで待ってから一時停止します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.suspendSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { scheduleSettings: { terminationMode: SubscriptionTerminationMode.OnNextPayment } },
  });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.SuspendSubscriptionError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .suspendSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { scheduleSettings: { terminationMode: SubscriptionTerminationMode.OnNextPayment } },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Subscription
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[SubscriptionSuspendRequest](src/models/subscription-suspend-request.ts)</code> | 定期課金一時停止用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.suspendSubscription(request)`

- **OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: throws <code>[Subscriptions.SuspendSubscriptionError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.suspendSubscription(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Subscription, Subscriptions.SuspendSubscriptionError&gt;</code>, with `result.value` of type <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>unsuspendSubscription(request: Subscriptions.UnsuspendSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.UnsuspendSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

現在 `suspended`（停止中）の定期課金を再開し、ステータスを `unpaid`（未払い）に戻して次回の支払いを再スケジュールします。リクエストボディは不要です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.unsuspendSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
  });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.UnsuspendSubscriptionError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .unsuspendSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Subscription
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.unsuspendSubscription(request)`

- **OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: throws <code>[Subscriptions.UnsuspendSubscriptionError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.unsuspendSubscription(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Subscription, Subscriptions.UnsuspendSubscriptionError&gt;</code>, with `result.value` of type <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateSubscription(request: Subscriptions.UpdateSubscriptionRequest, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.UpdateSubscriptionError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

特定の定期課金の設定、決済手段、またはスケジュールを更新します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.updateSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      metadata: { orderId: "12345" },
      scheduleSettings: { terminationMode: SubscriptionTerminationMode.OnNextPayment },
    },
  });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.UpdateSubscriptionError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .updateSubscription({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      metadata: { orderId: "12345" },
      scheduleSettings: { terminationMode: SubscriptionTerminationMode.OnNextPayment },
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Subscription
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[SubscriptionUpdateRequest](src/models/subscription-update-request.ts)</code> | 定期課金で更新するプロパティ。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.updateSubscription(request)`

- **OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: throws <code>[Subscriptions.UpdateSubscriptionError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.updateSubscription(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Subscription, Subscriptions.UpdateSubscriptionError&gt;</code>, with `result.value` of type <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateSubscriptionPayment(request: Subscriptions.UpdateSubscriptionPaymentRequest, options?: RequestOptions): ApiPromise&lt;SubscriptionPayment, Subscriptions.UpdateSubscriptionPaymentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

定期課金の、特定の予定された支払いプロパティを更新します。許可されている場合に期日を変更したり、支払いを支払済みとしてマークしたり、終了ステータスをスケジュールしたり、リトライ間隔を設定したりするために使用できます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.updateSubscriptionPayment({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    paymentId: "11e89a0a-8cee-d660-b984-3fcaaed46e7c",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { dueDate: "2026-09-01", isPaid: false },
  });
  // TODO: Handle 'response' of type SubscriptionPayment
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.UpdateSubscriptionPaymentError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .updateSubscriptionPayment({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "25d0fb2c-18ef-11e7-9dd3-db8fb7b820e7",
    paymentId: "11e89a0a-8cee-d660-b984-3fcaaed46e7c",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { dueDate: "2026-09-01", isPaid: false },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SubscriptionPayment
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>paymentId</code> | <code>string</code> | 定期課金の予定された支払いの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[SubscriptionPatchPaymentRequest](src/models/subscription-patch-payment-request.ts)</code> | 予定された定期課金支払いを更新するためのリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.updateSubscriptionPayment(request)`

- **OnSuccess**: <code>[SubscriptionPayment](src/models/subscription-payment.ts)</code>
- **OnError**: throws <code>[Subscriptions.UpdateSubscriptionPaymentError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.updateSubscriptionPayment(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SubscriptionPayment, Subscriptions.UpdateSubscriptionPaymentError&gt;</code>, with `result.value` of type <code>[SubscriptionPayment](src/models/subscription-payment.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateSubscriptionToken(request: Subscriptions.UpdateSubscriptionTokenRequest, options?: RequestOptions): ApiPromise&lt;Subscription, Subscriptions.UpdateSubscriptionTokenError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

定期課金に使用される決済手段（トランザクション・トークン）を置き換えます。カードの有効期限が切れた場合や、消費者が決済手段を切り替えたい場合に便利です。新しいトークンは同じ店舗に属し、アクティブであり、定期課金の処理モード（本番/テスト）と一致している必要があります。ワンタイムトークンは受け付けられません。継続（recurring）または定期課金（subscription）トークンを使用してください。トークンの決済手段は、その定期課金で許可されている必要があります。`subscription_plan` または `installment_plan` を指定する場合は、プランで許可された決済手段でなければなりません（そうでない場合は `SUBSCRIPTION_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN` または `INSTALLMENT_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN`）。プランを指定しない場合は、カード、コンビニ決済、Apple Pay、Paidy のトークンのみ使用できます。銀行振込のトークンは `PAYMENT_TYPE_NOT_ALLOWED` で拒否されます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.subscriptions.updateSubscriptionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { transactionTokenId: "11ef3362-3700-c54a-9baa-6f7e6527c9d9" },
  });
  // TODO: Handle 'response' of type Subscription
} catch (err) {
  // TODO: Handle 'err' of type Subscriptions.UpdateSubscriptionTokenError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.subscriptions
  .updateSubscriptionToken({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    subscriptionId: "11ef335e-9aa5-c54a-8313-7f9847da313a",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { transactionTokenId: "11ef3362-3700-c54a-9baa-6f7e6527c9d9" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Subscription
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>subscriptionId</code> | <code>string</code> | 定期課金の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[SubscriptionPatchTokenRequest](src/models/subscription-patch-token-request.ts)</code> | 定期課金の決済トークンを置き換えるためのリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.subscriptions.updateSubscriptionToken(request)`

- **OnSuccess**: <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: throws <code>[Subscriptions.UpdateSubscriptionTokenError](src/resources/subscriptions.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.subscriptions.updateSubscriptionToken(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Subscription, Subscriptions.UpdateSubscriptionTokenError&gt;</code>, with `result.value` of type <code>[Subscription](src/models/subscription.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Cancels

> Source: [Cancels](src/resources/cancels.ts)

<details>
<summary><code>createCancel(request: Cancels.CreateCancelRequest, options?: RequestOptions): ApiPromise&lt;Cancel, Cancels.CreateCancelError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

課金に対する新しいキャンセルリクエストを作成します。課金はキャンセル可能なステータスである必要があります。銀行振込およびコンビニ決済の課金で、すでに支払いが完了しているものはキャンセルできません。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.cancels.createCancel({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "ORD-987" } },
  });
  // TODO: Handle 'response' of type Cancel
} catch (err) {
  // TODO: Handle 'err' of type Cancels.CreateCancelError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.cancels
  .createCancel({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "ORD-987" } },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Cancel
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body?</code> | <code>[CancelCreateRequest](src/models/cancel-create-request.ts)</code> | キャンセル作成用のオプションのメタデータペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.cancels.createCancel(request)`

- **OnSuccess**: <code>[Cancel](src/models/cancel.ts)</code>
- **OnError**: throws <code>[Cancels.CreateCancelError](src/resources/cancels.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.cancels.createCancel(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Cancel, Cancels.CreateCancelError&gt;</code>, with `result.value` of type <code>[Cancel](src/models/cancel.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getCancel(request: Cancels.GetCancelRequest, options?: RequestOptions): ApiPromise&lt;Cancel, Cancels.GetCancelError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

ID によって特定のキャンセル情報を取得します。`?polling=true` を追加することでロングポーリングをサポートし、ステータスの変更を待機します（サーバータイムアウトまで）。シークレットを含むトークン（秘密鍵）が必要です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.cancels.getCancel({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: false,
  });
  // TODO: Handle 'response' of type Cancel
} catch (err) {
  // TODO: Handle 'err' of type Cancels.GetCancelError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.cancels
  .getCancel({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    polling: false,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Cancel
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>polling?</code> | <code>boolean</code> | `true` の場合、サーバーはキャンセルステータスが変更されるか、ポーリングのタイムアウトに達するまで接続を開いたまま保持します。<br>**Default**: false |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.cancels.getCancel(request)`

- **OnSuccess**: <code>[Cancel](src/models/cancel.ts)</code>
- **OnError**: throws <code>[Cancels.GetCancelError](src/resources/cancels.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.cancels.getCancel(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Cancel, Cancels.GetCancelError&gt;</code>, with `result.value` of type <code>[Cancel](src/models/cancel.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listCancels(request: Cancels.ListCancelsRequest, options?: RequestOptions): ApiPromise&lt;CancelList, Cancels.ListCancelsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

指定された課金に対するキャンセルリクエストのページネーションされたリストを返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.cancels.listCancels({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type CancelList
} catch (err) {
  // TODO: Handle 'err' of type Cancels.ListCancelsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.cancels
  .listCancels({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type CancelList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.cancels.listCancels(request)`

- **OnSuccess**: <code>[CancelList](src/models/cancel-list.ts)</code>
- **OnError**: throws <code>[Cancels.ListCancelsError](src/resources/cancels.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.cancels.listCancels(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;CancelList, Cancels.ListCancelsError&gt;</code>, with `result.value` of type <code>[CancelList](src/models/cancel-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateCancel(request: Cancels.UpdateCancelRequest, options?: RequestOptions): ApiPromise&lt;Cancel, Cancels.UpdateCancelError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存のキャンセルにおけるメタデータを更新します。シークレットを含むトークンが必要です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.cancels.updateCancel({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "12345" } },
  });
  // TODO: Handle 'response' of type Cancel
} catch (err) {
  // TODO: Handle 'err' of type Cancels.UpdateCancelError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.cancels
  .updateCancel({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    chargeId: "6efb4e5c-690a-40f3-a4f1-0e19c5f84e98",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { metadata: { orderId: "12345" } },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Cancel
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>chargeId</code> | <code>string</code> | 課金の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[CancelUpdateRequest](src/models/cancel-update-request.ts)</code> | キャンセルメタデータ更新用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.cancels.updateCancel(request)`

- **OnSuccess**: <code>[Cancel](src/models/cancel.ts)</code>
- **OnError**: throws <code>[Cancels.UpdateCancelError](src/resources/cancels.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.cancels.updateCancel(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Cancel, Cancels.UpdateCancelError&gt;</code>, with `result.value` of type <code>[Cancel](src/models/cancel.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Merchants

> Source: [Merchants](src/resources/merchants.ts)

<details>
<summary><code>getCurrentMerchant(options?: RequestOptions): ApiPromise&lt;Merchant, Merchants.GetCurrentMerchantError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

ベアラ資格情報から解決された加盟店の識別情報と有効な設定を返します。加盟店統合における標準的なイントロスペクション（自己分析）エンドポイントとして扱ってください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.merchants.getCurrentMerchant();
  // TODO: Handle 'response' of type Merchant
} catch (err) {
  // TODO: Handle 'err' of type Merchants.GetCurrentMerchantError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.merchants.getCurrentMerchant().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Merchant
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.merchants.getCurrentMerchant()`

- **OnSuccess**: <code>[Merchant](src/models/merchant.ts)</code>
- **OnError**: throws <code>[Merchants.GetCurrentMerchantError](src/resources/merchants.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.merchants.getCurrentMerchant().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Merchant, Merchants.GetCurrentMerchantError&gt;</code>, with `result.value` of type <code>[Merchant](src/models/merchant.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Stores

> Source: [Stores](src/resources/stores.ts)

<details>
<summary><code>createCustomerId(request: Stores.CreateCustomerIdRequestParams, options?: RequestOptions): ApiPromise&lt;CreateCustomerIdResponse, Stores.CreateCustomerIdError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

加盟店が指定したローカルな消費者識別子から、決定論的な店舗スコープの UUID を導出します。同じ店舗に対して同じ `customer_id` で再度呼び出しても、常に同じ UUID が返されます — この操作には副作用がなく（何も永続化されません）、繰り返し呼び出しても安全であり、`Idempotency-Key` も不要です。アプリケーション・トークンのシークレットが必要です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.stores.createCustomerId({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    body: { customerId: "local-customer-1902" },
  });
  // TODO: Handle 'response' of type CreateCustomerIdResponse
} catch (err) {
  // TODO: Handle 'err' of type Stores.CreateCustomerIdError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.stores
  .createCustomerId({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    body: { customerId: "local-customer-1902" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type CreateCustomerIdResponse
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>body</code> | <code>[CreateCustomerIdRequest](src/models/create-customer-id-request.ts)</code> | 消費者 ID を導出するためのリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.stores.createCustomerId(request)`

- **OnSuccess**: <code>[CreateCustomerIdResponse](src/models/create-customer-id-response.ts)</code>
- **OnError**: throws <code>[Stores.CreateCustomerIdError](src/resources/stores.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.stores.createCustomerId(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;CreateCustomerIdResponse, Stores.CreateCustomerIdError&gt;</code>, with `result.value` of type <code>[CreateCustomerIdResponse](src/models/create-customer-id-response.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getStore(request: Stores.GetStoreRequest, options?: RequestOptions): ApiPromise&lt;Store, Stores.GetStoreError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

現在の加盟店コンテキストにおける、単一の店舗情報と、解決された設定スナップショットを返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.stores.getStore({ id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4" });
  // TODO: Handle 'response' of type Store
} catch (err) {
  // TODO: Handle 'err' of type Stores.GetStoreError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.stores.getStore({ id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Store
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.stores.getStore(request)`

- **OnSuccess**: <code>[Store](src/models/store.ts)</code>
- **OnError**: throws <code>[Stores.GetStoreError](src/resources/stores.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.stores.getStore(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Store, Stores.GetStoreError&gt;</code>, with `result.value` of type <code>[Store](src/models/store.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listStores(request?: Stores.ListStoresRequest, options?: RequestOptions): ApiPromise&lt;StoreList, Stores.ListStoresError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

現在の加盟店資格情報で閲覧可能な店舗を返します。カーソルページネーション、および `short_id` やフリーテキストの `search` フィルターをサポートしています。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.stores.listStores({
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    shortId: "st_01hxy9p8zw4d",
    search: "tokyo",
  });
  // TODO: Handle 'response' of type StoreList
} catch (err) {
  // TODO: Handle 'err' of type Stores.ListStoresError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.stores
  .listStores({
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    shortId: "st_01hxy9p8zw4d",
    search: "tokyo",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type StoreList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>shortId?</code> | <code>string</code> | ショート識別子でフィルタリングします。 |
| <code>search?</code> | <code>string</code> | 大文字と小文字を区別しないフリーテキスト検索。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.stores.listStores(request)`

- **OnSuccess**: <code>[StoreList](src/models/store-list.ts)</code>
- **OnError**: throws <code>[Stores.ListStoresError](src/resources/stores.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.stores.listStores(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;StoreList, Stores.ListStoresError&gt;</code>, with `result.value` of type <code>[StoreList](src/models/store-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Webhooks

> Source: [Webhooks](src/resources/webhooks.ts)

<details>
<summary><code>createWebhook(request: Webhooks.CreateWebhookRequest, options?: RequestOptions): ApiPromise&lt;Webhook, Webhooks.CreateWebhookError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

指定された店舗に対して新しいウェブフックを作成します。シークレットを含むトークンが必要です。同じスコープ内での重複する URL は許可されません。店舗ごとに作成できるウェブフックの数には最大制限があります。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.webhooks.createWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      triggers: [WebhookTrigger.ChargeFinished],
      url: "https://example.com/webhooks/payments",
      authToken: "my-secret-token",
    },
  });
  // TODO: Handle 'response' of type Webhook
} catch (err) {
  // TODO: Handle 'err' of type Webhooks.CreateWebhookError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.webhooks
  .createWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      triggers: [WebhookTrigger.ChargeFinished],
      url: "https://example.com/webhooks/payments",
      authToken: "my-secret-token",
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Webhook
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[WebhookCreateRequest](src/models/webhook-create-request.ts)</code> | 店舗ウェブフック作成用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.webhooks.createWebhook(request)`

- **OnSuccess**: <code>[Webhook](src/models/webhook.ts)</code>
- **OnError**: throws <code>[Webhooks.CreateWebhookError](src/resources/webhooks.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.webhooks.createWebhook(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Webhook, Webhooks.CreateWebhookError&gt;</code>, with `result.value` of type <code>[Webhook](src/models/webhook.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deleteWebhook(request: Webhooks.DeleteWebhookRequest, options?: RequestOptions): ApiPromise&lt;undefined, Webhooks.DeleteWebhookError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

ウェブフックを無効化し、削除します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.webhooks.deleteWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
} catch (err) {
  // TODO: Handle 'err' of type Webhooks.DeleteWebhookError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.webhooks
  .deleteWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.webhooks.deleteWebhook(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[Webhooks.DeleteWebhookError](src/resources/webhooks.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.webhooks.deleteWebhook(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, Webhooks.DeleteWebhookError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getWebhook(request: Webhooks.GetWebhookRequest, options?: RequestOptions): ApiPromise&lt;Webhook, Webhooks.GetWebhookError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

ID によって特定のウェブフック情報を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.webhooks.getWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
  });
  // TODO: Handle 'response' of type Webhook
} catch (err) {
  // TODO: Handle 'err' of type Webhooks.GetWebhookError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.webhooks
  .getWebhook({ storeId: "0cab399b-5621-425b-993b-f8507eba1e78", id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4" })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Webhook
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.webhooks.getWebhook(request)`

- **OnSuccess**: <code>[Webhook](src/models/webhook.ts)</code>
- **OnError**: throws <code>[Webhooks.GetWebhookError](src/resources/webhooks.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.webhooks.getWebhook(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Webhook, Webhooks.GetWebhookError&gt;</code>, with `result.value` of type <code>[Webhook](src/models/webhook.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listWebhookEvents(request: Webhooks.ListWebhookEventsRequest, options?: RequestOptions): ApiPromise&lt;WebhookEventList, Webhooks.ListWebhookEventsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

指定されたウェブフックに対するウェブフック配信イベントのページネーションされたリストを返します。各イベントは、単一のウェブフック配信試行の結果を記録しています。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.webhooks.listWebhookEvents({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type WebhookEventList
} catch (err) {
  // TODO: Handle 'err' of type Webhooks.ListWebhookEventsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.webhooks
  .listWebhookEvents({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type WebhookEventList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.webhooks.listWebhookEvents(request)`

- **OnSuccess**: <code>[WebhookEventList](src/models/webhook-event-list.ts)</code>
- **OnError**: throws <code>[Webhooks.ListWebhookEventsError](src/resources/webhooks.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.webhooks.listWebhookEvents(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;WebhookEventList, Webhooks.ListWebhookEventsError&gt;</code>, with `result.value` of type <code>[WebhookEventList](src/models/webhook-event-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listWebhooks(request: Webhooks.ListWebhooksRequest, options?: RequestOptions): ApiPromise&lt;WebhookList, Webhooks.ListWebhooksError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

指定された店舗のウェブフックのページネーションされたリストを返します。シークレットを含むトークンが必要です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.webhooks.listWebhooks({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    active: true,
  });
  // TODO: Handle 'response' of type WebhookList
} catch (err) {
  // TODO: Handle 'err' of type Webhooks.ListWebhooksError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.webhooks
  .listWebhooks({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
    active: true,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type WebhookList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>active?</code> | <code>boolean</code> | アクティブ（有効）ステータスでフィルタリングします。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.webhooks.listWebhooks(request)`

- **OnSuccess**: <code>[WebhookList](src/models/webhook-list.ts)</code>
- **OnError**: throws <code>[Webhooks.ListWebhooksError](src/resources/webhooks.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.webhooks.listWebhooks(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;WebhookList, Webhooks.ListWebhooksError&gt;</code>, with `result.value` of type <code>[WebhookList](src/models/webhook-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateWebhook(request: Webhooks.UpdateWebhookRequest, options?: RequestOptions): ApiPromise&lt;Webhook, Webhooks.UpdateWebhookError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

既存のウェブフックを更新します。すべてのフィールドはオプションであり、省略されたフィールドは変更されません。同じスコープ内での重複する URL は許可されません。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.webhooks.updateWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { active: false },
  });
  // TODO: Handle 'response' of type Webhook
} catch (err) {
  // TODO: Handle 'err' of type Webhooks.UpdateWebhookError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.webhooks
  .updateWebhook({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    id: "c4e87129-cad4-47fb-8ded-b4c0a4ae0dd4",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { active: false },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Webhook
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>id</code> | <code>string</code> | リソースの一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[WebhookUpdateRequest](src/models/webhook-update-request.ts)</code> | 店舗ウェブフック更新用のリクエスト・ペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.webhooks.updateWebhook(request)`

- **OnSuccess**: <code>[Webhook](src/models/webhook.ts)</code>
- **OnError**: throws <code>[Webhooks.UpdateWebhookError](src/resources/webhooks.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.webhooks.updateWebhook(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Webhook, Webhooks.UpdateWebhookError&gt;</code>, with `result.value` of type <code>[Webhook](src/models/webhook.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## DirectDebit

> Source: [DirectDebit](src/resources/direct-debit.ts)

<details>
<summary><code>createDirectDebitBankAccount(request: DirectDebit.CreateDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankAccount, DirectDebit.CreateDirectDebitBankAccountError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

消費者の銀行口座を口座振替に登録します。作成後に銀行側での確認が行われるため、直後は利用できません。振替を予約する前に `status` をポーリングし、`active` (または `registration_failed`) になるまで待ってください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.createDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      userNumber: "SD02688328",
      bankCode: "0012",
      bankName: "ﾗｸﾃﾝｷﾞﾝｺｳ",
      branchCode: "120",
      bankAccountType: DirectDebitBankAccountType.Regular,
      bankAccountName: "ﾀﾅｶﾕﾐｺ",
      bankAccountNumber: "1234567",
    },
  });
  // TODO: Handle 'response' of type DirectDebitBankAccount
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.CreateDirectDebitBankAccountError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .createDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: {
      userNumber: "SD02688328",
      bankCode: "0012",
      bankName: "ﾗｸﾃﾝｷﾞﾝｺｳ",
      branchCode: "120",
      bankAccountType: DirectDebitBankAccountType.Regular,
      bankAccountName: "ﾀﾅｶﾕﾐｺ",
      bankAccountNumber: "1234567",
    },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankAccount
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[DirectDebitBankAccountCreateRequest](src/models/direct-debit-bank-account-create-request.ts)</code> | 消費者の銀行口座を登録するためのリクエストペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.createDirectDebitBankAccount(request)`

- **OnSuccess**: <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: throws <code>[DirectDebit.CreateDirectDebitBankAccountError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.createDirectDebitBankAccount(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankAccount, DirectDebit.CreateDirectDebitBankAccountError&gt;</code>, with `result.value` of type <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createDirectDebitBankTransfer(request: DirectDebit.CreateDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankTransfer, DirectDebit.CreateDirectDebitBankTransferError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

有効な銀行口座からの資金の引き落としを予約します。振替は加盟店の次の振替日区分に登録され、その区分のアップロード期限までは編集できます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.createDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1000 },
  });
  // TODO: Handle 'response' of type DirectDebitBankTransfer
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.CreateDirectDebitBankTransferError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .createDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1000 },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankTransfer
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankAccountId</code> | <code>string</code> | 口座振替の銀行口座の一意な識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[DirectDebitBankTransferCreateRequest](src/models/direct-debit-bank-transfer-create-request.ts)</code> | 振替を予約するためのリクエストペイロード (日本円)。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.createDirectDebitBankTransfer(request)`

- **OnSuccess**: <code>[DirectDebitBankTransfer](src/models/direct-debit-bank-transfer.ts)</code>
- **OnError**: throws <code>[DirectDebit.CreateDirectDebitBankTransferError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.createDirectDebitBankTransfer(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankTransfer, DirectDebit.CreateDirectDebitBankTransferError&gt;</code>, with `result.value` of type <code>[DirectDebitBankTransfer](src/models/direct-debit-bank-transfer.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deactivateDirectDebitBankAccount(request: DirectDebit.DeactivateDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankAccount, DirectDebit.DeactivateDirectDebitBankAccountError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

銀行口座を無効化し、以降その口座に振替を登録できないようにします。レコードは削除されずステータスが `inactive` になり、後から再有効化できます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.deactivateDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
  });
  // TODO: Handle 'response' of type DirectDebitBankAccount
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.DeactivateDirectDebitBankAccountError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .deactivateDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankAccount
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankAccountId</code> | <code>string</code> | 口座振替の銀行口座の一意な識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.deactivateDirectDebitBankAccount(request)`

- **OnSuccess**: <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: throws <code>[DirectDebit.DeactivateDirectDebitBankAccountError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.deactivateDirectDebitBankAccount(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankAccount, DirectDebit.DeactivateDirectDebitBankAccountError&gt;</code>, with `result.value` of type <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deleteDirectDebitBankTransfer(request: DirectDebit.DeleteDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise&lt;undefined, DirectDebit.DeleteDirectDebitBankTransferError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

予約済みの振替を取り消し、銀行に送信されないようにします。振替が `unlocked` の場合にのみ許可されます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.directDebit.deleteDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankTransferId: "2594976",
  });
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.DeleteDirectDebitBankTransferError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .deleteDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankTransferId: "2594976",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankTransferId</code> | <code>string</code> | 口座振替の振替の一意な識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.deleteDirectDebitBankTransfer(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[DirectDebit.DeleteDirectDebitBankTransferError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.deleteDirectDebitBankTransfer(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, DirectDebit.DeleteDirectDebitBankTransferError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getDirectDebitBankAccount(request: DirectDebit.GetDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankAccount, DirectDebit.GetDirectDebitBankAccountError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

登録済みの銀行口座を1件取得します。現在の確認ステータスも含まれます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.getDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
  });
  // TODO: Handle 'response' of type DirectDebitBankAccount
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.GetDirectDebitBankAccountError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .getDirectDebitBankAccount({ merchantId: "01234567-89ab-cdef-0123-456789abcdef", bankAccountId: "1098116" })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankAccount
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankAccountId</code> | <code>string</code> | 口座振替の銀行口座の一意な識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.getDirectDebitBankAccount(request)`

- **OnSuccess**: <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: throws <code>[DirectDebit.GetDirectDebitBankAccountError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.getDirectDebitBankAccount(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankAccount, DirectDebit.GetDirectDebitBankAccountError&gt;</code>, with `result.value` of type <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getDirectDebitBankTransfer(request: DirectDebit.GetDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankTransfer, DirectDebit.GetDirectDebitBankTransferError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

振替を1件取得します。振替結果反映日以降にポーリングすることで、結果と、失敗した場合は銀行が報告した理由を取得できます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.getDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankTransferId: "2594976",
  });
  // TODO: Handle 'response' of type DirectDebitBankTransfer
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.GetDirectDebitBankTransferError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .getDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankTransferId: "2594976",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankTransfer
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankTransferId</code> | <code>string</code> | 口座振替の振替の一意な識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.getDirectDebitBankTransfer(request)`

- **OnSuccess**: <code>[DirectDebitBankTransfer](src/models/direct-debit-bank-transfer.ts)</code>
- **OnError**: throws <code>[DirectDebit.GetDirectDebitBankTransferError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.getDirectDebitBankTransfer(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankTransfer, DirectDebit.GetDirectDebitBankTransferError&gt;</code>, with `result.value` of type <code>[DirectDebitBankTransfer](src/models/direct-debit-bank-transfer.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getDirectDebitConfiguration(request: DirectDebit.GetDirectDebitConfigurationRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitMerchantConfiguration, DirectDebit.GetDirectDebitConfigurationError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

加盟店の口座振替設定を取得します。口座振替が有効かどうか、および適用される毎月の振替日区分が含まれます。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.getDirectDebitConfiguration({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
  });
  // TODO: Handle 'response' of type DirectDebitMerchantConfiguration
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.GetDirectDebitConfigurationError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .getDirectDebitConfiguration({ merchantId: "01234567-89ab-cdef-0123-456789abcdef" })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitMerchantConfiguration
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.getDirectDebitConfiguration(request)`

- **OnSuccess**: <code>[DirectDebitMerchantConfiguration](src/models/direct-debit-merchant-configuration.ts)</code>
- **OnError**: throws <code>[DirectDebit.GetDirectDebitConfigurationError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.getDirectDebitConfiguration(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitMerchantConfiguration, DirectDebit.GetDirectDebitConfigurationError&gt;</code>, with `result.value` of type <code>[DirectDebitMerchantConfiguration](src/models/direct-debit-merchant-configuration.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getDirectDebitCurrentSchedule(request: DirectDebit.GetDirectDebitCurrentScheduleRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitSchedule, DirectDebit.GetDirectDebitCurrentScheduleError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

加盟店に設定された振替日区分に基づき、進行中の区分の主要な日付を取得します。`merchant_bank_account_upload_deadline` を当日と比較して、当月まだ振替を登録・編集できるかを判断してください。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.getDirectDebitCurrentSchedule({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
  });
  // TODO: Handle 'response' of type DirectDebitSchedule
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.GetDirectDebitCurrentScheduleError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .getDirectDebitCurrentSchedule({ merchantId: "01234567-89ab-cdef-0123-456789abcdef" })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitSchedule
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.getDirectDebitCurrentSchedule(request)`

- **OnSuccess**: <code>[DirectDebitSchedule](src/models/direct-debit-schedule.ts)</code>
- **OnError**: throws <code>[DirectDebit.GetDirectDebitCurrentScheduleError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.getDirectDebitCurrentSchedule(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitSchedule, DirectDebit.GetDirectDebitCurrentScheduleError&gt;</code>, with `result.value` of type <code>[DirectDebitSchedule](src/models/direct-debit-schedule.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getDirectDebitNotificationConfiguration(request: DirectDebit.GetDirectDebitNotificationConfigurationRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitNotificationConfiguration, DirectDebit.GetDirectDebitNotificationConfigurationError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

加盟店が受信を選択している口座振替のメール通知を取得します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.getDirectDebitNotificationConfiguration({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
  });
  // TODO: Handle 'response' of type DirectDebitNotificationConfiguration
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.GetDirectDebitNotificationConfigurationError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .getDirectDebitNotificationConfiguration({ merchantId: "01234567-89ab-cdef-0123-456789abcdef" })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitNotificationConfiguration
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.getDirectDebitNotificationConfiguration(request)`

- **OnSuccess**: <code>[DirectDebitNotificationConfiguration](src/models/direct-debit-notification-configuration.ts)</code>
- **OnError**: throws <code>[DirectDebit.GetDirectDebitNotificationConfigurationError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.getDirectDebitNotificationConfiguration(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitNotificationConfiguration, DirectDebit.GetDirectDebitNotificationConfigurationError&gt;</code>, with `result.value` of type <code>[DirectDebitNotificationConfiguration](src/models/direct-debit-notification-configuration.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listDirectDebitBankAccounts(request: DirectDebit.ListDirectDebitBankAccountsRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankAccountList, DirectDebit.ListDirectDebitBankAccountsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

この加盟店で口座振替のために登録されている消費者の銀行口座を一覧します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.listDirectDebitBankAccounts({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    limit: 10,
    cursor: "1098116",
    cursorDirection: CursorDirectionQuery.Asc,
    userNumber: "SD02688328",
    bankAccountId: "1098116",
    bankCode: "0012",
    bankName: "ﾗｸﾃﾝｷﾞﾝｺｳ",
    branchCode: "120",
    bankAccountType: DirectDebitBankAccountType.Regular,
    bankAccountNumber: "1234567",
    bankAccountName: "ﾀﾅｶﾕﾐｺ",
    registrationOrigin: DirectDebitRegistrationOrigin.MerchantConsole,
    bankAccountStatus: DirectDebitBankAccountStatus.Active,
    from: "2026-04-01T00:00:00.000Z",
    to: "2026-04-30T23:59:59.999Z",
  });
  // TODO: Handle 'response' of type DirectDebitBankAccountList
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.ListDirectDebitBankAccountsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .listDirectDebitBankAccounts({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    limit: 10,
    cursor: "1098116",
    cursorDirection: CursorDirectionQuery.Asc,
    userNumber: "SD02688328",
    bankAccountId: "1098116",
    bankCode: "0012",
    bankName: "ﾗｸﾃﾝｷﾞﾝｺｳ",
    branchCode: "120",
    bankAccountType: DirectDebitBankAccountType.Regular,
    bankAccountNumber: "1234567",
    bankAccountName: "ﾀﾅｶﾕﾐｺ",
    registrationOrigin: DirectDebitRegistrationOrigin.MerchantConsole,
    bankAccountStatus: DirectDebitBankAccountStatus.Active,
    from: "2026-04-01T00:00:00.000Z",
    to: "2026-04-30T23:59:59.999Z",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankAccountList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>userNumber?</code> | <code>string</code> | 加盟店が消費者に割り当てた会員番号で絞り込みます。 |
| <code>bankAccountId?</code> | <code>string</code> | 単一の銀行口座IDで絞り込みます。 |
| <code>bankCode?</code> | <code>string</code> | 4桁の銀行コードで絞り込みます。 |
| <code>bankName?</code> | <code>string</code> | 半角カタカナの銀行名で絞り込みます。 |
| <code>branchCode?</code> | <code>string</code> | 3桁の支店コードで絞り込みます。 |
| <code>bankAccountType?</code> | <code>[DirectDebitBankAccountType](src/models/direct-debit-bank-account-type.ts)</code> | 預金種類で絞り込みます。 |
| <code>bankAccountNumber?</code> | <code>string</code> | 7桁の口座番号で絞り込みます。 |
| <code>bankAccountName?</code> | <code>string</code> | 半角カタカナの口座名義で絞り込みます。 |
| <code>registrationOrigin?</code> | <code>[DirectDebitRegistrationOrigin](src/models/direct-debit-registration-origin.ts)</code> | 銀行口座の登録元で絞り込みます。 |
| <code>bankAccountStatus?</code> | <code>[DirectDebitBankAccountStatus](src/models/direct-debit-bank-account-status.ts)</code> | 銀行口座のステータスで絞り込みます。省略するとすべてのステータスが返されます。 |
| <code>from?</code> | <code>string</code> | この日時以降に作成された銀行口座を表示します (ISO-8601)。 |
| <code>to?</code> | <code>string</code> | この日時より前に作成された銀行口座を表示します (ISO-8601)。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.listDirectDebitBankAccounts(request)`

- **OnSuccess**: <code>[DirectDebitBankAccountList](src/models/direct-debit-bank-account-list.ts)</code>
- **OnError**: throws <code>[DirectDebit.ListDirectDebitBankAccountsError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.listDirectDebitBankAccounts(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankAccountList, DirectDebit.ListDirectDebitBankAccountsError&gt;</code>, with `result.value` of type <code>[DirectDebitBankAccountList](src/models/direct-debit-bank-account-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listDirectDebitBankTransfers(request: DirectDebit.ListDirectDebitBankTransfersRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankTransferList, DirectDebit.ListDirectDebitBankTransfersError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

この加盟店で登録されている口座振替の振替を、すべての銀行口座にまたがって一覧します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.listDirectDebitBankTransfers({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    limit: 10,
    cursor: "1098116",
    cursorDirection: CursorDirectionQuery.Asc,
    bankTransferId: "2594976",
    bankTransferStart: "2026-01",
    bankTransferEnd: "2026-03",
    debitDate: DirectDebitDebitDate.Fourteen,
    userNumber: "SD02688328",
    bankAccountNumber: "1234567",
    bankAccountName: "ﾀﾅｶﾕﾐｺ",
    lockStatus: DirectDebitBankTransferLock.Unlocked,
    bankTransferStatus: DirectDebitBankTransferStatus.Awaiting,
  });
  // TODO: Handle 'response' of type DirectDebitBankTransferList
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.ListDirectDebitBankTransfersError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .listDirectDebitBankTransfers({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    limit: 10,
    cursor: "1098116",
    cursorDirection: CursorDirectionQuery.Asc,
    bankTransferId: "2594976",
    bankTransferStart: "2026-01",
    bankTransferEnd: "2026-03",
    debitDate: DirectDebitDebitDate.Fourteen,
    userNumber: "SD02688328",
    bankAccountNumber: "1234567",
    bankAccountName: "ﾀﾅｶﾕﾐｺ",
    lockStatus: DirectDebitBankTransferLock.Unlocked,
    bankTransferStatus: DirectDebitBankTransferStatus.Awaiting,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankTransferList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |
| <code>bankTransferId?</code> | <code>string</code> | 単一の振替IDで絞り込みます。 |
| <code>bankTransferStart?</code> | <code>string</code> | 振替が予定されている年月の範囲の開始。 |
| <code>bankTransferEnd?</code> | <code>string</code> | 振替が予定されている年月の範囲の終了。 |
| <code>debitDate?</code> | <code>[DirectDebitDebitDate](src/models/direct-debit-debit-date.ts)</code> | 毎月の振替日区分で絞り込みます。 |
| <code>userNumber?</code> | <code>string</code> | 加盟店が消費者に割り当てた会員番号で絞り込みます。 |
| <code>bankAccountNumber?</code> | <code>string</code> | 7桁の口座番号で絞り込みます。 |
| <code>bankAccountName?</code> | <code>string</code> | 半角カタカナの口座名義で絞り込みます。 |
| <code>lockStatus?</code> | <code>[DirectDebitBankTransferLock](src/models/direct-debit-bank-transfer-lock.ts)</code> | ロック状態で絞り込みます。省略するとロック済みと未ロックの両方が返されます。 |
| <code>bankTransferStatus?</code> | <code>[DirectDebitBankTransferStatus](src/models/direct-debit-bank-transfer-status.ts)</code> | 振替のステータスで絞り込みます。省略するとすべてのステータスが返されます。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.listDirectDebitBankTransfers(request)`

- **OnSuccess**: <code>[DirectDebitBankTransferList](src/models/direct-debit-bank-transfer-list.ts)</code>
- **OnError**: throws <code>[DirectDebit.ListDirectDebitBankTransfersError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.listDirectDebitBankTransfers(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankTransferList, DirectDebit.ListDirectDebitBankTransfersError&gt;</code>, with `result.value` of type <code>[DirectDebitBankTransferList](src/models/direct-debit-bank-transfer-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>reenableDirectDebitBankAccount(request: DirectDebit.ReenableDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankAccount, DirectDebit.ReenableDirectDebitBankAccountError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

無効化された銀行口座を `active` に戻し、再び振替を登録できるようにします。対象の口座は現在 `inactive` である必要があります。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.reenableDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
  });
  // TODO: Handle 'response' of type DirectDebitBankAccount
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.ReenableDirectDebitBankAccountError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .reenableDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankAccount
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankAccountId</code> | <code>string</code> | 口座振替の銀行口座の一意な識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.reenableDirectDebitBankAccount(request)`

- **OnSuccess**: <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: throws <code>[DirectDebit.ReenableDirectDebitBankAccountError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.reenableDirectDebitBankAccount(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankAccount, DirectDebit.ReenableDirectDebitBankAccountError&gt;</code>, with `result.value` of type <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateDirectDebitBankAccount(request: DirectDebit.UpdateDirectDebitBankAccountRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankAccount, DirectDebit.UpdateDirectDebitBankAccountError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

登録済みの銀行口座を更新します。銀行情報を変更すると銀行側での確認が再度実行されます。すでに登録済みの振替は登録時点の情報を保持します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.updateDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { bankAccountName: "ﾀﾅｶﾕﾐｺ" },
  });
  // TODO: Handle 'response' of type DirectDebitBankAccount
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.UpdateDirectDebitBankAccountError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .updateDirectDebitBankAccount({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankAccountId: "1098116",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { bankAccountName: "ﾀﾅｶﾕﾐｺ" },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankAccount
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankAccountId</code> | <code>string</code> | 口座振替の銀行口座の一意な識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[DirectDebitBankAccountUpdateRequest](src/models/direct-debit-bank-account-update-request.ts)</code> | 登録済みの銀行口座を更新するためのリクエストペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.updateDirectDebitBankAccount(request)`

- **OnSuccess**: <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: throws <code>[DirectDebit.UpdateDirectDebitBankAccountError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.updateDirectDebitBankAccount(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankAccount, DirectDebit.UpdateDirectDebitBankAccountError&gt;</code>, with `result.value` of type <code>[DirectDebitBankAccount](src/models/direct-debit-bank-account.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateDirectDebitBankTransfer(request: DirectDebit.UpdateDirectDebitBankTransferRequest, options?: RequestOptions): ApiPromise&lt;DirectDebitBankTransfer, DirectDebit.UpdateDirectDebitBankTransferError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

予約済みの振替の金額を変更します。振替が `unlocked` の場合にのみ許可され、その区分のアップロード期限を過ぎると金額は確定します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.directDebit.updateDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankTransferId: "2594976",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1850 },
  });
  // TODO: Handle 'response' of type DirectDebitBankTransfer
} catch (err) {
  // TODO: Handle 'err' of type DirectDebit.UpdateDirectDebitBankTransferError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.directDebit
  .updateDirectDebitBankTransfer({
    merchantId: "01234567-89ab-cdef-0123-456789abcdef",
    bankTransferId: "2594976",
    idempotencyKey: "f64be872-353d-4c3c-84cb-3dc617fe89f7",
    body: { amount: 1850 },
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type DirectDebitBankTransfer
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>merchantId</code> | <code>string</code> | 加盟店の一意の識別子。 |
| <code>bankTransferId</code> | <code>string</code> | 口座振替の振替の一意な識別子。 |
| <code>idempotencyKey?</code> | <code>string</code> | 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 |
| <code>body</code> | <code>[DirectDebitBankTransferPatchRequest](src/models/direct-debit-bank-transfer-patch-request.ts)</code> | 振替金額を変更するためのリクエストペイロード。 |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.directDebit.updateDirectDebitBankTransfer(request)`

- **OnSuccess**: <code>[DirectDebitBankTransfer](src/models/direct-debit-bank-transfer.ts)</code>
- **OnError**: throws <code>[DirectDebit.UpdateDirectDebitBankTransferError](src/resources/direct-debit.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.directDebit.updateDirectDebitBankTransfer(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;DirectDebitBankTransfer, DirectDebit.UpdateDirectDebitBankTransferError&gt;</code>, with `result.value` of type <code>[DirectDebitBankTransfer](src/models/direct-debit-bank-transfer.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Checkout

> Source: [Checkout](src/resources/checkout.ts)

<details>
<summary><code>getCheckoutInfo(options?: RequestOptions): ApiPromise&lt;CheckoutInfo, Checkout.GetCheckoutInfoError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

加盟店のチェックアウト設定（有効な決済手段とその上限、分割払い・定期課金プランの設定、コンビニおよび銀行振込の設定、ウィジェットテーマ、ブランドごとの機能サポート）を返します。ベアラー資格情報のみから解決され、パラメータは不要です。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.checkout.getCheckoutInfo();
  // TODO: Handle 'response' of type CheckoutInfo
} catch (err) {
  // TODO: Handle 'err' of type Checkout.GetCheckoutInfoError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.checkout.getCheckoutInfo().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type CheckoutInfo
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.checkout.getCheckoutInfo()`

- **OnSuccess**: <code>[CheckoutInfo](src/models/checkout-info.ts)</code>
- **OnError**: throws <code>[Checkout.GetCheckoutInfoError](src/resources/checkout.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.checkout.getCheckoutInfo().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;CheckoutInfo, Checkout.GetCheckoutInfoError&gt;</code>, with `result.value` of type <code>[CheckoutInfo](src/models/checkout-info.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## TransactionHistory

> Source: [TransactionHistory](src/resources/transaction-history.ts)

<details>
<summary><code>listStoreTransactionHistory(request: TransactionHistory.ListStoreTransactionHistoryRequest, options?: RequestOptions): ApiPromise&lt;TransactionHistoryList, TransactionHistory.ListStoreTransactionHistoryError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

単一店舗の課金・返金の履歴を、ページネーションされた検索可能な形式で返します。両方のリソースタイプを単一の統合された行形式にまとめて返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionHistory.listStoreTransactionHistory({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    mode: TransactionHistoryMode.Test,
    shortId: "8bfc29",
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999Z",
    status: TransactionHistoryStatus.Successful,
    type: TransactionHistoryType.Charge,
    search: "Taro Yamada",
    email: "user@example.com",
    id: "11ef0000-0000-4000-8000-000000000070",
    metadata: "order_id: 12345",
    cardExp: "2026-04",
    cardLastFour: "4242",
    cardholder: "TARO YAMADA",
    cardBrand: ["visa"],
    brand: ["visa"],
    brands: ["visa", "jcb"],
    currency: "JPY",
    serviceProvider: TransactionHistoryServiceProvider.Credit,
    serviceProviders: [TransactionHistoryServiceProvider.Credit, TransactionHistoryServiceProvider.Paidy],
    gatewayTransactionId: "gw-txn-00123456",
    bankTransferPaymentStatuses: [BankTransferPaymentStatus.Exact],
    bankTransferLatestDepositDateFrom: "2026-04-01T00:00:00Z",
    bankTransferLatestDepositDateTo: "2026-04-30T23:59:59.999Z",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type TransactionHistoryList
} catch (err) {
  // TODO: Handle 'err' of type TransactionHistory.ListStoreTransactionHistoryError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionHistory
  .listStoreTransactionHistory({
    storeId: "0cab399b-5621-425b-993b-f8507eba1e78",
    mode: TransactionHistoryMode.Test,
    shortId: "8bfc29",
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999Z",
    status: TransactionHistoryStatus.Successful,
    type: TransactionHistoryType.Charge,
    search: "Taro Yamada",
    email: "user@example.com",
    id: "11ef0000-0000-4000-8000-000000000070",
    metadata: "order_id: 12345",
    cardExp: "2026-04",
    cardLastFour: "4242",
    cardholder: "TARO YAMADA",
    cardBrand: ["visa"],
    brand: ["visa"],
    brands: ["visa", "jcb"],
    currency: "JPY",
    serviceProvider: TransactionHistoryServiceProvider.Credit,
    serviceProviders: [TransactionHistoryServiceProvider.Credit, TransactionHistoryServiceProvider.Paidy],
    gatewayTransactionId: "gw-txn-00123456",
    bankTransferPaymentStatuses: [BankTransferPaymentStatus.Exact],
    bankTransferLatestDepositDateFrom: "2026-04-01T00:00:00Z",
    bankTransferLatestDepositDateTo: "2026-04-30T23:59:59.999Z",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionHistoryList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>storeId</code> | <code>string</code> | 店舗の一意の識別子。 |
| <code>mode?</code> | <code>[TransactionHistoryMode](src/models/transaction-history-mode.ts)</code> | 環境モードでフィルタリングします。 |
| <code>shortId?</code> | <code>string</code> | リソースの UUID の下6桁でフィルタリングします。必ず6文字で指定してください。 |
| <code>from?</code> | <code>string</code> | この日時以降に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`to` より後の日時にはできません。 |
| <code>to?</code> | <code>string</code> | この日時以前に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`from` より前の日時にはできません。 |
| <code>status?</code> | <code>[TransactionHistoryStatus](src/models/transaction-history-status.ts)</code> | ステータスでフィルタリングします。課金・返金いずれのステータス値も指定できます。 |
| <code>type?</code> | <code>[TransactionHistoryType](src/models/transaction-history-type.ts)</code> | 行のタイプでフィルタリングします。 |
| <code>search?</code> | <code>string</code> | カード名義人・消費者名およびメールアドレスを対象としたフリーテキスト検索です。値を引用符で囲む（`"first last"`）と完全一致（フレーズ）検索、囲まない場合は部分一致検索になります。 |
| <code>email?</code> | <code>string</code> | メールアドレスでフィルタリングします。 |
| <code>id?</code> | <code>string</code> | 課金 ID または返金 ID の完全一致でフィルタリングします。 |
| <code>metadata?</code> | <code>string</code> | メタデータでフィルタリングします。 |
| <code>cardExp?</code> | <code>string</code> | カードの有効期限（`yyyy-MM` 形式）でフィルタリングします。 |
| <code>cardLastFour?</code> | <code>string</code> | カードの下4桁でフィルタリングします。必ず4文字で指定してください。 |
| <code>cardholder?</code> | <code>string</code> | カード名義人名でフィルタリングします。既定では部分一致です。完全一致（フレーズ）検索を行うには引用符で囲んでください。 |
| <code>cardBrand?</code> | <code>string[]</code> | 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例: `card_brand[]=visa&card_brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand` フィールドを参照してください。 |
| <code>brand?</code> | <code>string[]</code> | ブランドでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例: `brand[]=visa&brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand` フィールドを参照してください。 |
| <code>brands?</code> | <code>string[]</code> | 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例: `brands[]=visa&brands[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand` フィールドを参照してください。 |
| <code>currency?</code> | <code>string</code> | 通貨（ISO-4217 形式）でフィルタリングします。 |
| <code>serviceProvider?</code> | <code>[TransactionHistoryServiceProvider](src/models/transaction-history-service-provider.ts)</code> | サービスプロバイダーでフィルタリングします。 |
| <code>serviceProviders?</code> | <code>[TransactionHistoryServiceProvider](src/models/transaction-history-service-provider.ts)[]</code> | サービスプロバイダーでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例: `service_providers[]=credit&service_providers[]=paidy`）。空にはできません。重複する値は除去されます。 |
| <code>gatewayTransactionId?</code> | <code>string</code> | ゲートウェイ自身のトランザクション ID（自由記述）でフィルタリングします。 |
| <code>bankTransferPaymentStatuses?</code> | <code>[BankTransferPaymentStatus](src/models/bank-transfer-payment-status.ts)[]</code> | 銀行振込の行を支払いステータスでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例: `bank_transfer_payment_statuses[]=unpaid&bank_transfer_payment_statuses[]=exact`）。 |
| <code>bankTransferLatestDepositDateFrom?</code> | <code>string</code> | `bank_transfer_latest_deposit_date` の範囲の開始（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 |
| <code>bankTransferLatestDepositDateTo?</code> | <code>string</code> | `bank_transfer_latest_deposit_date` の範囲の終了（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionHistory.listStoreTransactionHistory(request)`

- **OnSuccess**: <code>[TransactionHistoryList](src/models/transaction-history-list.ts)</code>
- **OnError**: throws <code>[TransactionHistory.ListStoreTransactionHistoryError](src/resources/transaction-history.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionHistory.listStoreTransactionHistory(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionHistoryList, TransactionHistory.ListStoreTransactionHistoryError&gt;</code>, with `result.value` of type <code>[TransactionHistoryList](src/models/transaction-history-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listTransactionHistory(request?: TransactionHistory.ListTransactionHistoryRequest, options?: RequestOptions): ApiPromise&lt;TransactionHistoryList, TransactionHistory.ListTransactionHistoryError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

加盟店のすべての店舗にわたる課金・返金の履歴を、ページネーションされた検索可能な形式で返します。両方のリソースタイプを単一の統合された行形式にまとめて返します。

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.transactionHistory.listTransactionHistory({
    mode: TransactionHistoryMode.Test,
    shortId: "8bfc29",
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999Z",
    status: TransactionHistoryStatus.Successful,
    type: TransactionHistoryType.Charge,
    search: "Taro Yamada",
    email: "user@example.com",
    id: "11ef0000-0000-4000-8000-000000000070",
    metadata: "order_id: 12345",
    cardExp: "2026-04",
    cardLastFour: "4242",
    cardholder: "TARO YAMADA",
    cardBrand: ["visa"],
    brand: ["visa"],
    brands: ["visa", "jcb"],
    currency: "JPY",
    serviceProvider: TransactionHistoryServiceProvider.Credit,
    serviceProviders: [TransactionHistoryServiceProvider.Credit, TransactionHistoryServiceProvider.Paidy],
    gatewayTransactionId: "gw-txn-00123456",
    bankTransferPaymentStatuses: [BankTransferPaymentStatus.Exact],
    bankTransferLatestDepositDateFrom: "2026-04-01T00:00:00Z",
    bankTransferLatestDepositDateTo: "2026-04-30T23:59:59.999Z",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  });
  // TODO: Handle 'response' of type TransactionHistoryList
} catch (err) {
  // TODO: Handle 'err' of type TransactionHistory.ListTransactionHistoryError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.transactionHistory
  .listTransactionHistory({
    mode: TransactionHistoryMode.Test,
    shortId: "8bfc29",
    from: "2026-04-01T00:00:00Z",
    to: "2026-04-30T23:59:59.999Z",
    status: TransactionHistoryStatus.Successful,
    type: TransactionHistoryType.Charge,
    search: "Taro Yamada",
    email: "user@example.com",
    id: "11ef0000-0000-4000-8000-000000000070",
    metadata: "order_id: 12345",
    cardExp: "2026-04",
    cardLastFour: "4242",
    cardholder: "TARO YAMADA",
    cardBrand: ["visa"],
    brand: ["visa"],
    brands: ["visa", "jcb"],
    currency: "JPY",
    serviceProvider: TransactionHistoryServiceProvider.Credit,
    serviceProviders: [TransactionHistoryServiceProvider.Credit, TransactionHistoryServiceProvider.Paidy],
    gatewayTransactionId: "gw-txn-00123456",
    bankTransferPaymentStatuses: [BankTransferPaymentStatus.Exact],
    bankTransferLatestDepositDateFrom: "2026-04-01T00:00:00Z",
    bankTransferLatestDepositDateTo: "2026-04-30T23:59:59.999Z",
    limit: 10,
    cursor: "3541d4fa-596d-428e-8a36-f274e1b3d505",
    cursorDirection: CursorDirectionQuery.Asc,
  })
  .asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type TransactionHistoryList
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>mode?</code> | <code>[TransactionHistoryMode](src/models/transaction-history-mode.ts)</code> | 環境モードでフィルタリングします。 |
| <code>shortId?</code> | <code>string</code> | リソースの UUID の下6桁でフィルタリングします。必ず6文字で指定してください。 |
| <code>from?</code> | <code>string</code> | この日時以降に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`to` より後の日時にはできません。 |
| <code>to?</code> | <code>string</code> | この日時以前に作成された行を表示します。エポックミリ秒または ISO-8601 の日時形式を受け付けます。`from` より前の日時にはできません。 |
| <code>status?</code> | <code>[TransactionHistoryStatus](src/models/transaction-history-status.ts)</code> | ステータスでフィルタリングします。課金・返金いずれのステータス値も指定できます。 |
| <code>type?</code> | <code>[TransactionHistoryType](src/models/transaction-history-type.ts)</code> | 行のタイプでフィルタリングします。 |
| <code>search?</code> | <code>string</code> | カード名義人・消費者名およびメールアドレスを対象としたフリーテキスト検索です。値を引用符で囲む（`"first last"`）と完全一致（フレーズ）検索、囲まない場合は部分一致検索になります。 |
| <code>email?</code> | <code>string</code> | メールアドレスでフィルタリングします。 |
| <code>id?</code> | <code>string</code> | 課金 ID または返金 ID の完全一致でフィルタリングします。 |
| <code>metadata?</code> | <code>string</code> | メタデータでフィルタリングします。 |
| <code>cardExp?</code> | <code>string</code> | カードの有効期限（`yyyy-MM` 形式）でフィルタリングします。 |
| <code>cardLastFour?</code> | <code>string</code> | カードの下4桁でフィルタリングします。必ず4文字で指定してください。 |
| <code>cardholder?</code> | <code>string</code> | カード名義人名でフィルタリングします。既定では部分一致です。完全一致（フレーズ）検索を行うには引用符で囲んでください。 |
| <code>cardBrand?</code> | <code>string[]</code> | 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例: `card_brand[]=visa&card_brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand` フィールドを参照してください。 |
| <code>brand?</code> | <code>string[]</code> | ブランドでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例: `brand[]=visa&brand[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand` フィールドを参照してください。 |
| <code>brands?</code> | <code>string[]</code> | 非推奨: `brand` のレガシーエイリアスです。代わりに `brand` を使用してください。`[]` サフィックスで繰り返し指定できます（例: `brands[]=visa&brands[]=jcb`）。ブランドの識別子は決済タイプごとに異なります。詳細は本エンドポイントのレスポンスの `user_data.brand` フィールドを参照してください。 |
| <code>currency?</code> | <code>string</code> | 通貨（ISO-4217 形式）でフィルタリングします。 |
| <code>serviceProvider?</code> | <code>[TransactionHistoryServiceProvider](src/models/transaction-history-service-provider.ts)</code> | サービスプロバイダーでフィルタリングします。 |
| <code>serviceProviders?</code> | <code>[TransactionHistoryServiceProvider](src/models/transaction-history-service-provider.ts)[]</code> | サービスプロバイダーでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例: `service_providers[]=credit&service_providers[]=paidy`）。空にはできません。重複する値は除去されます。 |
| <code>gatewayTransactionId?</code> | <code>string</code> | ゲートウェイ自身のトランザクション ID（自由記述）でフィルタリングします。 |
| <code>bankTransferPaymentStatuses?</code> | <code>[BankTransferPaymentStatus](src/models/bank-transfer-payment-status.ts)[]</code> | 銀行振込の行を支払いステータスでフィルタリングします。`[]` サフィックスで繰り返し指定できます（例: `bank_transfer_payment_statuses[]=unpaid&bank_transfer_payment_statuses[]=exact`）。 |
| <code>bankTransferLatestDepositDateFrom?</code> | <code>string</code> | `bank_transfer_latest_deposit_date` の範囲の開始（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 |
| <code>bankTransferLatestDepositDateTo?</code> | <code>string</code> | `bank_transfer_latest_deposit_date` の範囲の終了（含む）。エポックミリ秒または ISO-8601 の日時形式を受け付けます。 |
| <code>limit?</code> | <code>number</code> | 1ページに返されるリソースの最大数。<br>**Default**: 10 |
| <code>cursor?</code> | <code>string</code> | ページネーションを継続するための、次のリソースを指すカーソル。 |
| <code>cursorDirection?</code> | <code>[CursorDirectionQuery](src/models/cursor-direction-query.ts)</code> | 指定されたカーソルに対するページネーションの方向。<br>**Default**: "desc" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.transactionHistory.listTransactionHistory(request)`

- **OnSuccess**: <code>[TransactionHistoryList](src/models/transaction-history-list.ts)</code>
- **OnError**: throws <code>[TransactionHistory.ListTransactionHistoryError](src/resources/transaction-history.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.transactionHistory.listTransactionHistory(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;TransactionHistoryList, TransactionHistory.ListTransactionHistoryError&gt;</code>, with `result.value` of type <code>[TransactionHistoryList](src/models/transaction-history-list.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[UnivapayPublicApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

