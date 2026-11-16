import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { checkoutThemeColorsSchema, type CheckoutThemeColors } from "./checkout-theme-colors.js";

/** チェックアウトに適用されるウィジェットテーマ。 */
export type CheckoutTheme = {
  /** チェックアウトウィジェットに適用される16進数カラー。カスタマイズされていない場合は常にここに示すプラットフォームのデフォルト値に解決され、`null` になることはありません。 */
  colors?: CheckoutThemeColors;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutThemeSchema: Schema<CheckoutTheme> = s.object<CheckoutTheme>(
  {
    colors: s.optional(s.lazy(() => checkoutThemeColorsSchema)),
  },
  { additionalProperties: s.json() },
);
