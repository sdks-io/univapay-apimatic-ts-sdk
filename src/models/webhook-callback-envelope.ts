import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookTriggerSchema, type WebhookTrigger } from "./webhook-trigger.js";

/** すべてのイベントでウェブフック URL に POST 送信される共通のラッパー。`data` フィールドには、イベントタイプに関連するドメインオブジェクトが含まれます。 */
export type WebhookCallbackEnvelope = {
  /** このウェブフック配信の一意の ID。 */
  id?: string;
  /** ウェブフック通知をトリガーするイベントタイプ。 */
  event: WebhookTrigger;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const webhookCallbackEnvelopeSchema: Schema<WebhookCallbackEnvelope> =
  s.object<WebhookCallbackEnvelope>(
    {
      id: s.optional(s.string()),
      event: webhookTriggerSchema,
      createdOn: s.optional(s.dateTime()),
      _keysMap: {
        createdOn: "created_on",
      },
    },
    { additionalProperties: s.json() },
  );
