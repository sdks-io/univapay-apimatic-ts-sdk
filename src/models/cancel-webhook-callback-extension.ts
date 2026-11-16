import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { cancelSchema, type Cancel } from "./cancel.js";

/** キャンセル特有のウェブフックペイロード拡張。 */
export type CancelWebhookCallbackExtension = {
  /** 課金に対するキャンセルリクエストを表します。 */
  data?: Cancel;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cancelWebhookCallbackExtensionSchema: Schema<CancelWebhookCallbackExtension> =
  s.object<CancelWebhookCallbackExtension>(
    {
      data: s.optional(s.lazy(() => cancelSchema)),
    },
    { additionalProperties: s.json() },
  );
