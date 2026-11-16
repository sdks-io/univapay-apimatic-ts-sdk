import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * キャンセルが作成された理由。プラットフォーム側で設定され、加盟店が設定することはできません。`expired`:
 * オーソリが期限内にキャプチャされなかったため、プラットフォームが課金を自動的にキャンセルした。`customer_request`: 消費者の要求によるキャンセルとして記録された。
 */
export const CancelReason = {
  Expired: "expired",
  CustomerRequest: "customer_request",
} as const;
export type CancelReason = (typeof CancelReason)[keyof typeof CancelReason] | (string & {});

export const cancelReasonSchema: EnumSchema<CancelReason> = s.enumOf<CancelReason>(CancelReason);
