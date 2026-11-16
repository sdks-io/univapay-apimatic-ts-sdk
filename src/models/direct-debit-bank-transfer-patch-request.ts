import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 振替の金額を変更するためのリクエストペイロード。振替が未ロックの場合にのみ許可されます。 */
export type DirectDebitBankTransferPatchRequest = {
  /** 振替金額 (日本円)。ゼロより大きい整数である必要があります。 */
  amount: number;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitBankTransferPatchRequestProperties: s.Shape<DirectDebitBankTransferPatchRequest> = {
  amount: s.int(),
};

export const directDebitBankTransferPatchRequestInternalSchema: Schema<DirectDebitBankTransferPatchRequest> =
  s.object<DirectDebitBankTransferPatchRequest>(directDebitBankTransferPatchRequestProperties, {
    additionalProperties: s.json(),
  });

export const directDebitBankTransferPatchRequestSchema: Schema<DirectDebitBankTransferPatchRequest> =
  s.lazySchema(() =>
    s.object<DirectDebitBankTransferPatchRequest>(
      {
        ...directDebitBankTransferPatchRequestProperties,
        amount: s.int().check(s.gte(1)),
      },
      { additionalProperties: s.json() },
    ),
  );
