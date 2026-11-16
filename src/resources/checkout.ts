import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import { checkoutInfoInternalSchema, type CheckoutInfo } from "../models/checkout-info.js";
import type { Servers } from "../servers.js";

/**
 * 加盟店のチェックアウトウィジェット設定（有効な決済手段、上限、ブランディング、ブランドごとの機能サポート）を取得するためのエンドポイント。
 */
export class Checkout {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * チェックアウト情報の取得
   *
   * @remarks
   * 加盟店のチェックアウト設定（有効な決済手段とその上限、分割払い・定期課金プランの設定、コンビニおよび銀行振込の設定、ウィジェットテーマ、ブランドごとの機能サポート）を返します。ベアラー資格情報のみから解決され、パラメータは不要です。
   *
   * @returns チェックアウト設定。
   *
   * @throws {@link Checkout.GetCheckoutInfoError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getCheckoutInfo(options?: RequestOptions): ApiPromise<CheckoutInfo, Checkout.GetCheckoutInfoError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/checkout_info"),
        auth: this.#auth.jwtToken,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: checkoutInfoInternalSchema },
        errorFactory: Checkout.GetCheckoutInfoError,
      },
      options,
    );
  }
}

export namespace Checkout {
  export class GetCheckoutInfoError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetCheckoutInfoError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
