import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { webhookTriggerSchema, type WebhookTrigger } from "./webhook-trigger.js";

/** ウェブフックを表します。ウェブフックは決済イベントによってトリガーされた際、指定された URL にイベント通知を送信します。 */
export type Webhook = {
  /** ウェブフックの一意の識別子。 */
  id?: string;
  /** このウェブフックが属する店舗の ID（加盟店レベルのウェブフックの場合は null）。 */
  storeId?: string | null;
  /** このウェブフックが属する加盟店の ID。 */
  merchantId?: string | null;
  /** このウェブフックをトリガーするイベントタイプのリスト。 */
  triggers?: WebhookTrigger[];
  /** ウェブフックの POST リクエストを受信するエンドポイント URL。 */
  url?: string;
  /** ウェブフックリクエストの `Authorization` ヘッダーに含まれるオプションのベアラートークン。ウェブフック受信側を認証するために使用されます。 */
  authToken?: string | null;
  /** このウェブフックが現在アクティブで、イベントを受信しているかどうか。 */
  active?: boolean;
  /** 管理者専用フラグ。このウェブフックがプラットフォーム統合目的で使用されていることを示します。加盟店による設定はできません。 */
  isIntegration?: boolean;
  /** ウェブフックが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** ウェブフックが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const webhookProperties: s.Shape<Webhook> = {
  id: s.optional(s.string()),
  storeId: s.optionalNullable(s.string()),
  merchantId: s.optionalNullable(s.string()),
  triggers: s.optional(s.array(s.lazy(() => webhookTriggerSchema))),
  url: s.optional(s.string()),
  authToken: s.optionalNullable(s.string()),
  active: s.optional(s.boolean()),
  isIntegration: s.optional(s.boolean()),
  createdOn: s.optional(s.dateTime()),
  updatedOn: s.optional(s.dateTime()),
  _keysMap: {
    storeId: "store_id",
    merchantId: "merchant_id",
    authToken: "auth_token",
    isIntegration: "is_integration",
    createdOn: "created_on",
    updatedOn: "updated_on",
  },
};

export const webhookInternalSchema: Schema<Webhook> = s.object<Webhook>(webhookProperties, {
  additionalProperties: s.json(),
});

export const webhookSchema: Schema<Webhook> = s.lazySchema(() =>
  s.object<Webhook>(
    {
      ...webhookProperties,
      url: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
