import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 返金の理由（加盟店が設定可能な値）。`duplicate`: 重複して課金が行われた。`fraud`: 課金が不正である。`customer_request`: 消費者が返金を要求した。 */
export const RefundReasonRequest = {
  Duplicate: "duplicate",
  Fraud: "fraud",
  CustomerRequest: "customer_request",
} as const;
export type RefundReasonRequest =
  | (typeof RefundReasonRequest)[keyof typeof RefundReasonRequest]
  | (string & {});

export const refundReasonRequestSchema: EnumSchema<RefundReasonRequest> =
  s.enumOf<RefundReasonRequest>(RefundReasonRequest);
