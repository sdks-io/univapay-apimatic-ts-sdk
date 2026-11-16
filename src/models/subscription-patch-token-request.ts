import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 定期課金の決済手段（トランザクション・トークン）を更新するためのリクエストボディ。新しいトークンは、同じ店舗に属し、アクティブであり、定期課金のモードと一致している必要があります。 */
export type SubscriptionPatchTokenRequest = {
  /**
   * 今後の定期課金決済に使用する新しいトランザクション・トークンの ID。同じ店舗の継続（recurring）または定期課金（subscription）タイプのトークンである必要があります。
   */
  transactionTokenId: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionPatchTokenRequestSchema: Schema<SubscriptionPatchTokenRequest> =
  s.object<SubscriptionPatchTokenRequest>(
    {
      transactionTokenId: s.string(),
      _keysMap: {
        transactionTokenId: "transaction_token_id",
      },
    },
    { additionalProperties: s.json() },
  );
