import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import {
  genericMetadataArrayItemSchema,
  type GenericMetadataArrayItem,
} from "./generic-metadata-array-item.js";

/**
 * メタデータプロパティに許容される値。文字列、数値、真偽値、null、またはこれらの配列を指定できますが、入れ子になったオブジェクトは指定できません — サーバーは、直下のプロパティ値が JSON
 * オブジェクトであるメタデータを拒否します。
 */
export type GenericMetadataValue = string | number | boolean | GenericMetadataArrayItem[] | null;

export const genericMetadataValueSchema: Schema<GenericMetadataValue> = s.of<GenericMetadataValue>(
  s.nullable(
    s.union([
      s.string(),
      s.int(),
      s.float64(),
      s.boolean(),
      s.array(s.lazy(() => genericMetadataArrayItemSchema)),
    ]),
  ),
);
