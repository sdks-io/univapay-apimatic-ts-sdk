import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** `others` 内で返される、入れ子になった税関処理エラーエントリ。 */
export type CustomsDeclarationWebhookOtherError = {
  /** バックエンドのその他のエラー（other-error）のタイプ。 */
  type?: string;
  /** 該当する場合、エラーに関与したゲートウェイ資格情報。 */
  credentialsId?: string | null;
  /** `not_selected_reasons` の追加の理由の値。 */
  message?: string[] | null;
  /** `related_item` の関連アイテム名。 */
  itemName?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookOtherErrorSchema: Schema<CustomsDeclarationWebhookOtherError> =
  s.object<CustomsDeclarationWebhookOtherError>(
    {
      type: s.optional(s.string()),
      credentialsId: s.optionalNullable(s.string()),
      message: s.optionalNullable(s.array(s.string())),
      itemName: s.optionalNullable(s.string()),
      _keysMap: {
        credentialsId: "credentials_id",
        itemName: "item_name",
      },
    },
    { additionalProperties: s.json() },
  );
