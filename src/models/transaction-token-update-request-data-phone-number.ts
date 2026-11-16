import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トランザクション・トークン更新リクエストデータ電話番号のスキーマ。 */
export type TransactionTokenUpdateRequestDataPhoneNumber = {
  /** 電話の国番号。 */
  countryCode?: string;
  /** 国内の電話番号（市外局番以降）。 */
  localNumber?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionTokenUpdateRequestDataPhoneNumberSchema: Schema<TransactionTokenUpdateRequestDataPhoneNumber> =
  s.object<TransactionTokenUpdateRequestDataPhoneNumber>(
    {
      countryCode: s.optional(s.string()),
      localNumber: s.optional(s.string()),
      _keysMap: {
        countryCode: "country_code",
        localNumber: "local_number",
      },
    },
    { additionalProperties: s.json() },
  );
