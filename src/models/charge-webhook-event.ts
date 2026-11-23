import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { chargeEventSchema, type ChargeEvent } from "./charge-event.js";
import { chargeInternalSchema, chargeSchema, type Charge } from "./charge.js";

/** 課金ライフサイクルイベント用のウェブフックエンベロープ。charge_updated（ステータス遷移時）と charge_finished（最終ステータス到達時）の両方で発火します。 */
export type ChargeWebhookEvent = {
  /** このウェブフック配信の一意の ID。 */
  id?: string;
  /** イベントタイプの識別子 — `charge_updated` または `charge_finished`。 */
  event: ChargeEvent;
  /** 決済APIによって返される課金（チャージ）リソース。 */
  data?: Charge;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeWebhookEventProperties: s.Shape<ChargeWebhookEvent> = {
  id: s.optional(s.string()),
  event: chargeEventSchema,
  data: s.optional(s.lazy(() => chargeInternalSchema)),
  createdOn: s.optional(s.dateTime()),
  _keysMap: {
    createdOn: "created_on",
  },
};

export const chargeWebhookEventInternalSchema: Schema<ChargeWebhookEvent> = s.object<ChargeWebhookEvent>(
  chargeWebhookEventProperties,
  { additionalProperties: s.json() },
);

export const chargeWebhookEventSchema: Schema<ChargeWebhookEvent> = s.lazySchema(() =>
  s.object<ChargeWebhookEvent>(
    {
      ...chargeWebhookEventProperties,
      data: s.optional(s.lazy(() => chargeSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
