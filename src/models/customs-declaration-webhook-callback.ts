import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { customsDeclarationEventSchema, type CustomsDeclarationEvent } from "./customs-declaration-event.js";
import {
  customsDeclarationWebhookDataSchema,
  type CustomsDeclarationWebhookData,
} from "./customs-declaration-webhook-data.js";

/** `data` ペイロードが CustomsDeclaration リソースであるウェブフックエンベロープ。 */
export type CustomsDeclarationWebhookCallback = {
  /** イベントタイプの識別子 — このコールバックでは常に `customs_declaration_finished` になります。 */
  event?: CustomsDeclarationEvent;
  /** このウェブフック配信の一意の ID。 */
  id: string;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn: Date;
  /**
   * `customs_declaration_finished` ウェブフックで配信される税関申告ペイロード。プラットフォームレベルの配信には `platform_id` と
   * `updated_on` が含まれる場合があります。
   */
  data?: CustomsDeclarationWebhookData;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookCallbackSchema: Schema<CustomsDeclarationWebhookCallback> =
  s.object<CustomsDeclarationWebhookCallback>(
    {
      event: s.optional(s.lazy(() => customsDeclarationEventSchema)),
      id: s.string(),
      createdOn: s.dateTime(),
      data: s.optional(s.lazy(() => customsDeclarationWebhookDataSchema)),
      _keysMap: {
        createdOn: "created_on",
      },
    },
    { additionalProperties: s.json() },
  );
