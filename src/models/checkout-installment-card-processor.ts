import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 分割払い決済で利用可能なカードプロセッサの機能。 */
export type CheckoutInstallmentCardProcessor = {
  /** リボ払いの分割払いを許可するかどうか。 */
  revolving?: boolean;
  /** 回数固定の分割払いを許可するかどうか。 */
  fixedCycle?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutInstallmentCardProcessorSchema: Schema<CheckoutInstallmentCardProcessor> =
  s.object<CheckoutInstallmentCardProcessor>(
    {
      revolving: s.optional(s.boolean()),
      fixedCycle: s.optional(s.boolean()),
      _keysMap: {
        fixedCycle: "fixed_cycle",
      },
    },
    { additionalProperties: s.json() },
  );
