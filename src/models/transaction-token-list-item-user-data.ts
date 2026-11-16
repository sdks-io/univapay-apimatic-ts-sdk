import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トランザクション・トークンリストアイテムユーザーデータのスキーマ。 */
export type TransactionTokenListItemUserData = {
  /** カード名義人の値。 */
  cardholderName?: string;
  /** 消費者のメールアドレス。 */
  email?: string;
  /** ブランドまたはネットワーク名。 */
  brand?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionTokenListItemUserDataSchema: Schema<TransactionTokenListItemUserData> =
  s.object<TransactionTokenListItemUserData>(
    {
      cardholderName: s.optional(s.string()),
      email: s.optional(s.string()),
      brand: s.optional(s.string()),
      _keysMap: {
        cardholderName: "cardholder_name",
      },
    },
    { additionalProperties: s.json() },
  );
