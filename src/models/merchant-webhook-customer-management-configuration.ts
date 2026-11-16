import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 消費者管理機能のデフォルト設定。 */
export type MerchantWebhookCustomerManagementConfiguration = {
  /** 消費者管理機能を有効にします。 */
  enabled?: boolean | null;
  /** 新しく作成された消費者に適用されるロール（役割）。 */
  defaultRoles?: string[] | null;
  /** 新しい消費者レコードに割り当てられるデフォルトの処理モード。 */
  defaultMode?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookCustomerManagementConfigurationSchema: Schema<MerchantWebhookCustomerManagementConfiguration> =
  s.object<MerchantWebhookCustomerManagementConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      defaultRoles: s.optionalNullable(s.array(s.string())),
      defaultMode: s.optionalNullable(s.string()),
      _keysMap: {
        defaultRoles: "default_roles",
        defaultMode: "default_mode",
      },
    },
    { additionalProperties: s.json() },
  );
