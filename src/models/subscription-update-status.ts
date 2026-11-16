import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 定期課金のステータスを更新します。`suspended`: 定期課金を一時停止します。`unpaid`: 一時停止中の定期課金を再開します。 */
export const SubscriptionUpdateStatus = {
  Suspended: "suspended",
  Unpaid: "unpaid",
} as const;
export type SubscriptionUpdateStatus =
  | (typeof SubscriptionUpdateStatus)[keyof typeof SubscriptionUpdateStatus]
  | (string & {});

export const subscriptionUpdateStatusSchema: EnumSchema<SubscriptionUpdateStatus> =
  s.enumOf<SubscriptionUpdateStatus>(SubscriptionUpdateStatus);
