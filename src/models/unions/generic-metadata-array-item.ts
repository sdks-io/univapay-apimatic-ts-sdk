import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";

/** 配列値のメタデータプロパティの要素：文字列、数値、真偽値、または null。ネストされたオブジェクトおよびネストされた配列は指定できません。 */
export type GenericMetadataArrayItem = string | number | boolean | null;

export const genericMetadataArrayItemSchema: Schema<GenericMetadataArrayItem> =
  s.of<GenericMetadataArrayItem>(s.nullable(s.union([s.string(), s.int(), s.float64(), s.boolean()])));
