import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * イベントタイプの識別子 —
 * `token_created`、`token_updated`、`token_three_d_s_updated`、`token_cvv_auth_updated`、`token_cvv_auth_check_updated`、`token_replaced`、または
 * `recurring_token_deleted`。
 */
export const TokenEvent = {
  TokenCreated: "token_created",
  TokenUpdated: "token_updated",
  TokenThreeDsUpdated: "token_three_d_s_updated",
  TokenCvvAuthUpdated: "token_cvv_auth_updated",
  TokenCvvAuthCheckUpdated: "token_cvv_auth_check_updated",
  TokenReplaced: "token_replaced",
  RecurringTokenDeleted: "recurring_token_deleted",
} as const;
export type TokenEvent = (typeof TokenEvent)[keyof typeof TokenEvent] | (string & {});

export const tokenEventSchema: EnumSchema<TokenEvent> = s.enumOf<TokenEvent>(TokenEvent);
