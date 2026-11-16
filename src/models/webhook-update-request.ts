import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookTriggerSchema, type WebhookTrigger } from "./webhook-trigger.js";

/** ウェブフックを更新するためのリクエストボディ。すべてのフィールドはオプションです。省略されたフィールドは変更されません。 */
export type WebhookUpdateRequest = {
  /** トリガーリストを置き換えます。指定する場合は空にすることはできません。 */
  triggers?: WebhookTrigger[];
  /** ウェブフックエンドポイント URL を更新します。 */
  url?: string;
  /** 認証トークンを更新またはクリアします。削除するには `null` を送信します。 */
  authToken?: string | null;
  /** ウェブフックを有効または無効にします。 */
  active?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const webhookUpdateRequestProperties: s.Shape<WebhookUpdateRequest> = {
  triggers: s.optional(s.array(s.lazy(() => webhookTriggerSchema))),
  url: s.optional(s.string()),
  authToken: s.optionalNullable(s.string()),
  active: s.optional(s.boolean()),
  _keysMap: {
    authToken: "auth_token",
  },
};

export const webhookUpdateRequestInternalSchema: Schema<WebhookUpdateRequest> =
  s.object<WebhookUpdateRequest>(webhookUpdateRequestProperties, { additionalProperties: s.json() });

export const webhookUpdateRequestSchema: Schema<WebhookUpdateRequest> = s.lazySchema(() =>
  s.object<WebhookUpdateRequest>(
    {
      ...webhookUpdateRequestProperties,
      url: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
