import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionTerminateWithStatusSchema,
  type SubscriptionTerminateWithStatus,
} from "./subscription-terminate-with-status.js";

/** 次回スケジュールされた支払いに対して更新可能なフィールド。 */
export type SubscriptionUpdateNextPayment = {
  /** 次回の支払い日（YYYY-MM-DD）。注意: 次回支払い日の編集を許可された加盟店のみ利用可能です。 */
  dueDate?: string;
  /** 次回の支払い金額。回数限定定期課金では利用できません。許可された加盟店のみ利用可能です。これによりそれ以降のサイクルの金額が変更されることはありません。 */
  amount?: number;
  /**
   * 支払いの期日にステータス移行をスケジュールします。終了をスケジュールするには `suspended` または `canceled` を設定します。以前にスケジュールされた移行を取り消すには
   * `null` を送信します。
   */
  terminateWithStatus?: SubscriptionTerminateWithStatus | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionUpdateNextPaymentSchema: Schema<SubscriptionUpdateNextPayment> =
  s.object<SubscriptionUpdateNextPayment>(
    {
      dueDate: s.optional(s.dateOnly()),
      amount: s.optional(s.int()),
      terminateWithStatus: s.optionalNullable(s.lazy(() => subscriptionTerminateWithStatusSchema)),
      _keysMap: {
        dueDate: "due_date",
        terminateWithStatus: "terminate_with_status",
      },
    },
    { additionalProperties: s.json() },
  );
