import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンス用の銀行振込データスキーマ。 */
export type TokenResponseBankTransferData = {
  /** 銀行ブランド識別子（例：'aozora_bank'）。 */
  brand?: string;
  /** ISO 8601 期間形式（例：'PT168H'）。 */
  expirationPeriod?: string;
  /** 有効期限に適用されるタイムシフト。通常、特定のタイムゾーンにおける一日の終わりに設定するために使用されます（例：'23:59:59+09:00'）。 */
  expirationTimeShift?: string | null;
  /** 金融機関コード。 */
  bankCode?: string | null;
  /** 金融機関名。 */
  bankName?: string | null;
  /** 支店コード。 */
  branchCode?: string | null;
  /** 支店名。 */
  branchName?: string | null;
  /** 口座番号。 */
  accountNumber?: string | null;
  /** 口座名義。 */
  accountHolderName?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseBankTransferDataSchema: Schema<TokenResponseBankTransferData> =
  s.object<TokenResponseBankTransferData>(
    {
      brand: s.optional(s.string()),
      expirationPeriod: s.optional(s.string()),
      expirationTimeShift: s.optionalNullable(s.string()),
      bankCode: s.optionalNullable(s.string()),
      bankName: s.optionalNullable(s.string()),
      branchCode: s.optionalNullable(s.string()),
      branchName: s.optionalNullable(s.string()),
      accountNumber: s.optionalNullable(s.string()),
      accountHolderName: s.optionalNullable(s.string()),
      _keysMap: {
        expirationPeriod: "expiration_period",
        expirationTimeShift: "expiration_time_shift",
        bankCode: "bank_code",
        bankName: "bank_name",
        branchCode: "branch_code",
        branchName: "branch_name",
        accountNumber: "account_number",
        accountHolderName: "account_holder_name",
      },
    },
    { additionalProperties: s.json() },
  );
