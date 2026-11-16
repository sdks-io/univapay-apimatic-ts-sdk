import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { apiErrorModelSchema, type ApiErrorModel } from "../models/api-error-model.js";
import { CursorDirectionQuery, cursorDirectionQuerySchema } from "../models/cursor-direction-query.js";
import {
  directDebitBankAccountCreateRequestInternalSchema,
  type DirectDebitBankAccountCreateRequest,
} from "../models/direct-debit-bank-account-create-request.js";
import {
  directDebitBankAccountListInternalSchema,
  type DirectDebitBankAccountList,
} from "../models/direct-debit-bank-account-list.js";
import {
  directDebitBankAccountStatusSchema,
  type DirectDebitBankAccountStatus,
} from "../models/direct-debit-bank-account-status.js";
import {
  directDebitBankAccountTypeSchema,
  type DirectDebitBankAccountType,
} from "../models/direct-debit-bank-account-type.js";
import {
  directDebitBankAccountUpdateRequestInternalSchema,
  directDebitBankAccountUpdateRequestSchema,
  type DirectDebitBankAccountUpdateRequest,
} from "../models/direct-debit-bank-account-update-request.js";
import {
  directDebitBankAccountInternalSchema,
  type DirectDebitBankAccount,
} from "../models/direct-debit-bank-account.js";
import {
  directDebitBankTransferCreateRequestInternalSchema,
  directDebitBankTransferCreateRequestSchema,
  type DirectDebitBankTransferCreateRequest,
} from "../models/direct-debit-bank-transfer-create-request.js";
import {
  directDebitBankTransferListInternalSchema,
  type DirectDebitBankTransferList,
} from "../models/direct-debit-bank-transfer-list.js";
import {
  directDebitBankTransferLockSchema,
  type DirectDebitBankTransferLock,
} from "../models/direct-debit-bank-transfer-lock.js";
import {
  directDebitBankTransferPatchRequestInternalSchema,
  directDebitBankTransferPatchRequestSchema,
  type DirectDebitBankTransferPatchRequest,
} from "../models/direct-debit-bank-transfer-patch-request.js";
import {
  directDebitBankTransferStatusSchema,
  type DirectDebitBankTransferStatus,
} from "../models/direct-debit-bank-transfer-status.js";
import {
  directDebitBankTransferInternalSchema,
  type DirectDebitBankTransfer,
} from "../models/direct-debit-bank-transfer.js";
import { directDebitDebitDateSchema, type DirectDebitDebitDate } from "../models/direct-debit-debit-date.js";
import {
  directDebitMerchantConfigurationInternalSchema,
  type DirectDebitMerchantConfiguration,
} from "../models/direct-debit-merchant-configuration.js";
import {
  directDebitNotificationConfigurationSchema,
  type DirectDebitNotificationConfiguration,
} from "../models/direct-debit-notification-configuration.js";
import {
  directDebitRegistrationOriginSchema,
  type DirectDebitRegistrationOrigin,
} from "../models/direct-debit-registration-origin.js";
import { directDebitScheduleSchema, type DirectDebitSchedule } from "../models/direct-debit-schedule.js";
import type { Servers } from "../servers.js";

/**
 * 消費者の銀行口座を登録し、毎月固定の振替日区分で引き落とす継続的な口座振替を予約するためのエンドポイント。
 */
