import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * チェックアウト設定に反映される、店舗の処理モード。`live` と `test` は認証に使用された資格情報を反映し、`live_test`
 * は本番モードのデータに対してテストを行う特権を持つ呼び出し元向けに予約されています。
 */
export const CheckoutMode = {
  Live: "live",
  Test: "test",
  LiveTest: "live_test",
} as const;
export type CheckoutMode = (typeof CheckoutMode)[keyof typeof CheckoutMode] | (string & {});

export const checkoutModeSchema: EnumSchema<CheckoutMode> = s.enumOf<CheckoutMode>(CheckoutMode);
