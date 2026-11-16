import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { bankTransferLedgerSchema, type BankTransferLedger } from "./bank-transfer-ledger.js";

/** ページネーションされた銀行振込台帳エントリのリスト。 */
export type BankTransferLedgerList = {
  /** リソースのリスト。 */
  items?: BankTransferLedger[];
  /** さらに結果が利用可能かどうか。 */
  hasMore?: boolean;
  /** 一致するリソースの総数。 */
  totalHits?: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const bankTransferLedgerListSchema: Schema<BankTransferLedgerList> = s.object<BankTransferLedgerList>(
  {
    items: s.optional(s.array(s.lazy(() => bankTransferLedgerSchema))),
    hasMore: s.optional(s.boolean()),
    totalHits: s.optional(s.int()),
    _keysMap: {
      hasMore: "has_more",
      totalHits: "total_hits",
    },
  },
  { additionalProperties: s.json() },
);