export class DirectDebit {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * 口座振替の銀行口座を登録
   *
   * @remarks
   * 消費者の銀行口座を口座振替に登録します。作成後に銀行側での確認が行われるため、直後は利用できません。振替を予約する前に `status` をポーリングし、`active` (または
   * `registration_failed`) になるまで待ってください。
   *
   * @returns 銀行口座を登録しました
   *
   * @throws {@link DirectDebit.CreateDirectDebitBankAccountError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createDirectDebitBankAccount(
    request: DirectDebit.CreateDirectDebitBankAccountRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankAccount, DirectDebit.CreateDirectDebitBankAccountError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-accounts"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "merchantId", value: request.merchantId, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: directDebitBankAccountCreateRequestInternalSchema,
        },
      },
      {
        success: { kind: "json", schema: directDebitBankAccountInternalSchema },
        errorFactory: DirectDebit.CreateDirectDebitBankAccountError,
      },
      options,
    );
  }

  /**
   * 口座振替の振替を予約
   *
   * @remarks
   * 有効な銀行口座からの資金の引き落としを予約します。振替は加盟店の次の振替日区分に登録され、その区分のアップロード期限までは編集できます。
   *
   * @returns 振替を予約しました
   *
   * @throws {@link DirectDebit.CreateDirectDebitBankTransferError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  createDirectDebitBankTransfer(
    request: DirectDebit.CreateDirectDebitBankTransferRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankTransfer, DirectDebit.CreateDirectDebitBankTransferError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.directDebit(
          "/merchants/{merchantId}/bank-accounts/{bankAccountId}/bank-transfers",
        ),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankAccountId", value: request.bankAccountId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: directDebitBankTransferCreateRequestInternalSchema,
        },
      },
      {
        success: { kind: "json", schema: directDebitBankTransferInternalSchema },
        errorFactory: DirectDebit.CreateDirectDebitBankTransferError,
      },
      options,
    );
  }

  /**
   * 口座振替の銀行口座を無効化
   *
   * @remarks
   * 銀行口座を無効化し、以降その口座に振替を登録できないようにします。レコードは削除されずステータスが `inactive` になり、後から再有効化できます。
   *
   * @returns 銀行口座を無効化しました
   *
   * @throws {@link DirectDebit.DeactivateDirectDebitBankAccountError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  deactivateDirectDebitBankAccount(
    request: DirectDebit.DeactivateDirectDebitBankAccountRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankAccount, DirectDebit.DeactivateDirectDebitBankAccountError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-accounts/{bankAccountId}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankAccountId", value: request.bankAccountId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitBankAccountInternalSchema },
        errorFactory: DirectDebit.DeactivateDirectDebitBankAccountError,
      },
      options,
    );
  }

  /**
   * 口座振替の振替を削除
   *
   * @remarks
   * 予約済みの振替を取り消し、銀行に送信されないようにします。振替が `unlocked` の場合にのみ許可されます。
   *
   * @returns 振替を削除しました。レスポンスボディはありません。
   *
   * @throws {@link DirectDebit.DeleteDirectDebitBankTransferError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  deleteDirectDebitBankTransfer(
    request: DirectDebit.DeleteDirectDebitBankTransferRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, DirectDebit.DeleteDirectDebitBankTransferError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-transfers/{bankTransferId}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankTransferId", value: request.bankTransferId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: DirectDebit.DeleteDirectDebitBankTransferError,
      },
      options,
    );
  }

  /**
   * 口座振替の銀行口座を取得
   *
   * @remarks
   * 登録済みの銀行口座を1件取得します。現在の確認ステータスも含まれます。
   *
   * @returns 銀行口座
   *
   * @throws {@link DirectDebit.GetDirectDebitBankAccountError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getDirectDebitBankAccount(
    request: DirectDebit.GetDirectDebitBankAccountRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankAccount, DirectDebit.GetDirectDebitBankAccountError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-accounts/{bankAccountId}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankAccountId", value: request.bankAccountId, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitBankAccountInternalSchema },
        errorFactory: DirectDebit.GetDirectDebitBankAccountError,
      },
      options,
    );
  }

  /**
   * 口座振替の振替を取得
   *
   * @remarks
   * 振替を1件取得します。振替結果反映日以降にポーリングすることで、結果と、失敗した場合は銀行が報告した理由を取得できます。
   *
   * @returns 振替
   *
   * @throws {@link DirectDebit.GetDirectDebitBankTransferError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getDirectDebitBankTransfer(
    request: DirectDebit.GetDirectDebitBankTransferRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankTransfer, DirectDebit.GetDirectDebitBankTransferError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-transfers/{bankTransferId}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankTransferId", value: request.bankTransferId, schema: s.string() },
        ],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitBankTransferInternalSchema },
        errorFactory: DirectDebit.GetDirectDebitBankTransferError,
      },
      options,
    );
  }

  /**
   * 口座振替の設定を取得
   *
   * @remarks
   * 加盟店の口座振替設定を取得します。口座振替が有効かどうか、および適用される毎月の振替日区分が含まれます。
   *
   * @returns 口座振替の設定
   *
   * @throws {@link DirectDebit.GetDirectDebitConfigurationError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getDirectDebitConfiguration(
    request: DirectDebit.GetDirectDebitConfigurationRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitMerchantConfiguration, DirectDebit.GetDirectDebitConfigurationError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/configuration"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "merchantId", value: request.merchantId, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitMerchantConfigurationInternalSchema },
        errorFactory: DirectDebit.GetDirectDebitConfigurationError,
      },
      options,
    );
  }

  /**
   * 現在の振替日区分を取得
   *
   * @remarks
   * 加盟店に設定された振替日区分に基づき、進行中の区分の主要な日付を取得します。`merchant_bank_account_upload_deadline`
   * を当日と比較して、当月まだ振替を登録・編集できるかを判断してください。
   *
   * @returns 現在の振替日区分
   *
   * @throws {@link DirectDebit.GetDirectDebitCurrentScheduleError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getDirectDebitCurrentSchedule(
    request: DirectDebit.GetDirectDebitCurrentScheduleRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitSchedule, DirectDebit.GetDirectDebitCurrentScheduleError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/schedules/current"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "merchantId", value: request.merchantId, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitScheduleSchema },
        errorFactory: DirectDebit.GetDirectDebitCurrentScheduleError,
      },
      options,
    );
  }

  /**
   * 口座振替の通知設定を取得
   *
   * @remarks
   * 加盟店が受信を選択している口座振替のメール通知を取得します。
   *
   * @returns 通知設定
   *
   * @throws {@link DirectDebit.GetDirectDebitNotificationConfigurationError} when the API answers
   * with an error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  getDirectDebitNotificationConfiguration(
    request: DirectDebit.GetDirectDebitNotificationConfigurationRequest,
    options?: RequestOptions,
  ): ApiPromise<
    DirectDebitNotificationConfiguration,
    DirectDebit.GetDirectDebitNotificationConfigurationError
  > {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/notification-configuration"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "merchantId", value: request.merchantId, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitNotificationConfigurationSchema },
        errorFactory: DirectDebit.GetDirectDebitNotificationConfigurationError,
      },
      options,
    );
  }

  /**
   * 口座振替の銀行口座一覧を取得
   *
   * @remarks
   * この加盟店で口座振替のために登録されている消費者の銀行口座を一覧します。
   *
   * @returns 銀行口座の一覧
   *
   * @throws {@link DirectDebit.ListDirectDebitBankAccountsError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listDirectDebitBankAccounts(
    request: DirectDebit.ListDirectDebitBankAccountsRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankAccountList, DirectDebit.ListDirectDebitBankAccountsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-accounts"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "merchantId", value: request.merchantId, schema: s.string() }],
        query: [
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
          { name: "user_number", value: request.userNumber, schema: s.optional(s.string()) },
          { name: "bank_account_id", value: request.bankAccountId, schema: s.optional(s.string()) },
          { name: "bank_code", value: request.bankCode, schema: s.optional(s.string()) },
          { name: "bank_name", value: request.bankName, schema: s.optional(s.string()) },
          { name: "branch_code", value: request.branchCode, schema: s.optional(s.string()) },
          {
            name: "bank_account_type",
            value: request.bankAccountType,
            schema: s.optional(s.lazy(() => directDebitBankAccountTypeSchema)),
          },
          { name: "bank_account_number", value: request.bankAccountNumber, schema: s.optional(s.string()) },
          { name: "bank_account_name", value: request.bankAccountName, schema: s.optional(s.string()) },
          {
            name: "registration_origin",
            value: request.registrationOrigin,
            schema: s.optional(s.lazy(() => directDebitRegistrationOriginSchema)),
          },
          {
            name: "bank_account_status",
            value: request.bankAccountStatus,
            schema: s.optional(s.lazy(() => directDebitBankAccountStatusSchema)),
          },
          { name: "from", value: request.from, schema: s.optional(s.string()) },
          { name: "to", value: request.to, schema: s.optional(s.string()) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitBankAccountListInternalSchema },
        errorFactory: DirectDebit.ListDirectDebitBankAccountsError,
      },
      options,
    );
  }

  /**
   * 口座振替の振替一覧を取得
   *
   * @remarks
   * この加盟店で登録されている口座振替の振替を、すべての銀行口座にまたがって一覧します。
   *
   * @returns 振替の一覧
   *
   * @throws {@link DirectDebit.ListDirectDebitBankTransfersError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  listDirectDebitBankTransfers(
    request: DirectDebit.ListDirectDebitBankTransfersRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankTransferList, DirectDebit.ListDirectDebitBankTransfersError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-transfers"),
        auth: this.#auth.jwtToken,
        pathParams: [{ name: "merchantId", value: request.merchantId, schema: s.string() }],
        query: [
          { name: "limit", value: request.limit, schema: s.defaulted(s.int(), 10) },
          { name: "cursor", value: request.cursor, schema: s.optional(s.string()) },
          {
            name: "cursor_direction",
            value: request.cursorDirection,
            schema: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
          },
          { name: "bank_transfer_id", value: request.bankTransferId, schema: s.optional(s.string()) },
          { name: "bank_transfer_start", value: request.bankTransferStart, schema: s.optional(s.string()) },
          { name: "bank_transfer_end", value: request.bankTransferEnd, schema: s.optional(s.string()) },
          {
            name: "debit_date",
            value: request.debitDate,
            schema: s.optional(s.lazy(() => directDebitDebitDateSchema)),
          },
          { name: "user_number", value: request.userNumber, schema: s.optional(s.string()) },
          { name: "bank_account_number", value: request.bankAccountNumber, schema: s.optional(s.string()) },
          { name: "bank_account_name", value: request.bankAccountName, schema: s.optional(s.string()) },
          {
            name: "lock_status",
            value: request.lockStatus,
            schema: s.optional(s.lazy(() => directDebitBankTransferLockSchema)),
          },
          {
            name: "bank_transfer_status",
            value: request.bankTransferStatus,
            schema: s.optional(s.lazy(() => directDebitBankTransferStatusSchema)),
          },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitBankTransferListInternalSchema },
        errorFactory: DirectDebit.ListDirectDebitBankTransfersError,
      },
      options,
    );
  }

  /**
   * 口座振替の銀行口座を再有効化
   *
   * @remarks
   * 無効化された銀行口座を `active` に戻し、再び振替を登録できるようにします。対象の口座は現在 `inactive` である必要があります。
   *
   * @returns 銀行口座を再有効化しました
   *
   * @throws {@link DirectDebit.ReenableDirectDebitBankAccountError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  reenableDirectDebitBankAccount(
    request: DirectDebit.ReenableDirectDebitBankAccountRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankAccount, DirectDebit.ReenableDirectDebitBankAccountError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.directDebit(
          "/merchants/{merchantId}/bank-accounts/{bankAccountId}/re-enable",
        ),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankAccountId", value: request.bankAccountId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: directDebitBankAccountInternalSchema },
        errorFactory: DirectDebit.ReenableDirectDebitBankAccountError,
      },
      options,
    );
  }

  /**
   * 口座振替の銀行口座を更新
   *
   * @remarks
   * 登録済みの銀行口座を更新します。銀行情報を変更すると銀行側での確認が再度実行されます。すでに登録済みの振替は登録時点の情報を保持します。
   *
   * @returns 銀行口座を更新しました
   *
   * @throws {@link DirectDebit.UpdateDirectDebitBankAccountError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateDirectDebitBankAccount(
    request: DirectDebit.UpdateDirectDebitBankAccountRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankAccount, DirectDebit.UpdateDirectDebitBankAccountError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-accounts/{bankAccountId}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankAccountId", value: request.bankAccountId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: directDebitBankAccountUpdateRequestInternalSchema,
        },
      },
      {
        success: { kind: "json", schema: directDebitBankAccountInternalSchema },
        errorFactory: DirectDebit.UpdateDirectDebitBankAccountError,
      },
      options,
    );
  }

  /**
   * 口座振替の振替を更新
   *
   * @remarks
   * 予約済みの振替の金額を変更します。振替が `unlocked` の場合にのみ許可され、その区分のアップロード期限を過ぎると金額は確定します。
   *
   * @returns 振替を更新しました
   *
   * @throws {@link DirectDebit.UpdateDirectDebitBankTransferError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnivapayPublicApiError} when no usable response was produced: a connection
   * failure, a timeout, a body that would not decode, a value that would not encode, or a
   * credential that could not be obtained
   */
  updateDirectDebitBankTransfer(
    request: DirectDebit.UpdateDirectDebitBankTransferRequest,
    options?: RequestOptions,
  ): ApiPromise<DirectDebitBankTransfer, DirectDebit.UpdateDirectDebitBankTransferError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.directDebit("/merchants/{merchantId}/bank-transfers/{bankTransferId}"),
        auth: this.#auth.jwtToken,
        pathParams: [
          { name: "merchantId", value: request.merchantId, schema: s.string() },
          { name: "bankTransferId", value: request.bankTransferId, schema: s.string() },
        ],
        query: [],
        headers: [{ name: "Idempotency-Key", value: request.idempotencyKey, schema: s.optional(s.string()) }],
        body: {
          kind: "json",
          value: request.body,
          schema: directDebitBankTransferPatchRequestInternalSchema,
        },
      },
      {
        success: { kind: "json", schema: directDebitBankTransferInternalSchema },
        errorFactory: DirectDebit.UpdateDirectDebitBankTransferError,
      },
      options,
    );
  }
}

