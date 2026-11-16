import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { cancelReasonSchema, type CancelReason } from "./cancel-reason.js";
import { cancelStatusSchema, type CancelStatus } from "./cancel-status.js";
import { chargeModeSchema, type ChargeMode } from "./charge-mode.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import { paymentErrorSchema, type PaymentError } from "./payment-error.js";

/** 課金に対するキャンセルリクエストを表します。 */
export type Cancel = {
  /** キャンセルの位置を示す一意の識別子。 */
  id?: string;
  /** このキャンセルが関連付けられている課金の ID。 */
  chargeId?: string;
  /** 店舗の ID。 */
  storeId?: string;
  /** キャンセル操作の現在のステータス。 */
  status?: CancelStatus;
  /** 決済エラーの詳細。成功した場合は null。 */
  error?: PaymentError | null;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 課金モードのスキーマ。 */
  mode?: ChargeMode;
  /** キャンセルの理由。記録されていない場合は `null`。API 経由で作成されたキャンセルには理由が設定されません。 */
  reason?: CancelReason | null;
  /** キャンセルが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** キャンセルが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cancelSchema: Schema<Cancel> = s.object<Cancel>(
  {
    id: s.optional(s.string()),
    chargeId: s.optional(s.string()),
    storeId: s.optional(s.string()),
    status: s.optional(s.lazy(() => cancelStatusSchema)),
    error: s.optionalNullable(s.lazy(() => paymentErrorSchema)),
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
    mode: s.optional(s.lazy(() => chargeModeSchema)),
    reason: s.optionalNullable(s.lazy(() => cancelReasonSchema)),
    createdOn: s.optional(s.dateTime()),
    updatedOn: s.optional(s.dateTime()),
    _keysMap: {
      chargeId: "charge_id",
      storeId: "store_id",
      createdOn: "created_on",
      updatedOn: "updated_on",
    },
  },
  { additionalProperties: s.json() },
);
