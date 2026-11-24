import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークン作成用の銀行振込データスキーマ。 */
export type TokenCreateBankTransferData = {
  /** 銀行ブランド識別子（例：'aozora_bank'）。 */
  brand: string;
  /** ISO 8601 期間形式（例：'PT168H'）。 */
  expirationPeriod?: string | null;
  /** 有効期限に適用されるタイムシフト。通常、特定のタイムゾーンにおける一日の終わりに設定するために使用されます（例：'23:59:59+09:00'）。 */
  expirationTimeShift?: string | null;
  /** 振込を開始する消費者の氏名。 */
  name?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenCreateBankTransferDataSchema: Schema<TokenCreateBankTransferData> =
  s.object<TokenCreateBankTransferData>(
    {
      brand: s.string(),
      expirationPeriod: s.optionalNullable(s.string()),
      expirationTimeShift: s.optionalNullable(s.string()),
      name: s.optional(s.string()),
      _keysMap: {
        expirationPeriod: "expiration_period",
        expirationTimeShift: "expiration_time_shift",
      },
    },
    { additionalProperties: s.json() },
  );
