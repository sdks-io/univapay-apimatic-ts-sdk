import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { refundEventSchema, type RefundEvent } from "./refund-event.js";
import { refundSchema, type Refund } from "./refund.js";

/** `data` ペイロードが Refund リソースであるウェブフックエンベロープ。 */
export type RefundWebhookCallback = {
  /** イベントタイプの識別子 — このコールバックでは常に `refund_finished` になります。 */
  event?: RefundEvent;
  /** このウェブフック配信の一意の ID。 */
  id: string;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn: Date;
  /** 課金に対して発行された返金を表します。 */
  data?: Refund;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const refundWebhookCallbackSchema: Schema<RefundWebhookCallback> = s.object<RefundWebhookCallback>(
  {
    event: s.optional(s.lazy(() => refundEventSchema)),
    id: s.string(),
    createdOn: s.dateTime(),
    data: s.optional(s.lazy(() => refundSchema)),
    _keysMap: {
      createdOn: "created_on",
    },
  },
  { additionalProperties: s.json() },
);
