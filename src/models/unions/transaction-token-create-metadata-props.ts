import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import {
  genericMetadataArrayItemSchema,
  type GenericMetadataArrayItem,
} from "./generic-metadata-array-item.js";

/**
 * GenericMetadataValue のエイリアス。このスキーマ名は公開 SDK の一部であるため保持されています。範囲を狭めないでください。契約内容は
 * GenericMetadataValue を参照してください。
 */
export type TransactionTokenCreateMetadataProps =
  | string
  | number
  | boolean
  | GenericMetadataArrayItem[]
  | null;

export const transactionTokenCreateMetadataPropsSchema: Schema<TransactionTokenCreateMetadataProps> =
  s.of<TransactionTokenCreateMetadataProps>(
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
