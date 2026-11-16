import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 店舗スキャン（QR/バーコード読み取り）決済の設定。 */
export type MerchantWebhookQrScanConfiguration = {
  /** 店舗スキャン決済を有効にします。 */
  enabled?: boolean | null;
  /** 加盟店に対して無効化されている QR スキャンゲートウェイ。 */
  forbiddenQrScanGateways?: string[] | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookQrScanConfigurationSchema: Schema<MerchantWebhookQrScanConfiguration> =
  s.object<MerchantWebhookQrScanConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      forbiddenQrScanGateways: s.optionalNullable(s.array(s.string())),
      _keysMap: {
        forbiddenQrScanGateways: "forbidden_qr_scan_gateways",
      },
    },
    { additionalProperties: s.json() },
  );
