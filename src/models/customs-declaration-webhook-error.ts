import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  customsDeclarationWebhookOtherErrorSchema,
  type CustomsDeclarationWebhookOtherError,
} from "./customs-declaration-webhook-other-error.js";

/** 税関申告処理が失敗したときに返されるエラーペイロード。 */
export type CustomsDeclarationWebhookError = {
  /** バックエンドの税関申告エラーコード。 */
  code?: number;
  /** 人間が読めるバックエンドエラー名。 */
  message?: string;
  /** オプション。バックエンドから提供される詳細文字列。 */
  details?: string | null;
  /** バックエンドから返される追加の入れ子になったエラーレコード。 */
  others?: CustomsDeclarationWebhookOtherError[] | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookErrorSchema: Schema<CustomsDeclarationWebhookError> =
  s.object<CustomsDeclarationWebhookError>(
    {
      code: s.optional(s.int()),
      message: s.optional(s.string()),
      details: s.optionalNullable(s.string()),
      others: s.optionalNullable(s.array(s.lazy(() => customsDeclarationWebhookOtherErrorSchema))),
    },
    { additionalProperties: s.json() },
  );
