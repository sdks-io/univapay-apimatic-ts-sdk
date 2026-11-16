import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  directDebitBankAccountInternalSchema,
  directDebitBankAccountSchema,
  type DirectDebitBankAccount,
} from "./direct-debit-bank-account.js";

/** 口座振替の銀行口座のページネーションされたリスト。 */
export type DirectDebitBankAccountList = {
  /** リソースのリスト。 */
  items?: DirectDebitBankAccount[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankAccountListProperties: s.Shape<DirectDebitBankAccountList> = {
  items: s.optional(s.array(s.lazy(() => directDebitBankAccountInternalSchema))),
  hasMore: s.optional(s.boolean()),
  _keysMap: {
    hasMore: "has_more",
  },
};

export const directDebitBankAccountListInternalSchema: Schema<DirectDebitBankAccountList> =
  s.object<DirectDebitBankAccountList>(directDebitBankAccountListProperties, {
    additionalProperties: s.json(),
  });

export const directDebitBankAccountListSchema: Schema<DirectDebitBankAccountList> = s.lazySchema(() =>
  s.object<DirectDebitBankAccountList>(
    {
      ...directDebitBankAccountListProperties,
      items: s.optional(s.array(s.lazy(() => directDebitBankAccountSchema))),
    },
    { additionalProperties: s.json() },
  ),
);
