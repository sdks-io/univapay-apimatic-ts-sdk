import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * API によって返される返金の理由。加盟店が設定することはできないが、取得した返金で確認できる運用上の理由を含みます。`duplicate`: 重複して課金が行われた。`fraud`:
 * 課金が不正である。`customer_request`: 消費者が返金を要求した。`system_failure`:
 * 内部システムエラーにより返金がトリガーされた。`admin_initiated_silent`:
 * プラットフォーム運営者が実行した返金で、ウェブフックや通知は送信されない。`chargeback`: チャージバックが発生した。`chargeback_fee_exempt`:
 * 手数料免除のチャージバック。`chargeback_reverse`: チャージバックの取り消し。
 */
export const RefundReasonResponse = {
  Duplicate: "duplicate",
  Fraud: "fraud",
  CustomerRequest: "customer_request",
  SystemFailure: "system_failure",
  AdminInitiatedSilent: "admin_initiated_silent",
  Chargeback: "chargeback",
  ChargebackFeeExempt: "chargeback_fee_exempt",
  ChargebackReverse: "chargeback_reverse",
} as const;
export type RefundReasonResponse =
  | (typeof RefundReasonResponse)[keyof typeof RefundReasonResponse]
  | (string & {});

export const refundReasonResponseSchema: EnumSchema<RefundReasonResponse> =
  s.enumOf<RefundReasonResponse>(RefundReasonResponse);
