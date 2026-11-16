import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { bankTransferEventSchema, type BankTransferEvent } from "./bank-transfer-event.js";
import { bankTransferStatusDataSchema, type BankTransferStatusData } from "./bank-transfer-status-data.js";

/** `data` ペイロードが BankTransferStatusData リソースであるウェブフックエンベロープ。 */
export type BankTransferStatusWebhookCallback = {
  /** イベントタイプの識別子 — このコールバックでは常に `bank_transfer_status_updated` になります。 */
  event?: BankTransferEvent;
  /** このウェブフック配信の一意の ID。 */
  id: string;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn: Date;
  /**
   * `bank_transfer_status_updated` ウェブフックイベントのデータペイロード。金額やメタデータと並んで、インライン化された銀行振込拡張フィールドが含まれています。
   */
  data?: BankTransferStatusData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const bankTransferStatusWebhookCallbackSchema: Schema<BankTransferStatusWebhookCallback> =
  s.object<BankTransferStatusWebhookCallback>(
    {
      event: s.optional(s.lazy(() => bankTransferEventSchema)),
      id: s.string(),
      createdOn: s.dateTime(),
      data: s.optional(s.lazy(() => bankTransferStatusDataSchema)),
      _keysMap: {
        createdOn: "created_on",
      },
    },
    { additionalProperties: s.json() },
  );
