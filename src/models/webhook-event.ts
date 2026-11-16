import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookTriggerSchema, type WebhookTrigger } from "./webhook-trigger.js";

/** 送信されたペイロードと配信結果を含む、ウェブフックイベントの単一の配信試行を表します。 */
export type WebhookEvent = {
  /** ウェブフックイベントの一意の識別子。 */
  id?: string;
  /** 親ウェブフックの ID。 */
  webhookId?: string;
  /** ウェブフック通知をトリガーするイベントタイプ。 */
  event?: WebhookTrigger;
  /**
   * ウェブフック配信用のドメインオブジェクトペイロード。実際の構造はイベントタイプによって異なります。具体的なペイロードの形状については、各ウェブフックコールバックのスキーマを参照してください。
   */
  data?: Record<string, unknown>;
  /** ウェブフックの配信が確認された（HTTP 2xx が返された）かどうか。 */
  successful?: boolean;
  /** ウェブフックがディスパッチ（送信）されたタイムスタンプ。 */
  firedOn?: Date;
  /** 配信が失敗した場合のエラーメッセージ。 */
  errorMessage?: string | null;
  /** イベントが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const webhookEventSchema: Schema<WebhookEvent> = s.object<WebhookEvent>(
  {
    id: s.optional(s.string()),
    webhookId: s.optional(s.string()),
    event: s.optional(s.lazy(() => webhookTriggerSchema)),
    data: s.optional(s.record(s.string(), s.unknown())),
    successful: s.optional(s.boolean()),
    firedOn: s.optional(s.dateTime()),
    errorMessage: s.optionalNullable(s.string()),
    createdOn: s.optional(s.dateTime()),
    _keysMap: {
      webhookId: "webhook_id",
      firedOn: "fired_on",
      errorMessage: "error_message",
      createdOn: "created_on",
    },
  },
  { additionalProperties: s.json() },
);
