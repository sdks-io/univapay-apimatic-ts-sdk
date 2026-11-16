import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  directDebitBankTransferInternalSchema,
  directDebitBankTransferSchema,
  type DirectDebitBankTransfer,
} from "./direct-debit-bank-transfer.js";

/** 口座振替の振替のページネーションされたリスト。 */
export type DirectDebitBankTransferList = {
  /** リソースのリスト。 */
  items?: DirectDebitBankTransfer[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankTransferListProperties: s.Shape<DirectDebitBankTransferList> = {
  items: s.optional(s.array(s.lazy(() => directDebitBankTransferInternalSchema))),
  hasMore: s.optional(s.boolean()),
  _keysMap: {
    hasMore: "has_more",
  },
};

export const directDebitBankTransferListInternalSchema: Schema<DirectDebitBankTransferList> =
  s.object<DirectDebitBankTransferList>(directDebitBankTransferListProperties, {
    additionalProperties: s.json(),
  });

export const directDebitBankTransferListSchema: Schema<DirectDebitBankTransferList> = s.lazySchema(() =>
  s.object<DirectDebitBankTransferList>(
    {
      ...directDebitBankTransferListProperties,
      items: s.optional(s.array(s.lazy(() => directDebitBankTransferSchema))),
    },
    { additionalProperties: s.json() },
  ),
);
