import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { chargeModeSchema, type ChargeMode } from "./charge-mode.js";
import {
  chargeRedirectInternalSchema,
  chargeRedirectSchema,
  type ChargeRedirect,
} from "./charge-redirect.js";
import { chargeStatusSchema, type ChargeStatus } from "./charge-status.js";
import { chargeThreeDsInternalSchema, chargeThreeDsSchema, type ChargeThreeDs } from "./charge-three-ds.js";
import {
  chargeTransactionTokenTypeSchema,
  type ChargeTransactionTokenType,
} from "./charge-transaction-token-type.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import { paymentErrorSchema, type PaymentError } from "./payment-error.js";

/** 決済APIによって返される課金（チャージ）リソース。 */
export type Charge = {
  /** 一意の識別子。 */
  id?: string;
  /** 店舗識別子。 */
  storeId?: string;
  /** トランザクション・トークン識別子。 */
  transactionTokenId?: string;
  /** 課金トランザクション・トークンタイプのスキーマ。 */
  transactionTokenType?: ChargeTransactionTokenType;
  /** 定期課金識別子。 */
  subscriptionId?: string | null;
  /** 加盟店定義のトランザクション識別子。 */
  merchantTransactionId?: string | null;
  /** 通貨の最小単位で指定された要求金額。 */
  requestedAmount?: number;
  /** 要求された ISO-4217 通貨コード。 */
  requestedCurrency?: string;
  /** 表示用にフォーマットされた要求金額。 */
  requestedAmountFormatted?: number;
  /** 通貨の最小単位で指定された課金金額。 */
  chargedAmount?: number | null;
  /** 課金された ISO-4217 通貨コード。 */
  chargedCurrency?: string | null;
  /** 表示用にフォーマットされた課金金額。 */
  chargedAmountFormatted?: number | null;
  /** 通貨の最小単位で指定された手数料額。 */
  feeAmount?: number | null;
  /** 手数料の ISO-4217 通貨コード。 */
  feeCurrency?: string | null;
  /** 表示用にフォーマットされた手数料額。 */
  feeAmountFormatted?: number | null;
  /** 直接通貨処理（現地通貨決済）のみを許可するかどうか。 */
  onlyDirectCurrency?: boolean;
  /** キャプチャを処理すべきタイムスタンプ。 */
  captureAt?: Date | null;
  /** 利用明細書表記（ディスクリプタ）。 */
  descriptor?: string | null;
  /** 利用明細書に記載される電話番号。 */
  descriptorPhoneNumber?: string | null;
  /** 課金ステータスのスキーマ。 */
  status?: ChargeStatus;
  /** 決済エラーの詳細。成功した場合は null。 */
  error?: PaymentError | null;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 課金モードのスキーマ。 */
  mode?: ChargeMode;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** 加盟店の表示名。 */
  merchantName?: string;
  /** 店舗の表示名。 */
  storeName?: string;
  /** 課金リダイレクトのスキーマ。 */
  redirect?: ChargeRedirect;
  /** 課金3Dセキュアのスキーマ。 */
  threeDs?: ChargeThreeDs;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeProperties: s.Shape<Charge> = {
  id: s.optional(s.string()),
  storeId: s.optional(s.string()),
  transactionTokenId: s.optional(s.string()),
  transactionTokenType: s.optional(s.lazy(() => chargeTransactionTokenTypeSchema)),
  subscriptionId: s.optionalNullable(s.string()),
  merchantTransactionId: s.optionalNullable(s.string()),
  requestedAmount: s.optional(s.int()),
  requestedCurrency: s.optional(s.string()),
  requestedAmountFormatted: s.optional(s.float64()),
  chargedAmount: s.optionalNullable(s.int()),
  chargedCurrency: s.optionalNullable(s.string()),
  chargedAmountFormatted: s.optionalNullable(s.float64()),
  feeAmount: s.optionalNullable(s.int()),
  feeCurrency: s.optionalNullable(s.string()),
  feeAmountFormatted: s.optionalNullable(s.float64()),
  onlyDirectCurrency: s.optional(s.boolean()),
  captureAt: s.optionalNullable(s.dateTime()),
  descriptor: s.optionalNullable(s.string()),
  descriptorPhoneNumber: s.optionalNullable(s.string()),
  status: s.optional(s.lazy(() => chargeStatusSchema)),
  error: s.optionalNullable(s.lazy(() => paymentErrorSchema)),
  metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  mode: s.optional(s.lazy(() => chargeModeSchema)),
  createdOn: s.optional(s.dateTime()),
  merchantName: s.optional(s.string()),
  storeName: s.optional(s.string()),
  redirect: s.optional(s.lazy(() => chargeRedirectInternalSchema)),
  threeDs: s.optional(s.lazy(() => chargeThreeDsInternalSchema)),
  _keysMap: {
    storeId: "store_id",
    transactionTokenId: "transaction_token_id",
    transactionTokenType: "transaction_token_type",
    subscriptionId: "subscription_id",
    merchantTransactionId: "merchant_transaction_id",
    requestedAmount: "requested_amount",
    requestedCurrency: "requested_currency",
    requestedAmountFormatted: "requested_amount_formatted",
    chargedAmount: "charged_amount",
    chargedCurrency: "charged_currency",
    chargedAmountFormatted: "charged_amount_formatted",
    feeAmount: "fee_amount",
    feeCurrency: "fee_currency",
    feeAmountFormatted: "fee_amount_formatted",
    onlyDirectCurrency: "only_direct_currency",
    captureAt: "capture_at",
    descriptorPhoneNumber: "descriptor_phone_number",
    createdOn: "created_on",
    merchantName: "merchant_name",
    storeName: "store_name",
    threeDs: "three_ds",
  },
};

export const chargeInternalSchema: Schema<Charge> = s.object<Charge>(chargeProperties, {
  additionalProperties: s.json(),
});

export const chargeSchema: Schema<Charge> = s.lazySchema(() =>
  s.object<Charge>(
    {
      ...chargeProperties,
      redirect: s.optional(s.lazy(() => chargeRedirectSchema)),
      threeDs: s.optional(s.lazy(() => chargeThreeDsSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
