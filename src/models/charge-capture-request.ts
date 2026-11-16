import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** オーソリ済み課金のキャプチャ（売上確定）用のリクエスト・ペイロード。両方のフィールドは任意です。未指定の場合は本文全体を省略でき、その場合はオーソリ済みの全額がキャプチャされます。 */
export type ChargeCaptureRequest = {
  /**
   * キャプチャする金額。オーソリされた金額以下である必要があります。省略した場合、オーソリ済みの未決済全額がキャプチャされます。オーソリ金額より少ない金額は部分キャプチャとなり、部分キャプチャが有効化されていない場合は
   * `PARTIAL_CAPTURE_NOT_ALLOWED` で拒否されます。
   */
  amount?: number;
  /** ISO-4217 通貨コード。オーソリ時に使用された通貨と完全に一致する必要があります。省略した場合、課金作成時にリクエストされた通貨がデフォルトとして使用されます。 */
  currency?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const chargeCaptureRequestSchema: Schema<ChargeCaptureRequest> = s.object<ChargeCaptureRequest>(
  {
    amount: s.optional(s.int()),
    currency: s.optional(s.string()),
  },
  { additionalProperties: s.json() },
);
