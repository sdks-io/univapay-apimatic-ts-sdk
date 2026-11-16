import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** コンビニ決済および銀行振込設定で共有される、有効期限の算出に適用される時刻オーバーライド。 */
export type ExpirationTimeShift = {
  /** 有効期限の締め切り時刻を上書きする ISO-8601 オフセット時刻（HH:mm:ssXXX）。オーバーライドが設定されていない場合は、このキー自体が省略されます。 */
  value?: string;
  /** 時刻オーバーライドが適用されるかどうか。 */
  enabled?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const expirationTimeShiftSchema: Schema<ExpirationTimeShift> = s.object<ExpirationTimeShift>(
  {
    value: s.optional(s.string()),
    enabled: s.optional(s.boolean()),
  },
  { additionalProperties: s.json() },
);
