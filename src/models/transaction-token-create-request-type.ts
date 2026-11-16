import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 作成するトークンのタイプ。指定できる値は `payment_type` によって異なります。`card` と `konbini` は3種類すべてを指定できます。`bank_transfer` は
 * `one_time` と `recurring` のみ、`online`・`qr_scan`・`qr_merchant` は `one_time`
 * のみ指定できます。それ以外の組み合わせは、`type` フィールドに対する `INVALID_TOKEN_TYPE` で拒否されます。
 */
export const TransactionTokenCreateRequestType = {
  OneTime: "one_time",
  Subscription: "subscription",
  Recurring: "recurring",
} as const;
export type TransactionTokenCreateRequestType =
  | (typeof TransactionTokenCreateRequestType)[keyof typeof TransactionTokenCreateRequestType]
  | (string & {});

export const transactionTokenCreateRequestTypeSchema: EnumSchema<TransactionTokenCreateRequestType> =
  s.enumOf<TransactionTokenCreateRequestType>(TransactionTokenCreateRequestType);
