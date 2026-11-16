import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 継続（recurring）トークンをアクティブステータスでフィルタリングします。 */
export const TransactionTokenActiveFilter = {
  Active: "active",
  Inactive: "inactive",
  All: "all",
} as const;
export type TransactionTokenActiveFilter =
  | (typeof TransactionTokenActiveFilter)[keyof typeof TransactionTokenActiveFilter]
  | (string & {});

export const transactionTokenActiveFilterSchema: EnumSchema<TransactionTokenActiveFilter> =
  s.enumOf<TransactionTokenActiveFilter>(TransactionTokenActiveFilter);
