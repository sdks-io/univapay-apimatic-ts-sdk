import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 有効な銀行口座に対して振替を予約するためのリクエストペイロード。 */
export type DirectDebitBankTransferCreateRequest = {
  /** 振替金額 (日本円)。ゼロより大きい整数である必要があります。 */
  amount: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankTransferCreateRequestProperties: s.Shape<DirectDebitBankTransferCreateRequest> = {
  amount: s.int(),
};

export const directDebitBankTransferCreateRequestInternalSchema: Schema<DirectDebitBankTransferCreateRequest> =
  s.object<DirectDebitBankTransferCreateRequest>(directDebitBankTransferCreateRequestProperties, {
    additionalProperties: s.json(),
  });

export const directDebitBankTransferCreateRequestSchema: Schema<DirectDebitBankTransferCreateRequest> =
  s.lazySchema(() =>
    s.object<DirectDebitBankTransferCreateRequest>(
      {
        ...directDebitBankTransferCreateRequestProperties,
        amount: s.int().check(s.gte(1)),
      },
      { additionalProperties: s.json() },
    ),
  );
