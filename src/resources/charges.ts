import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import {
  bankTransferLedgerListSchema,
  type BankTransferLedgerList,
} from "../models/bank-transfer-ledger-list.js";
import { chargeCaptureRequestSchema, type ChargeCaptureRequest } from "../models/charge-capture-request.js";
import {
  chargeCreateRequestInternalSchema,
  type ChargeCreateRequest,
} from "../models/charge-create-request.js";
import { chargeListInternalSchema, type ChargeList } from "../models/charge-list.js";
import { chargeUpdateRequestSchema, type ChargeUpdateRequest } from "../models/charge-update-request.js";
import { chargeInternalSchema, type Charge } from "../models/charge.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import {
  customsDeclarationCreateRequestSchema,
  type CustomsDeclarationCreateRequest,
} from "../models/customs-declaration-create-request.js";
import {
  customsDeclarationPatchRequestSchema,
  type CustomsDeclarationPatchRequest,
} from "../models/customs-declaration-patch-request.js";
import {
  customsDeclarationWebhookDataSchema,
  type CustomsDeclarationWebhookData,
} from "../models/customs-declaration-webhook-data.js";
import { issuerTokenSchema, type IssuerToken } from "../models/issuer-token.js";
import { modeQuerySchema, type ModeQuery } from "../models/mode-query.js";
import {
  threeDsIssuerTokenInternalSchema,
  type ThreeDsIssuerToken,
} from "../models/three-ds-issuer-token.js";
import type { Servers } from "../servers.js";

/**
 * 決済、オーソリ（保留）、キャプチャ（売上確定）の作成・管理、および決済ステータスの確認を行うエンドポイント。
 */
