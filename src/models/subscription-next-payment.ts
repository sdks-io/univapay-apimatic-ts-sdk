import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionTerminateWithStatusSchema,
  type SubscriptionTerminateWithStatus,
} from "./subscription-terminate-with-status.js";

/** 定期課金の次回スケジュールされた支払いの詳細。 */
export type SubscriptionNextPayment = {
  /** 一意の識別子。 */
  id?: string;
  /** スケジュールされた期日。 */
  dueDate?: string;
  /** IANA タイムゾーン識別子。 */
  zoneId?: string;
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** 表示用にフォーマットされた金額。 */
  amountFormatted?: number;
  /** 支払いが完了しているかどうか。 */
  isPaid?: boolean;
  /** これがスケジュール内の最終支払いであるかどうか。 */
  isLastPayment?: boolean;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** スケジュールされたリトライ日。 */
  retryDate?: string | null;
  /**
   * 支払いの期日にステータス移行をスケジュールします。終了をスケジュールするには `suspended` または `canceled` を設定します。以前にスケジュールされた移行を取り消すには
   * `null` を送信します。
   */
  terminateWithStatus?: SubscriptionTerminateWithStatus | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionNextPaymentSchema: Schema<SubscriptionNextPayment> =
  s.object<SubscriptionNextPayment>(
    {
      id: s.optional(s.string()),
      dueDate: s.optional(s.dateOnly()),
      zoneId: s.optional(s.string()),
      amount: s.optional(s.int()),
      currency: s.optional(s.string()),
      amountFormatted: s.optional(s.float64()),
      isPaid: s.optional(s.boolean()),
      isLastPayment: s.optional(s.boolean()),
      createdOn: s.optional(s.dateTime()),
      updatedOn: s.optional(s.dateTime()),
      retryDate: s.optionalNullable(s.dateOnly()),
      terminateWithStatus: s.optionalNullable(s.lazy(() => subscriptionTerminateWithStatusSchema)),
      _keysMap: {
        dueDate: "due_date",
        zoneId: "zone_id",
        amountFormatted: "amount_formatted",
        isPaid: "is_paid",
        isLastPayment: "is_last_payment",
        createdOn: "created_on",
        updatedOn: "updated_on",
        retryDate: "retry_date",
        terminateWithStatus: "terminate_with_status",
      },
    },
    { additionalProperties: s.json() },
  );
