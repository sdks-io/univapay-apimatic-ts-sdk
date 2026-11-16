import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 税関申告フォーマッタによって返される結果ペイロード。 */
export type CustomsDeclarationWebhookResult = {
  /** 申告を承認した税関当局。 */
  approvingAuthority?: string | null;
  /** ゲートウェイのトランザクション（トレード）識別子。 */
  tradeId?: string | null;
  /** 税関用のゲートウェイトランザクション識別子。 */
  transactionId?: string | null;
  /** 申告にリンクされているゲートウェイの課金トランザクション識別子。 */
  chargeTransactionId?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookResultSchema: Schema<CustomsDeclarationWebhookResult> =
  s.object<CustomsDeclarationWebhookResult>(
    {
      approvingAuthority: s.optionalNullable(s.string()),
      tradeId: s.optionalNullable(s.string()),
      transactionId: s.optionalNullable(s.string()),
      chargeTransactionId: s.optionalNullable(s.string()),
      _keysMap: {
        approvingAuthority: "approving_authority",
        tradeId: "trade_id",
        transactionId: "transaction_id",
        chargeTransactionId: "charge_transaction_id",
      },
    },
    { additionalProperties: s.json() },
  );
