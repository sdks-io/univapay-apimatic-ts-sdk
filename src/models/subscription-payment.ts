import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 定期課金の、スケジュールされた単一の支払い、または過去の支払いを表します。 */
export type SubscriptionPayment = {
  /** 一意の識別子。 */
  id?: string;
  /** スケジュールされた期日。 */
  dueDate?: string;
  /** IANA タイムゾーン ID。 */
  zoneId?: string;
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** 表示用にフォーマットされた金額。 */
  amountFormatted?: number;
  /** この特定の支払いサイクルが正常に課金されたかどうかを示します。 */
  isPaid?: boolean;
  /** これが回数限定定期課金における最終支払いであるかどうかを示します。 */
  isLastPayment?: boolean;
  /** リソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** リソースが最後に更新されたタイムスタンプ。 */
  updatedOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionPaymentSchema: Schema<SubscriptionPayment> = s.object<SubscriptionPayment>(
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
    _keysMap: {
      dueDate: "due_date",
      zoneId: "zone_id",
      amountFormatted: "amount_formatted",
      isPaid: "is_paid",
      isLastPayment: "is_last_payment",
      createdOn: "created_on",
      updatedOn: "updated_on",
    },
  },
  { additionalProperties: s.json() },
);
