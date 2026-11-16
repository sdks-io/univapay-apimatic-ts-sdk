import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** トランザクション・トークンモードのスキーマ。 */
export const TransactionTokenMode = {
  Live: "live",
  Test: "test",
} as const;
export type TransactionTokenMode =
  | (typeof TransactionTokenMode)[keyof typeof TransactionTokenMode]
  | (string & {});

export const transactionTokenModeSchema: EnumSchema<TransactionTokenMode> =
  s.enumOf<TransactionTokenMode>(TransactionTokenMode);
