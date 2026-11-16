import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** トークン作成用のQRスキャン（CPM）データスキーマ。 */
export type TokenCreateQrScanData = {
  /**
   * 消費者の決済アプリからスキャンしたQR/バーコードのペイロード（Customer-Presented Mode）。`type` が `one_time`
   * の場合にのみ有効です。`subscription`/`recurring` のトークンタイプはサーバー側で拒否されます。
   */
  scannedQr: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenCreateQrScanDataSchema: Schema<TokenCreateQrScanData> = s.object<TokenCreateQrScanData>(
  {
    scannedQr: s.string(),
    _keysMap: {
      scannedQr: "scanned_qr",
    },
  },
  { additionalProperties: s.json() },
);
