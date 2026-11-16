import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** チェックアウトウィジェットに適用される16進数カラー。カスタマイズされていない場合は常にここに示すプラットフォームのデフォルト値に解決され、`null` になることはありません。 */
export type CheckoutThemeColors = {
  /** メイン背景色。 */
  mainBackground?: string;
  /** セカンダリ背景色。 */
  secondaryBackground?: string;
  /** メインアクセントカラー。 */
  mainColor?: string;
  /** メインテキストカラー。 */
  mainText?: string;
  /** プライマリテキストカラー。 */
  primaryText?: string;
  /** セカンダリテキストカラー。 */
  secondaryText?: string;
  /** ベーステキストカラー。 */
  baseText?: string;
  /** 本文の背景色。 */
  bodyBackground?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutThemeColorsSchema: Schema<CheckoutThemeColors> = s.object<CheckoutThemeColors>(
  {
    mainBackground: s.optional(s.string()),
    secondaryBackground: s.optional(s.string()),
    mainColor: s.optional(s.string()),
    mainText: s.optional(s.string()),
    primaryText: s.optional(s.string()),
    secondaryText: s.optional(s.string()),
    baseText: s.optional(s.string()),
    bodyBackground: s.optional(s.string()),
    _keysMap: {
      mainBackground: "main_background",
      secondaryBackground: "secondary_background",
      mainColor: "main_color",
      mainText: "main_text",
      primaryText: "primary_text",
      secondaryText: "secondary_text",
      baseText: "base_text",
      bodyBackground: "body_background",
    },
  },
  { additionalProperties: s.json() },
);
