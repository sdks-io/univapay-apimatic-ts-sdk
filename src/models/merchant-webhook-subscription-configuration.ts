import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 定期課金機能の設定。 */
export type MerchantWebhookSubscriptionConfiguration = {
  /** 定期課金決済を有効にします。 */
  enabled?: boolean | null;
  /** 解約にいたるまでに許容される課金失敗の回数。 */
  failedChargesToCancel?: number | null;
  /** 最新の課金がキャンセルされたときに定期課金を一時停止します。 */
  suspendOnCancel?: boolean | null;
  /** 加盟店が予定されている定期課金金額を更新できるようにします。 */
  allowMerchantAmountPatch?: boolean | null;
  /** 加盟店が予定されている定期課金支払い期日を更新できるようにします。 */
  allowMerchantDueDatePatch?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookSubscriptionConfigurationSchema: Schema<MerchantWebhookSubscriptionConfiguration> =
  s.object<MerchantWebhookSubscriptionConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      failedChargesToCancel: s.optionalNullable(s.int()),
      suspendOnCancel: s.optionalNullable(s.boolean()),
      allowMerchantAmountPatch: s.optionalNullable(s.boolean()),
      allowMerchantDueDatePatch: s.optionalNullable(s.boolean()),
      _keysMap: {
        failedChargesToCancel: "failed_charges_to_cancel",
        suspendOnCancel: "suspend_on_cancel",
        allowMerchantAmountPatch: "allow_merchant_amount_patch",
        allowMerchantDueDatePatch: "allow_merchant_due_date_patch",
      },
    },
    { additionalProperties: s.json() },
  );
