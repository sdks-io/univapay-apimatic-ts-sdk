import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { chargeModeSchema, type ChargeMode } from "./charge-mode.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import { paymentErrorSchema, type PaymentError } from "./payment-error.js";
import { refundReasonResponseSchema, type RefundReasonResponse } from "./refund-reason-response.js";
import { refundStatusSchema, type RefundStatus } from "./refund-status.js";

/** 課金に対して発行された返金を表します。 */
export type Refund = {
  /** 一意の識別子。 */
  id?: string;
  /** 店舗識別子。 */
  storeId?: string;
  /** 課金識別子。 */
  chargeId?: string;
  /**
   * 返金の現在のステータス。`pending`: 返金が作成され、処理中です。`successful`: 返金が正常に処理されました。`failed`:
   * 返金がゲートウェイによって拒否されました。`error`: 処理中に予期しないエラーが発生しました。
   */
  status?: RefundStatus;
  /** 通貨の最小単位による返金金額（例：USD の場合はセント、JPY の場合は円）。 */
  amount?: number;
  /** ISO-4217 通貨コード。課金された通貨と一致する必要があります。 */
  currency?: string;
  /** その通貨に適した小数点以下を含めてフォーマットされた返金金額。 */
  amountFormatted?: number;
  /** API から返される返金理由。未設定の場合は `null`。 */
  reason?: RefundReasonResponse | null;
  /** 返金に関する任意のフリーテキストのメモ。 */
  message?: string | null;
  /** 決済エラーの詳細。成功した場合は null。 */
  error?: PaymentError | null;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 課金モードのスキーマ。 */
  mode?: ChargeMode;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const refundSchema: Schema<Refund> = s.object<Refund>(
  {
    id: s.optional(s.string()),
    storeId: s.optional(s.string()),
    chargeId: s.optional(s.string()),
    status: s.optional(s.lazy(() => refundStatusSchema)),
    amount: s.optional(s.int()),
    currency: s.optional(s.string()),
    amountFormatted: s.optional(s.float64()),
    reason: s.optionalNullable(s.lazy(() => refundReasonResponseSchema)),
    message: s.optionalNullable(s.string()),
    error: s.optionalNullable(s.lazy(() => paymentErrorSchema)),
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
    mode: s.optional(s.lazy(() => chargeModeSchema)),
    createdOn: s.optional(s.dateTime()),
    updatedOn: s.optional(s.dateTime()),
    _keysMap: {
      storeId: "store_id",
      chargeId: "charge_id",
      amountFormatted: "amount_formatted",
      createdOn: "created_on",
      updatedOn: "updated_on",
    },
  },
  { additionalProperties: s.json() },
);
