import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** トークンレスポンスのカードデータ3Dセキュアステータスのスキーマ。 */
export const TokenResponseCardDataThreeDsStatus = {
  Pending: "pending",
  Awaiting: "awaiting",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
} as const;
export type TokenResponseCardDataThreeDsStatus =
  | (typeof TokenResponseCardDataThreeDsStatus)[keyof typeof TokenResponseCardDataThreeDsStatus]
  | (string & {});

export const tokenResponseCardDataThreeDsStatusSchema: EnumSchema<TokenResponseCardDataThreeDsStatus> =
  s.enumOf<TokenResponseCardDataThreeDsStatus>(TokenResponseCardDataThreeDsStatus);
