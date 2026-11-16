import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { bankTransferStatusDataSchema, type BankTransferStatusData } from "./bank-transfer-status-data.js";

/** 銀行振込特有のウェブフックペイロード拡張。 */
export type BankTransferStatusWebhookCallbackExtension = {
  /**
   * `bank_transfer_status_updated` ウェブフックイベントのデータペイロード。金額やメタデータと並んで、インライン化された銀行振込拡張フィールドが含まれています。
   */
  data?: BankTransferStatusData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const bankTransferStatusWebhookCallbackExtensionSchema: Schema<BankTransferStatusWebhookCallbackExtension> =
  s.object<BankTransferStatusWebhookCallbackExtension>(
    {
      data: s.optional(s.lazy(() => bankTransferStatusDataSchema)),
    },
    { additionalProperties: s.json() },
  );
