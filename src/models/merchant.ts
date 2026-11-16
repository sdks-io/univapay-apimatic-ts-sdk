import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookConfigurationInternalSchema,
  merchantWebhookConfigurationSchema,
  type MerchantWebhookConfiguration,
} from "./merchant-webhook-configuration.js";

/** 加盟店認証された呼び出し元に対して、バックエンドの `FullMerchantWithGroupRoles` フォーマッタによって返される加盟店リソース。 */
export type Merchant = {
  /** 加盟店識別子。 */
  id?: string;
  /** 加盟店に関連付けられている本人確認データの識別子。 */
  verificationDataId?: string | null;
  /** 加盟店の表示名。 */
  name?: string;
  /** プライマリ（主要）な加盟店のメールアドレス。 */
  email?: string;
  /** 加盟店の通知メールアドレス。 */
  notificationEmail?: string | null;
  /** 加盟店の財務・経理通知メールアドレス。 */
  financeNotificationEmail?: string | null;
  /** 加盟店が本人確認審査を完了しているかどうか。 */
  verified?: boolean;
  /** バックエンドによってシリアライズされた加盟店設定のスナップショット。 */
  configuration?: MerchantWebhookConfiguration;
  /** 加盟店が作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const merchantProperties: s.Shape<Merchant> = {
  id: s.optional(s.string()),
  verificationDataId: s.optionalNullable(s.string()),
  name: s.optional(s.string()),
  email: s.optional(s.string()),
  notificationEmail: s.optionalNullable(s.string()),
  financeNotificationEmail: s.optionalNullable(s.string()),
  verified: s.optional(s.boolean()),
  configuration: s.optional(s.lazy(() => merchantWebhookConfigurationInternalSchema)),
  createdOn: s.optional(s.dateTime()),
  _keysMap: {
    verificationDataId: "verification_data_id",
    notificationEmail: "notification_email",
    financeNotificationEmail: "finance_notification_email",
    createdOn: "created_on",
  },
};

export const merchantInternalSchema: Schema<Merchant> = s.object<Merchant>(merchantProperties, {
  additionalProperties: s.json(),
});

export const merchantSchema: Schema<Merchant> = s.lazySchema(() =>
  s.object<Merchant>(
    {
      ...merchantProperties,
      email: s.optional(s.string().check(s.email())),
      notificationEmail: s.optionalNullable(s.string().check(s.email())),
      financeNotificationEmail: s.optionalNullable(s.string().check(s.email())),
      configuration: s.optional(s.lazy(() => merchantWebhookConfigurationSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
