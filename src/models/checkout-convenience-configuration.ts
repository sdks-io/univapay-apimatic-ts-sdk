import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { expirationTimeShiftSchema, type ExpirationTimeShift } from "./expiration-time-shift.js";

/** コンビニエンスストア決済の、チェックアウトに適用される設定。 */
export type CheckoutConvenienceConfiguration = {
  /** コンビニ決済が有効かどうか。 */
  enabled?: boolean;
  /** コンビニ決済の有効期限が切れるまでの ISO-8601 期間。 */
  expiration?: string;
  /** コンビニ決済および銀行振込設定で共有される、有効期限の算出に適用される時刻オーバーライド。 */
  expirationTimeShift?: ExpirationTimeShift;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutConvenienceConfigurationSchema: Schema<CheckoutConvenienceConfiguration> =
  s.object<CheckoutConvenienceConfiguration>(
    {
      enabled: s.optional(s.boolean()),
      expiration: s.optional(s.string()),
      expirationTimeShift: s.optional(s.lazy(() => expirationTimeShiftSchema)),
      _keysMap: {
        expirationTimeShift: "expiration_time_shift",
      },
    },
    { additionalProperties: s.json() },
  );
