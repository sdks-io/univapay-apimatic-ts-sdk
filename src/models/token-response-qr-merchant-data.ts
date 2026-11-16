import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンス用のQR加盟店（MPM）データスキーマ。 */
export type TokenResponseQrMerchantData = {
  /**
   * 利用者側でQRコードとして描画するためのペイロード(内容はブランドによって異なり、URLの場合とそうでない場合があります)。ブランドによっては画像URLを返しますが、コンビニ提示型QRブランドなど、URL形式ではない不透明な数値コードを返すものもあります。トークン/課金作成の直後に非同期で設定されます。設定されるまでは
   * `null` です。
   */
  qrImageUrl: string | null;
  /** このコードが生成されたQR-MPMブランド。 */
  brand?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseQrMerchantDataSchema: Schema<TokenResponseQrMerchantData> =
  s.object<TokenResponseQrMerchantData>(
    {
      qrImageUrl: s.nullable(s.string()),
      brand: s.optionalNullable(s.string()),
      _keysMap: {
        qrImageUrl: "qr_image_url",
      },
    },
    { additionalProperties: s.json() },
  );
