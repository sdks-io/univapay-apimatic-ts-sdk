import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  merchantWebhookConfigurationInternalSchema,
  merchantWebhookConfigurationSchema,
  type MerchantWebhookConfiguration,
} from "./merchant-webhook-configuration.js";

/**
 * バックエンドの `FullStore`
 * フォーマッタによって返される店舗リソース。店舗のコアイデンティティ（基本識別情報）と、実行時ポリシーの評価に使用される解決済み設定スナップショットを組み合わせたものです。
 */
export type Store = {
  /** 店舗識別子。 */
  id?: string;
  /** 店舗の表示名。 */
  name?: string;
  /** 店舗が作成されたタイムスタンプ。 */
  createdOn?: Date;
  /**
   * バックエンドによってシリアライズされた店舗スコープの設定スナップショット。加盟店設定と同じフラットなシリアライザを使用しますが、`transfer_schedule`（振込スケジュール）は除外されます。
   */
  configuration?: MerchantWebhookConfiguration;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const storeProperties: s.Shape<Store> = {
  id: s.optional(s.string()),
  name: s.optional(s.string()),
  createdOn: s.optional(s.dateTime()),
  configuration: s.optional(s.lazy(() => merchantWebhookConfigurationInternalSchema)),
  _keysMap: {
    createdOn: "created_on",
  },
};

export const storeInternalSchema: Schema<Store> = s.object<Store>(storeProperties, {
  additionalProperties: s.json(),
});

export const storeSchema: Schema<Store> = s.lazySchema(() =>
  s.object<Store>(
    {
      ...storeProperties,
      configuration: s.optional(s.lazy(() => merchantWebhookConfigurationSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
