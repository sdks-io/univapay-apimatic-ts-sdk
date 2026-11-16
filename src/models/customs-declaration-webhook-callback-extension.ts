import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  customsDeclarationWebhookDataSchema,
  type CustomsDeclarationWebhookData,
} from "./customs-declaration-webhook-data.js";

/** 税関申告特有のウェブフックペイロード拡張。 */
export type CustomsDeclarationWebhookCallbackExtension = {
  /**
   * `customs_declaration_finished` ウェブフックで配信される税関申告ペイロード。プラットフォームレベルの配信には `platform_id` と
   * `updated_on` が含まれる場合があります。
   */
  data?: CustomsDeclarationWebhookData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookCallbackExtensionSchema: Schema<CustomsDeclarationWebhookCallbackExtension> =
  s.object<CustomsDeclarationWebhookCallbackExtension>(
    {
      data: s.optional(s.lazy(() => customsDeclarationWebhookDataSchema)),
    },
    { additionalProperties: s.json() },
  );
