import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 分割払い決済で利用可能なカードプロセッサの機能。 */
export type CardProcessorInstallmentConfig = {
  /** サポートされているプロセッサを介したリボ払いを許可します。 */
  revolving?: boolean | null;
  /** サポートされているプロセッサを介した回数固定の分割払いを許可します。 */
  fixedCycle?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const cardProcessorInstallmentConfigSchema: Schema<CardProcessorInstallmentConfig> =
  s.object<CardProcessorInstallmentConfig>(
    {
      revolving: s.optionalNullable(s.boolean()),
      fixedCycle: s.optionalNullable(s.boolean()),
      _keysMap: {
        fixedCycle: "fixed_cycle",
      },
    },
    { additionalProperties: s.json() },
  );
