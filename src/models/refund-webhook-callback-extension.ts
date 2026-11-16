import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { refundSchema, type Refund } from "./refund.js";

/** 返金特有のウェブフックペイロード拡張。 */
export type RefundWebhookCallbackExtension = {
  /** 課金に対して発行された返金を表します。 */
  data?: Refund;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const refundWebhookCallbackExtensionSchema: Schema<RefundWebhookCallbackExtension> =
  s.object<RefundWebhookCallbackExtension>(
    {
      data: s.optional(s.lazy(() => refundSchema)),
    },
    { additionalProperties: s.json() },
  );
