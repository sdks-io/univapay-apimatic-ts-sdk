import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** QR スキャン（CPM）決済の、チェックアウトに適用される設定。 */
export type CheckoutQrScanConfiguration = {
  /** QR スキャン決済が有効かどうか。 */
  enabled?: boolean;
  /**
   * 加盟店に対して無効化されている QR スキャンゲートウェイ。一般的な値には
   * `alipay`、`alipay_plus`、`pay_pay`、`we_chat`、`univapay`、`test` が含まれます。無効化されているゲートウェイがない場合は `null`
   * になります。
   */
  forbiddenQrScanGateways?: string[] | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutQrScanConfigurationSchema: Schema<CheckoutQrScanConfiguration> =
  s.object<CheckoutQrScanConfiguration>(
    {
      enabled: s.optional(s.boolean()),
      forbiddenQrScanGateways: s.optionalNullable(s.array(s.string())),
      _keysMap: {
        forbiddenQrScanGateways: "forbidden_qr_scan_gateways",
      },
    },
    { additionalProperties: s.json() },
  );
