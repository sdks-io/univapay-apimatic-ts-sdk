import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 単一の API バリデーションまたはビジネスエラーを説明する構造化された詳細エントリ。 */
export type ApiErrorDetail = {
  /** エラーの原因となったパラメータのフィールド名（lower_snake_case）。 */
  field?: string;
  /** 入れ子になったエラーの詳細な理由（UPPER_SNAKE_CASE または英語の説明）。 */
  reason?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const apiErrorDetailSchema: Schema<ApiErrorDetail> = s.object<ApiErrorDetail>(
  {
    field: s.optional(s.string()),
    reason: s.optional(s.string()),
  },
  { additionalProperties: s.json() },
);
