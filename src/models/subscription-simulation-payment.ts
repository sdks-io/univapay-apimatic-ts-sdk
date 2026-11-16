import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { terminateWithStatusSchema, type TerminateWithStatus } from "./terminate-with-status.js";

/** 定期課金・プラン・シミュレーションによって生成された、単一のスケジュール済み支払い。 */
export type SubscriptionSimulationPayment = {
  /** このシミュレートされた支払いのスケジュールされた期日（YYYY-MM-DD）。 */
  dueDate?: string;
  /** 期日の算出に使用される IANA タイムゾーン識別子。 */
  zoneId?: string;
  /** このサイクルで課金される、通貨の最小単位による金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** シミュレートされた支払いでは常に `false` です。実際の支払いは行われていません。 */
  isPaid?: boolean;
  /** これがシミュレートされたスケジュール内の最終支払いであるかどうか。 */
  isLastPayment?: boolean;
  /** シミュレートされた支払いでは常に `null` です。実際の支払いが決済された時点で初めて値が設定されます。 */
  successfulPaymentDate?: string | null;
  /** 終了がスケジュールされている場合に、この支払いの期日に定期課金が移行するステータス。終了が適用されない場合は `null` になります。 */
  terminateWithStatus?: TerminateWithStatus | null;
  /** この支払いが失敗した場合に適用されるリトライ間隔を、ISO-8601 期間形式（例：P5D）で指定します。リトライ間隔が設定されていない場合は `null` になります。 */
  retryInterval?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionSimulationPaymentProperties: s.Shape<SubscriptionSimulationPayment> = {
  dueDate: s.optional(s.dateOnly()),
  zoneId: s.optional(s.string()),
  amount: s.optional(s.int()),
  currency: s.optional(s.string()),
  isPaid: s.optional(s.boolean()),
  isLastPayment: s.optional(s.boolean()),
  successfulPaymentDate: s.optionalNullable(s.dateOnly()),
  terminateWithStatus: s.optionalNullable(s.lazy(() => terminateWithStatusSchema)),
  retryInterval: s.optionalNullable(s.string()),
  _keysMap: {
    dueDate: "due_date",
    zoneId: "zone_id",
    isPaid: "is_paid",
    isLastPayment: "is_last_payment",
    successfulPaymentDate: "successful_payment_date",
    terminateWithStatus: "terminate_with_status",
    retryInterval: "retry_interval",
  },
};

export const subscriptionSimulationPaymentInternalSchema: Schema<SubscriptionSimulationPayment> =
  s.object<SubscriptionSimulationPayment>(subscriptionSimulationPaymentProperties, {
    additionalProperties: s.json(),
  });

export const subscriptionSimulationPaymentSchema: Schema<SubscriptionSimulationPayment> = s.lazySchema(() =>
  s.object<SubscriptionSimulationPayment>(
    {
      ...subscriptionSimulationPaymentProperties,
      amount: s.optional(s.int().check(s.gte(0))),
    },
    { additionalProperties: s.json() },
  ),
);
