import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { chargeInternalSchema, chargeSchema, type Charge } from "./charge.js";

/** ページネーションされた課金リスト。 */
export type ChargeList = {
  /** リソースのリスト。 */
  items?: Charge[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** 一致するリソースの総数。 */
  totalHits?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeListProperties: s.Shape<ChargeList> = {
  items: s.optional(s.array(s.lazy(() => chargeInternalSchema))),
  hasMore: s.optional(s.boolean()),
  totalHits: s.optional(s.int()),
  _keysMap: {
    hasMore: "has_more",
    totalHits: "total_hits",
  },
};

export const chargeListInternalSchema: Schema<ChargeList> = s.object<ChargeList>(chargeListProperties, {
  additionalProperties: s.json(),
});

export const chargeListSchema: Schema<ChargeList> = s.lazySchema(() =>
  s.object<ChargeList>(
    {
      ...chargeListProperties,
      items: s.optional(s.array(s.lazy(() => chargeSchema))),
    },
    { additionalProperties: s.json() },
  ),
);