export class Charges {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 課金のキャプチャ (売上確定)
   *
   * @remarks
   * 以前にオーソリ（保留）された課金（作成時に `capture` が false
   * に設定されていたもの）をキャプチャして売上を確定させます。キャプチャ金額はオーソリ金額以下である必要があり、通貨も一致する必要があります。リクエストボディ（およびその両方のフィールド）は任意です。完全に省略した場合、オーソリ済みの未決済全額（元のリクエスト通貨で）がキャプチャされます。部分キャプチャ（オーソリ金額より少ない金額のキャプチャ）は、有効化されている場合にのみ利用できます。有効化されていない場合、リクエストは
   * `amount` フィールドに対する `PARTIAL_CAPTURE_NOT_ALLOWED` で拒否されます。銀行振込の課金では常に利用できます。
   *
   * @returns キャプチャに成功しました。レスポンスボディはありません（HTTP 200、本文なし）。
   *
   * @throws {@link Charges.CaptureChargeError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  captureCharge(
    request: Charges.CaptureChargeRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Charges.CaptureChargeError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{id}/capture"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => chargeCaptureRequestSchema)),
        },
      },
      {
        success: { kind: "empty" },
        errorFactory: Charges.CaptureChargeError,
      },
      options,
    );
  }

  /**
   * 課金の作成
   *
   * @remarks
   * 決済手段（例：トランザクション・トークン）に対して課金を作成します。
   *
   * @returns 課金作成完了
   *
   * @throws {@link Charges.CreateChargeError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createCharge(
    request: Charges.CreateChargeRequest = {},
    options?: RequestOptions,
  ): ApiPromise<Charge, Charges.CreateChargeError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/charges"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => chargeCreateRequestInternalSchema)),
        },
      },
      {
        success: { kind: "json", schema: chargeInternalSchema },
        errorFactory: Charges.CreateChargeError,
      },
      options,
    );
  }

  /**
   * 税関申告の作成
   *
   * @remarks
   * 成功した課金に対して税関申告を作成します。バックエンドは、WeChat Online および WeChat MPM
   * の課金に対してのみこのリクエストを受け付けます。申告がすでに存在し、かつ処理中（pending）でない場合、バックエンドは新しいレコードを作成するのではなく、その識別情報フィールドを更新して処理を再開します。
   *
   * @returns 既存の税関申告が正常に更新され、再送信されました。
   *
   * @throws {@link Charges.CreateCustomsDeclarationError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createCustomsDeclaration(
    request: Charges.CreateCustomsDeclarationRequest,
    options?: RequestOptions,
  ): ApiPromise<CustomsDeclarationWebhookData, Charges.CreateCustomsDeclarationError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/customs"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: customsDeclarationCreateRequestSchema },
      },
      {
        success: { kind: "json", schema: customsDeclarationWebhookDataSchema },
        errorFactory: Charges.CreateCustomsDeclarationError,
      },
      options,
    );
  }

  /**
   * 課金情報の取得 (ロングポーリング対応)
   *
   * @remarks
   * 既存の課金の詳細を取得します。
   *
   * @returns 課金の詳細
   *
   * @throws {@link Charges.GetChargeError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getCharge(
    request: Charges.GetChargeRequest,
    options?: RequestOptions,
  ): ApiPromise<Charge, Charges.GetChargeError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [{ name: "polling", value: request.polling, schema: s.optional(s.boolean()) }],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: chargeInternalSchema },
        errorFactory: Charges.GetChargeError,
      },
      options,
    );
  }

  /**
   * イシュアートークンの取得 - オンライン決済および銀行振込
   *
   * @remarks
   * 決済の実行に必要な URL（オンライン決済の場合）または銀行口座の詳細（銀行振込の場合）を取得します。**⚠️ 前提条件:** イシュアートークンを要求する前に、課金の `status` が
   * `awaiting` になっている必要があります。課金が他のステータスにあるときに要求された場合、エラーが返されます。
   *
   * @returns イシュアートークンまたは銀行振込の案内情報が正常に取得されました。
   *
   * @throws {@link Charges.GetChargeIssuerTokenError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getChargeIssuerToken(
    request: Charges.GetChargeIssuerTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<IssuerToken, Charges.GetChargeIssuerTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{id}/issuer_token"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: issuerTokenSchema },
        errorFactory: Charges.GetChargeIssuerTokenError,
      },
      options,
    );
  }

  /**
   * 3Dセキュアイシュアートークンの取得 (課金)
   *
   * @remarks
   * カード課金を認証するために必要な3Dセキュアイシュアートークンの詳細を取得します。**⚠️ 前提条件:** 1. 課金作成時に `three_ds.mode` が `normal` または
   * `force` に設定されている必要があります。 2. このリクエストを行う前に、課金をポーリングし、その `status` が `awaiting`
   * になるまで待つ必要があります。**実行フロー:** 取得後、クライアント（ブラウザ）は `issuer_token` の URL に対して `http_post`
   * リクエストを実行する必要があります。返された `payload` オブジェクトを `content_type` に合わせて（例：URL
   * エンコード形式に）フォーマットし、ボディに含めて送信します。これはリダイレクトを介して、または iframe 内で実行できます。iframe を使用する場合は、ステータスが
   * `successful`、`failed`、または `error` のいずれかの最終状態に達するまで、バックグラウンドで課金ステータスのポーリングを継続してください。
   *
   * @returns 3DS リダイレクトの詳細が正常に取得されました。
   *
   * @throws {@link Charges.GetChargeThreeDsIssuerTokenError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getChargeThreeDsIssuerToken(
    request: Charges.GetChargeThreeDsIssuerTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<ThreeDsIssuerToken, Charges.GetChargeThreeDsIssuerTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{id}/three_ds/issuer_token"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: threeDsIssuerTokenInternalSchema },
        errorFactory: Charges.GetChargeThreeDsIssuerTokenError,
      },
      options,
    );
  }

  /**
   * 税関申告の取得
   *
   * @remarks
   * 課金に対する税関申告情報を取得します。`polling=true`
   * の場合にロングポーリングをサポートし、申告が現在のステータスから抜けるか、ポーリングのタイムアウトに達した時点で応答を返します。
   *
   * @returns 税関申告が正常に取得されました。
   *
   * @throws {@link Charges.GetCustomsDeclarationError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getCustomsDeclaration(
    request: Charges.GetCustomsDeclarationRequest,
    options?: RequestOptions,
  ): ApiPromise<CustomsDeclarationWebhookData, Charges.GetCustomsDeclarationError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/customs/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [{ name: "polling", value: request.polling, schema: s.defaulted(s.boolean(), false) }],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: customsDeclarationWebhookDataSchema },
        errorFactory: Charges.GetCustomsDeclarationError,
      },
      options,
    );
  }

  /**
   * 課金一覧の取得 (全店舗)
   *
   * @remarks
   * 認証されたユーザーのすべての店舗にわたるすべての課金の一覧を取得します。
   *
   * @returns 課金のリスト
   *
   * @throws {@link Charges.ListAllChargesError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listAllCharges(
    request: Charges.ListAllChargesRequest = {},
    options?: RequestOptions,
  ): ApiPromise<ChargeList, Charges.ListAllChargesError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/charges"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
          { name: "last_four", value: request.lastFour, schema: s.optional(s.string()) },
          { name: "name", value: request.name, schema: s.optional(s.string()) },
          { name: "exp_month", value: request.expMonth, schema: s.optional(s.int()) },
          { name: "exp_year", value: request.expYear, schema: s.optional(s.int()) },
          { name: "from", value: request.from, schema: s.optional(s.string()) },
          { name: "to", value: request.to, schema: s.optional(s.string()) },
          { name: "email", value: request.email, schema: s.optional(s.string()) },
          { name: "phone", value: request.phone, schema: s.optional(s.string()) },
          { name: "amount_from", value: request.amountFrom, schema: s.optional(s.int()) },
          { name: "amount_to", value: request.amountTo, schema: s.optional(s.int()) },
          { name: "currency", value: request.currency, schema: s.optional(s.string()) },
          { name: "mode", value: request.mode, schema: s.optional(s.lazy(() => modeQuerySchema)) },
          { name: "metadata", value: request.metadata, schema: s.optional(s.string()) },
          { name: "transaction_token_id", value: request.transactionTokenId, schema: s.optional(s.string()) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: chargeListInternalSchema },
        errorFactory: Charges.ListAllChargesError,
      },
      options,
    );
  }

  /**
   * 銀行振込台帳の取得
   *
   * @remarks
   * 課金に関連付けられた銀行振込台帳エントリを取得します。
   *
   * @returns 台帳エントリ（入金/決済履歴）
   *
   * @throws {@link Charges.ListBankTransferLedgersError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listBankTransferLedgers(
    request: Charges.ListBankTransferLedgersRequest,
    options?: RequestOptions,
  ): ApiPromise<BankTransferLedgerList, Charges.ListBankTransferLedgersError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{id}/bank_transfer_ledgers"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: bankTransferLedgerListSchema },
        errorFactory: Charges.ListBankTransferLedgersError,
      },
      options,
    );
  }

  /**
   * 課金一覧の取得 (特定の店舗)
   *
   * @remarks
   * 特定の店舗のすべての課金の一覧を取得します。
   *
   * @returns 課金のリスト
   *
   * @throws {@link Charges.ListStoreChargesError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listStoreCharges(
    request: Charges.ListStoreChargesRequest,
    options?: RequestOptions,
  ): ApiPromise<ChargeList, Charges.ListStoreChargesError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "storeId", value: request.storeId, schema: s.string() }],
        query: [
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
          { name: "last_four", value: request.lastFour, schema: s.optional(s.string()) },
          { name: "name", value: request.name, schema: s.optional(s.string()) },
          { name: "exp_month", value: request.expMonth, schema: s.optional(s.int()) },
          { name: "exp_year", value: request.expYear, schema: s.optional(s.int()) },
          { name: "from", value: request.from, schema: s.optional(s.string()) },
          { name: "to", value: request.to, schema: s.optional(s.string()) },
          { name: "email", value: request.email, schema: s.optional(s.string()) },
          { name: "phone", value: request.phone, schema: s.optional(s.string()) },
          { name: "amount_from", value: request.amountFrom, schema: s.optional(s.int()) },
          { name: "amount_to", value: request.amountTo, schema: s.optional(s.int()) },
          { name: "currency", value: request.currency, schema: s.optional(s.string()) },
          { name: "mode", value: request.mode, schema: s.optional(s.lazy(() => modeQuerySchema)) },
          { name: "metadata", value: request.metadata, schema: s.optional(s.string()) },
          { name: "transaction_token_id", value: request.transactionTokenId, schema: s.optional(s.string()) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: chargeListInternalSchema },
        errorFactory: Charges.ListStoreChargesError,
      },
      options,
    );
  }

  /**
   * 税関申告の更新
   *
   * @remarks
   * 税関申告を更新し、処理を再キューイング（再実行待ちに）します。バックエンドのパッチ処理では元の `customs`、`certificate_id`、`certificate_name`
   * の値が保持され、新しい `merchant_customs_no` のみを受け付けます。処理中（pending）の申告はパッチ更新できません。
   *
   * @returns 税関申告が正常に更新されました。
   *
   * @throws {@link Charges.PatchCustomsDeclarationError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  patchCustomsDeclaration(
    request: Charges.PatchCustomsDeclarationRequest,
    options?: RequestOptions,
  ): ApiPromise<CustomsDeclarationWebhookData, Charges.PatchCustomsDeclarationError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{chargeId}/customs/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "chargeId", value: request.chargeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "json", value: request.body, schema: customsDeclarationPatchRequestSchema },
      },
      {
        success: { kind: "json", schema: customsDeclarationWebhookDataSchema },
        errorFactory: Charges.PatchCustomsDeclarationError,
      },
      options,
    );
  }

  /**
   * 課金の更新 (メタデータ)
   *
   * @remarks
   * 既存の課金に対して、任意のメタデータを追加または変更するためにこのリクエストを使用します。
   *
   * @returns 更新された課金情報
   *
   * @throws {@link Charges.UpdateChargeError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateCharge(
    request: Charges.UpdateChargeRequest,
    options?: RequestOptions,
  ): ApiPromise<Charge, Charges.UpdateChargeError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/stores/{storeId}/charges/{id}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "storeId", value: request.storeId, schema: s.string() },
          { name: "id", value: request.id, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => chargeUpdateRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: chargeInternalSchema },
        errorFactory: Charges.UpdateChargeError,
      },
      options,
    );
  }
}

export namespace Charges {
  export type CaptureChargeRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** オーソリ済み課金のキャプチャ用の任意のリクエスト・ペイロード。オーソリ済みの未決済全額をキャプチャするには、完全に省略してください。 */
    body?: ChargeCaptureRequest;
  };

  export class CaptureChargeError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CaptureChargeError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type CreateChargeRequest = {
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 課金作成用のリクエスト・ペイロード。 */
    body?: ChargeCreateRequest;
  };

  export class CreateChargeError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateChargeError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type CreateCustomsDeclarationRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 税関申告作成用のリクエスト・ペイロード。 */
    body: CustomsDeclarationCreateRequest;
  };

  export class CreateCustomsDeclarationError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateCustomsDeclarationError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetChargeRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** true に設定すると、課金ステータスが初期ステータスの 'pending' から別のステータスに変わるまで、API が内部でステータスをポーリングし続けるよう指示します。 */
    polling?: boolean;
  };

  export class GetChargeError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetChargeError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetChargeIssuerTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class GetChargeIssuerTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetChargeIssuerTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetChargeThreeDsIssuerTokenRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class GetChargeThreeDsIssuerTokenError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetChargeThreeDsIssuerTokenError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetCustomsDeclarationRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** 税関申告の一意の識別子。 */
    id: string;
    /** ステータスの変更を待つ間、リクエストの接続を開いたまま保持します。 @default false */
    polling?: boolean;
  };

  export class GetCustomsDeclarationError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetCustomsDeclarationError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
    ];
  }

  export type ListAllChargesRequest = {
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
    /** カードの下4桁でフィルタリングします。**注意:** 指定する場合、`name`、`exp_month`、`exp_year` も含める必要があります。 */
    lastFour?: string;
    /** カード名義人でフィルタリングします。**注意:** 指定する場合、`last_four`、`exp_month`、`exp_year` も含める必要があります。 */
    name?: string;
    /** 有効期限（月）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_year` も含める必要があります。 */
    expMonth?: number;
    /** 有効期限（年）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_month` も含める必要があります。 */
    expYear?: number;
    /** この日付（ISO-8601 形式）以降に作成された課金を表示します。 */
    from?: string;
    /** この日付（ISO-8601 形式）より前に作成された課金を表示します。 */
    to?: string;
    /** メールアドレスでフィルタリングします。 */
    email?: string;
    /** 電話番号でフィルタリングします。 */
    phone?: string;
    /** 金額がこの値以上の課金を表示します。 */
    amountFrom?: number;
    /** 金額がこの値未満の課金を表示します。 */
    amountTo?: number;
    /** 通貨（ISO-4217 形式）でフィルタリングします。 */
    currency?: string;
    /** 環境モード（本番/テスト）でフィルタリングします。 */
    mode?: ModeQuery;
    /** メタデータでフィルタリングします。 */
    metadata?: string;
    /** トランザクション・トークン ID でフィルタリングします。 */
    transactionTokenId?: string;
  };

  export const listAllChargesRequestSchema: Schema<ListAllChargesRequest> = s.lazySchema(() =>
    s.object<ListAllChargesRequest>({
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      lastFour: s.optional(s.string()),
      name: s.optional(s.string()),
      expMonth: s.optional(s.int()),
      expYear: s.optional(s.int()),
      from: s.optional(s.string()),
      to: s.optional(s.string()),
      email: s.optional(s.string().check(s.email())),
      phone: s.optional(s.string()),
      amountFrom: s.optional(s.int()),
      amountTo: s.optional(s.int()),
      currency: s.optional(s.string()),
      mode: s.optional(s.lazy(() => modeQuerySchema)),
      metadata: s.optional(s.string()),
      transactionTokenId: s.optional(s.string()),
    }),
  );

  export class ListAllChargesError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListAllChargesError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListBankTransferLedgersRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
  };

  export class ListBankTransferLedgersError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListBankTransferLedgersError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListStoreChargesRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
    /** カードの下4桁でフィルタリングします。**注意:** 指定する場合、`name`、`exp_month`、`exp_year` も含める必要があります。 */
    lastFour?: string;
    /** カード名義人でフィルタリングします。**注意:** 指定する場合、`last_four`、`exp_month`、`exp_year` も含める必要があります。 */
    name?: string;
    /** 有効期限（月）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_year` も含める必要があります。 */
    expMonth?: number;
    /** 有効期限（年）でフィルタリングします。**注意:** 指定する場合、`last_four`、`name`、`exp_month` も含める必要があります。 */
    expYear?: number;
    /** この日付（ISO-8601 形式）以降に作成された課金を表示します。 */
    from?: string;
    /** この日付（ISO-8601 形式）より前に作成された課金を表示します。 */
    to?: string;
    /** メールアドレスでフィルタリングします。 */
    email?: string;
    /** 電話番号でフィルタリングします。 */
    phone?: string;
    /** 金額がこの値以上の課金を表示します。 */
    amountFrom?: number;
    /** 金額がこの値未満の課金を表示します。 */
    amountTo?: number;
    /** 通貨（ISO-4217 形式）でフィルタリングします。 */
    currency?: string;
    /** 環境モード（本番/テスト）でフィルタリングします。 */
    mode?: ModeQuery;
    /** メタデータでフィルタリングします。 */
    metadata?: string;
    /** トランザクション・トークン ID でフィルタリングします。 */
    transactionTokenId?: string;
  };

  export const listStoreChargesRequestSchema: Schema<ListStoreChargesRequest> = s.lazySchema(() =>
    s.object<ListStoreChargesRequest>({
      storeId: s.string(),
      limit: s.defaulted(s.int().check(s.lte(100)), 10),
      cursor: s.optional(s.string()),
      cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
      lastFour: s.optional(s.string()),
      name: s.optional(s.string()),
      expMonth: s.optional(s.int()),
      expYear: s.optional(s.int()),
      from: s.optional(s.string()),
      to: s.optional(s.string()),
      email: s.optional(s.string().check(s.email())),
      phone: s.optional(s.string()),
      amountFrom: s.optional(s.int()),
      amountTo: s.optional(s.int()),
      currency: s.optional(s.string()),
      mode: s.optional(s.lazy(() => modeQuerySchema)),
      metadata: s.optional(s.string()),
      transactionTokenId: s.optional(s.string()),
    }),
  );

  export class ListStoreChargesError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListStoreChargesError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type PatchCustomsDeclarationRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** 課金の一意の識別子。 */
    chargeId: string;
    /** 税関申告の一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 税関申告パッチ用のリクエスト・ペイロード。 */
    body: CustomsDeclarationPatchRequest;
  };

  export class PatchCustomsDeclarationError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<PatchCustomsDeclarationError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type UpdateChargeRequest = {
    /** 店舗の一意の識別子。 */
    storeId: string;
    /** リソースの一意の識別子。 */
    id: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 課金メタデータ更新用のリクエスト・ペイロード。 */
    body?: ChargeUpdateRequest;
  };

  export class UpdateChargeError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateChargeError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
