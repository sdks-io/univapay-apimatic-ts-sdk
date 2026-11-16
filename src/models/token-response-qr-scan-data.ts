import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークンレスポンス用のQRスキャン（CPM）データスキーマ。 */
export type TokenResponseQrScanData = {
  /**
   * スキャンされたコードから検出されたQR-CPMブランド（例:
   * `pay_pay`、`we_chat`、`qq`、`line_pay`、`au_pay`、`alipay_china`）。これはオープンな値セットであり、予告なく新しいブランドが追加される場合があります。スキャンされたコードが既知のブランドとして解析できなかった場合は
   * `null` が返されます。
   */
  brand: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseQrScanDataSchema: Schema<TokenResponseQrScanData> =
  s.object<TokenResponseQrScanData>(
    {
      brand: s.nullable(s.string()),
    },
    { additionalProperties: s.json() },
  );
