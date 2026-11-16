import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookTriggerSchema, type WebhookTrigger } from "./webhook-trigger.js";

/** 新しい店舗レベルのウェブフックを作成するためのリクエストボディ。 */
export type WebhookCreateRequest = {
  /** このウェブフックをトリガーするイベントタイプのリスト。空にすることはできず、店舗レベルで有効なイベントのみを含める必要があります。 */
  triggers: WebhookTrigger[];
  /** ウェブフックのペイロードを POST 送信する先の URL。 */
  url: string;
  /** ウェブフックリクエストの `Authorization` ヘッダーに送信されるオプションのベアラートークン。 */
  authToken?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const webhookCreateRequestProperties: s.Shape<WebhookCreateRequest> = {
  triggers: s.array(s.lazy(() => webhookTriggerSchema)),
  url: s.string(),
  authToken: s.optionalNullable(s.string()),
  _keysMap: {
    authToken: "auth_token",
  },
};

export const webhookCreateRequestInternalSchema: Schema<WebhookCreateRequest> =
  s.object<WebhookCreateRequest>(webhookCreateRequestProperties, { additionalProperties: s.json() });

export const webhookCreateRequestSchema: Schema<WebhookCreateRequest> = s.lazySchema(() =>
  s.object<WebhookCreateRequest>(
    {
      ...webhookCreateRequestProperties,
      url: s.string().check(s.url()),
    },
    { additionalProperties: s.json() },
  ),
);
