import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { cancelEventSchema, type CancelEvent } from "./cancel-event.js";
import { cancelSchema, type Cancel } from "./cancel.js";

/** `data` ペイロードが Cancel リソースであるウェブフックエンベロープ。 */
export type CancelWebhookCallback = {
  /** イベントタイプの識別子 — このコールバックでは常に `cancel_finished` になります。 */
  event?: CancelEvent;
  /** このウェブフック配信の一意の ID。 */
  id: string;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn: Date;
  /** 課金に対するキャンセルリクエストを表します。 */
  data?: Cancel;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cancelWebhookCallbackSchema: Schema<CancelWebhookCallback> = s.object<CancelWebhookCallback>(
  {
    event: s.optional(s.lazy(() => cancelEventSchema)),
    id: s.string(),
    createdOn: s.dateTime(),
    data: s.optional(s.lazy(() => cancelSchema)),
    _keysMap: {
      createdOn: "created_on",
    },
  },
  { additionalProperties: s.json() },
);
