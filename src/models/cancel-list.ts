import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { cancelSchema, type Cancel } from "./cancel.js";

/** ページネーションされたキャンセルリスト。 */
export type CancelList = {
  /** リソースのリスト。 */
  items?: Cancel[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cancelListSchema: Schema<CancelList> = s.object<CancelList>(
  {
    items: s.optional(s.array(s.lazy(() => cancelSchema))),
    hasMore: s.optional(s.boolean()),
    _keysMap: {
      hasMore: "has_more",
    },
  },
  { additionalProperties: s.json() },
);
