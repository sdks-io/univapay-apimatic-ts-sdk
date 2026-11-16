import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 返金の現在のステータス。`pending`: 返金が作成され、処理中です。`successful`: 返金が正常に処理されました。`failed`:
 * 返金がゲートウェイによって拒否されました。`error`: 処理中に予期しないエラーが発生しました。
 */
export const RefundStatus = {
  Pending: "pending",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
} as const;
export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus] | (string & {});

export const refundStatusSchema: EnumSchema<RefundStatus> = s.enumOf<RefundStatus>(RefundStatus);