export namespace DirectDebit {
  export type CreateDirectDebitBankAccountRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 消費者の銀行口座を登録するためのリクエストペイロード。 */
    body: DirectDebitBankAccountCreateRequest;
  };

  export class CreateDirectDebitBankAccountError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateDirectDebitBankAccountError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type CreateDirectDebitBankTransferRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の銀行口座の一意な識別子。 */
    bankAccountId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 振替を予約するためのリクエストペイロード (日本円)。 */
    body: DirectDebitBankTransferCreateRequest;
  };

  export const createDirectDebitBankTransferRequestSchema: Schema<CreateDirectDebitBankTransferRequest> =
    s.lazySchema(() =>
      s.object<CreateDirectDebitBankTransferRequest>({
        merchantId: s.string(),
        bankAccountId: s.string().check(s.pattern("^[0-9]+$")),
        idempotencyKey: s.optional(s.string()),
        body: directDebitBankTransferCreateRequestSchema,
      }),
    );

  export class CreateDirectDebitBankTransferError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<CreateDirectDebitBankTransferError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type DeactivateDirectDebitBankAccountRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の銀行口座の一意な識別子。 */
    bankAccountId: string;
  };

  export const deactivateDirectDebitBankAccountRequestSchema: Schema<DeactivateDirectDebitBankAccountRequest> =
    s.lazySchema(() =>
      s.object<DeactivateDirectDebitBankAccountRequest>({
        merchantId: s.string(),
        bankAccountId: s.string().check(s.pattern("^[0-9]+$")),
      }),
    );

  export class DeactivateDirectDebitBankAccountError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<DeactivateDirectDebitBankAccountError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type DeleteDirectDebitBankTransferRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の振替の一意な識別子。 */
    bankTransferId: string;
  };

  export const deleteDirectDebitBankTransferRequestSchema: Schema<DeleteDirectDebitBankTransferRequest> =
    s.lazySchema(() =>
      s.object<DeleteDirectDebitBankTransferRequest>({
        merchantId: s.string(),
        bankTransferId: s.string().check(s.pattern("^[0-9]+$")),
      }),
    );

  export class DeleteDirectDebitBankTransferError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<DeleteDirectDebitBankTransferError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetDirectDebitBankAccountRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の銀行口座の一意な識別子。 */
    bankAccountId: string;
  };

  export const getDirectDebitBankAccountRequestSchema: Schema<GetDirectDebitBankAccountRequest> =
    s.lazySchema(() =>
      s.object<GetDirectDebitBankAccountRequest>({
        merchantId: s.string(),
        bankAccountId: s.string().check(s.pattern("^[0-9]+$")),
      }),
    );

  export class GetDirectDebitBankAccountError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetDirectDebitBankAccountError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetDirectDebitBankTransferRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の振替の一意な識別子。 */
    bankTransferId: string;
  };

  export const getDirectDebitBankTransferRequestSchema: Schema<GetDirectDebitBankTransferRequest> =
    s.lazySchema(() =>
      s.object<GetDirectDebitBankTransferRequest>({
        merchantId: s.string(),
        bankTransferId: s.string().check(s.pattern("^[0-9]+$")),
      }),
    );

  export class GetDirectDebitBankTransferError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetDirectDebitBankTransferError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetDirectDebitConfigurationRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
  };

  export class GetDirectDebitConfigurationError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetDirectDebitConfigurationError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetDirectDebitCurrentScheduleRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
  };

  export class GetDirectDebitCurrentScheduleError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetDirectDebitCurrentScheduleError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type GetDirectDebitNotificationConfigurationRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
  };

  export class GetDirectDebitNotificationConfigurationError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<GetDirectDebitNotificationConfigurationError> = [
      { on: 401, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListDirectDebitBankAccountsRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
    /** 加盟店が消費者に割り当てた会員番号で絞り込みます。 */
    userNumber?: string;
    /** 単一の銀行口座IDで絞り込みます。 */
    bankAccountId?: string;
    /** 4桁の銀行コードで絞り込みます。 */
    bankCode?: string;
    /** 半角カタカナの銀行名で絞り込みます。 */
    bankName?: string;
    /** 3桁の支店コードで絞り込みます。 */
    branchCode?: string;
    /** 預金種類で絞り込みます。 */
    bankAccountType?: DirectDebitBankAccountType;
    /** 7桁の口座番号で絞り込みます。 */
    bankAccountNumber?: string;
    /** 半角カタカナの口座名義で絞り込みます。 */
    bankAccountName?: string;
    /** 銀行口座の登録元で絞り込みます。 */
    registrationOrigin?: DirectDebitRegistrationOrigin;
    /** 銀行口座のステータスで絞り込みます。省略するとすべてのステータスが返されます。 */
    bankAccountStatus?: DirectDebitBankAccountStatus;
    /** この日時以降に作成された銀行口座を表示します (ISO-8601)。 */
    from?: string;
    /** この日時より前に作成された銀行口座を表示します (ISO-8601)。 */
    to?: string;
  };

  export const listDirectDebitBankAccountsRequestSchema: Schema<ListDirectDebitBankAccountsRequest> =
    s.lazySchema(() =>
      s.object<ListDirectDebitBankAccountsRequest>({
        merchantId: s.string(),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
        userNumber: s.optional(s.string().check(s.pattern("^[a-zA-Z0-9]+$"))),
        bankAccountId: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
        bankCode: s.optional(s.string().check(s.minLength(4), s.maxLength(4), s.pattern("^[0-9]{4}$"))),
        bankName: s.optional(s.string().check(s.maxLength(15))),
        branchCode: s.optional(s.string().check(s.minLength(3), s.maxLength(3), s.pattern("^[0-9]{3}$"))),
        bankAccountType: s.optional(s.lazy(() => directDebitBankAccountTypeSchema)),
        bankAccountNumber: s.optional(
          s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{7}$")),
        ),
        bankAccountName: s.optional(
          s.string().check(s.maxLength(30), s.pattern("^[A-Z0-9ｱ-ﾝﾞﾟ().\\- ]{1,30}$")),
        ),
        registrationOrigin: s.optional(s.lazy(() => directDebitRegistrationOriginSchema)),
        bankAccountStatus: s.optional(s.lazy(() => directDebitBankAccountStatusSchema)),
        from: s.optional(s.string()),
        to: s.optional(s.string()),
      }),
    );

  export class ListDirectDebitBankAccountsError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListDirectDebitBankAccountsError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ListDirectDebitBankTransfersRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 1ページに返されるリソースの最大数。 @default 10 */
    limit?: number;
    /** ページネーションを継続するための、次のリソースを指すカーソル。 */
    cursor?: string;
    /** 指定されたカーソルに対するページネーションの方向。 @default CursorDirectionQuery.Desc */
    cursorDirection?: CursorDirectionQuery;
    /** 単一の振替IDで絞り込みます。 */
    bankTransferId?: string;
    /** 振替が予定されている年月の範囲の開始。 */
    bankTransferStart?: string;
    /** 振替が予定されている年月の範囲の終了。 */
    bankTransferEnd?: string;
    /** 毎月の振替日区分で絞り込みます。 */
    debitDate?: DirectDebitDebitDate;
    /** 加盟店が消費者に割り当てた会員番号で絞り込みます。 */
    userNumber?: string;
    /** 7桁の口座番号で絞り込みます。 */
    bankAccountNumber?: string;
    /** 半角カタカナの口座名義で絞り込みます。 */
    bankAccountName?: string;
    /** ロック状態で絞り込みます。省略するとロック済みと未ロックの両方が返されます。 */
    lockStatus?: DirectDebitBankTransferLock;
    /** 振替のステータスで絞り込みます。省略するとすべてのステータスが返されます。 */
    bankTransferStatus?: DirectDebitBankTransferStatus;
  };

  export const listDirectDebitBankTransfersRequestSchema: Schema<ListDirectDebitBankTransfersRequest> =
    s.lazySchema(() =>
      s.object<ListDirectDebitBankTransfersRequest>({
        merchantId: s.string(),
        limit: s.defaulted(s.int().check(s.lte(100)), 10),
        cursor: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
        cursorDirection: s.defaulted(cursorDirectionQuerySchema, CursorDirectionQuery.Desc),
        bankTransferId: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
        bankTransferStart: s.optional(s.string().check(s.pattern("^[0-9]{4}-[0-9]{2}$"))),
        bankTransferEnd: s.optional(s.string().check(s.pattern("^[0-9]{4}-[0-9]{2}$"))),
        debitDate: s.optional(s.lazy(() => directDebitDebitDateSchema)),
        userNumber: s.optional(s.string().check(s.pattern("^[a-zA-Z0-9]+$"))),
        bankAccountNumber: s.optional(
          s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{7}$")),
        ),
        bankAccountName: s.optional(
          s.string().check(s.maxLength(30), s.pattern("^[A-Z0-9ｱ-ﾝﾞﾟ().\\- ]{1,30}$")),
        ),
        lockStatus: s.optional(s.lazy(() => directDebitBankTransferLockSchema)),
        bankTransferStatus: s.optional(s.lazy(() => directDebitBankTransferStatusSchema)),
      }),
    );

  export class ListDirectDebitBankTransfersError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ListDirectDebitBankTransfersError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type ReenableDirectDebitBankAccountRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の銀行口座の一意な識別子。 */
    bankAccountId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
  };

  export const reenableDirectDebitBankAccountRequestSchema: Schema<ReenableDirectDebitBankAccountRequest> =
    s.lazySchema(() =>
      s.object<ReenableDirectDebitBankAccountRequest>({
        merchantId: s.string(),
        bankAccountId: s.string().check(s.pattern("^[0-9]+$")),
        idempotencyKey: s.optional(s.string()),
      }),
    );

  export class ReenableDirectDebitBankAccountError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<ReenableDirectDebitBankAccountError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type UpdateDirectDebitBankAccountRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の銀行口座の一意な識別子。 */
    bankAccountId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 登録済みの銀行口座を更新するためのリクエストペイロード。 */
    body: DirectDebitBankAccountUpdateRequest;
  };

  export const updateDirectDebitBankAccountRequestSchema: Schema<UpdateDirectDebitBankAccountRequest> =
    s.lazySchema(() =>
      s.object<UpdateDirectDebitBankAccountRequest>({
        merchantId: s.string(),
        bankAccountId: s.string().check(s.pattern("^[0-9]+$")),
        idempotencyKey: s.optional(s.string()),
        body: directDebitBankAccountUpdateRequestSchema,
      }),
    );

  export class UpdateDirectDebitBankAccountError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateDirectDebitBankAccountError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }

  export type UpdateDirectDebitBankTransferRequest = {
    /** 加盟店の一意の識別子。 */
    merchantId: string;
    /** 口座振替の振替の一意な識別子。 */
    bankTransferId: string;
    /** 二重課金や重複操作を防ぐための任意のべき等キー。ランダムに生成された UUID (v4) を推奨します。 */
    idempotencyKey?: string;
    /** 振替金額を変更するためのリクエストペイロード。 */
    body: DirectDebitBankTransferPatchRequest;
  };

  export const updateDirectDebitBankTransferRequestSchema: Schema<UpdateDirectDebitBankTransferRequest> =
    s.lazySchema(() =>
      s.object<UpdateDirectDebitBankTransferRequest>({
        merchantId: s.string(),
        bankTransferId: s.string().check(s.pattern("^[0-9]+$")),
        idempotencyKey: s.optional(s.string()),
        body: directDebitBankTransferPatchRequestSchema,
      }),
    );

  export class UpdateDirectDebitBankTransferError extends ApiError {
    declare readonly payload:
      | Declared<"apiErrorModel", ApiErrorModel>
      | Declared<"apiErrorModel2", ApiErrorModel>
      | Declared<"apiErrorModel3", ApiErrorModel>
      | Declared<"apiErrorModel4", ApiErrorModel>
      | Declared<"error429", Record<string, unknown>>
      | Undeclared;

    static readonly errors: ErrorDecoders<UpdateDirectDebitBankTransferError> = [
      { on: 400, kind: "apiErrorModel", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 401, kind: "apiErrorModel2", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 403, kind: "apiErrorModel3", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 404, kind: "apiErrorModel4", decode: { kind: "json", schema: apiErrorModelSchema } },
      { on: 429, kind: "error429", decode: { kind: "json", schema: s.record(s.string(), s.unknown()) } },
    ];
  }
}
