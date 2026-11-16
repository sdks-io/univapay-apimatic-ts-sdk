import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionTerminateWithStatusSchema,
  type SubscriptionTerminateWithStatus,
} from "./subscription-terminate-with-status.js";

/** スケジュールされた支払いを更新するためのリクエストボディ。すべてのフィールドはオプションです。省略されたフィールドは変更されません。 */
export type SubscriptionPatchPaymentRequest = {
  /** この支払いの新しい期日（YYYY-MM-DD）。支払い日の編集権限を持つ加盟店のみ利用可能です。 */
  dueDate?: string;
  /** この支払いを支払済みとしてマークします。`true` に設定すると、サイクル内の次回支払いのスケジューリングがトリガーされます。 */
  isPaid?: boolean;
  /**
   * 支払いの期日にステータス移行をスケジュールします。終了をスケジュールするには `suspended` または `canceled` を設定します。以前にスケジュールされた移行を取り消すには
   * `null` を送信します。
   */
  terminateWithStatus?: SubscriptionTerminateWithStatus | null;
  /** スケジュールされた支払いにおける、リトライ間隔の ISO-8601 期間上書き（例：`P3D`）。クリアするには `null` を送信します。 */
  retryInterval?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionPatchPaymentRequestSchema: Schema<SubscriptionPatchPaymentRequest> =
  s.object<SubscriptionPatchPaymentRequest>(
    {
      dueDate: s.optional(s.dateOnly()),
      isPaid: s.optional(s.boolean()),
      terminateWithStatus: s.optionalNullable(s.lazy(() => subscriptionTerminateWithStatusSchema)),
      retryInterval: s.optionalNullable(s.string()),
      _keysMap: {
        dueDate: "due_date",
        isPaid: "is_paid",
        terminateWithStatus: "terminate_with_status",
        retryInterval: "retry_interval",
      },
    },
    { additionalProperties: s.json() },
  );
