import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 課金失敗が繰り返された後に適用される IP 制限ポリシー。 */
export type RestrictIpAfterFailedChargeConfig = {
  /** 失敗の多発後に一時的な IP 制限を有効にします。 */
  enabled?: boolean | null;
  /** 制限が開始されるまでに許容される課金失敗回数。 */
  count?: number | null;
  /** IP 制限が有効のまま残る ISO-8601 期間。 */
  cooldown?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const restrictIpAfterFailedChargeConfigSchema: Schema<RestrictIpAfterFailedChargeConfig> =
  s.object<RestrictIpAfterFailedChargeConfig>(
    {
      enabled: s.optionalNullable(s.boolean()),
      count: s.optionalNullable(s.int()),
      cooldown: s.optionalNullable(s.string()),
    },
    { additionalProperties: s.json() },
  );
