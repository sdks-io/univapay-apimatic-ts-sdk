import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 売上履歴に基づく返金制限の設定。 */
export type MerchantWebhookLimitRefundBySalesConfiguration = {
  /** 売上ベースの返金制限チェックを有効にします。 */
  enabled?: boolean | null;
  /** 返金制限を評価するために使用される売上集計期間。 */
  period?: string | null;
  /** 固定の暦期間の代わりにローリングウィンドウを使用します。 */
  rollingWindow?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookLimitRefundBySalesConfigurationSchema: Schema<MerchantWebhookLimitRefundBySalesConfiguration> =
  s.object<MerchantWebhookLimitRefundBySalesConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      period: s.optionalNullable(s.string()),
      rollingWindow: s.optionalNullable(s.boolean()),
      _keysMap: {
        rollingWindow: "rolling_window",
      },
    },
    { additionalProperties: s.json() },
  );
