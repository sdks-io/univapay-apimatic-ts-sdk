import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークン作成用のQR加盟店（MPM）データスキーマ。 */
export type TokenCreateQrMerchantData = {
  /**
   * Merchant-Presented Mode のコードを生成する対象のQR-MPMブランド。サーバー側で対応ブランドリストに対して厳密に検証されます。代表的な値には
   * `rakuten_pay_merchant`、`alipay_merchant_qr`、`pay_pay_merchant`、`d_barai_mpm`、`we_chat_mpm`
   * があります。これはオープンな値セットとして扱ってください（サーバー側でブランドが随時追加される可能性があります）。
   */
  brand: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenCreateQrMerchantDataSchema: Schema<TokenCreateQrMerchantData> =
  s.object<TokenCreateQrMerchantData>(
    {
      brand: s.string(),
    },
    { additionalProperties: s.json() },
  );
