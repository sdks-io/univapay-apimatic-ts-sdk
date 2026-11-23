import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  transactionHistoryRefundReasonSchema,
  type TransactionHistoryRefundReason,
} from "./transaction-history-refund-reason.js";
import {
  transactionHistoryRefundStatusSchema,
  type TransactionHistoryRefundStatus,
} from "./transaction-history-refund-status.js";

/** この行が表す課金に対して発行された単一の返金。 */
export type TransactionHistoryRefund = {
  /** 返金の一意の識別子。 */
  refundId?: string;
  /** 通貨の最小単位による返金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** 通貨の表示単位でフォーマットされた返金額。 */
  amountFormatted?: number;
  /** 個々の返金エントリのステータス。 */
  status?: TransactionHistoryRefundStatus;
  reason?: TransactionHistoryRefundReason | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionHistoryRefundSchema: Schema<TransactionHistoryRefund> =
  s.object<TransactionHistoryRefund>(
    {
      refundId: s.optional(s.string()),
      amount: s.optional(s.int()),
      currency: s.optional(s.string()),
      amountFormatted: s.optional(s.float64()),
      status: s.optional(s.lazy(() => transactionHistoryRefundStatusSchema)),
      reason: s.optionalNullable(s.lazy(() => transactionHistoryRefundReasonSchema)),
      _keysMap: {
        refundId: "refund_id",
        amountFormatted: "amount_formatted",
      },
    },
    { additionalProperties: s.json() },
  );
