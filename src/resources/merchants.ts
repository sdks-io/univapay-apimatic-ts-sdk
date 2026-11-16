import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import { merchantInternalSchema, type Merchant } from "../models/merchant.js";
import type { Servers } from "../servers.js";

/**
 * 認証されたオペレーター向けの、加盟店の識別情報および有効な設定を取得するエンドポイント。
 */
export class Merchants {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 現在の加盟店コンテキストの取得
   *
   * @remarks
   * ベアラ資格情報から解決された加盟店の識別情報と有効な設定を返します。加盟店統合における標準的なイントロスペクション（自己分析）エンドポイントとして扱ってください。
   *
   * @returns 現在の加盟店コンテキスト。
   *
   * @throws {@link Merchants.GetCurrentMerchantError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getCurrentMerchant(options?: RequestOptions): ApiPromise<Merchant, Merchants.GetCurrentMerchantError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/me"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: merchantInternalSchema },
        errorFactory: Merchants.GetCurrentMerchantError,
      },
      options,
    );
  }
}

export namespace Merchants {
  export class GetCurrentMerchantError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetCurrentMerchantError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
