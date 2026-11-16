import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 基本オンラインデータ（決済ブランド）のスキーマ。`alipay_china`、`alipay_hk`、`gcash`、`dana`、`truemoney`、`kakaopay`、`tng`、`rabbit_line_pay`、`bpi`、`boost`、`tinaba`、`naver_pay`、`toss_pay`、`maya`、`grab_sg`、`kredivo_id`、`k_plus`、`kaspi_kz`
 * は、`alipay_plus_online` ゲートウェイファミリー経由でルーティングされる Alipay+ の地域ウォレットです。
 */
export const BaseOnlineDataBrand = {
  AlipayOnline: "alipay_online",
  AlipayPlusOnline: "alipay_plus_online",
  PayPayOnline: "pay_pay_online",
  WeChatOnline: "we_chat_online",
  DBaraiOnline: "d_barai_online",
  AlipayChina: "alipay_china",
  AlipayHk: "alipay_hk",
  Gcash: "gcash",
  Dana: "dana",
  Truemoney: "truemoney",
  Kakaopay: "kakaopay",
  Tng: "tng",
  RabbitLinePay: "rabbit_line_pay",
  Bpi: "bpi",
  Boost: "boost",
  Tinaba: "tinaba",
  NaverPay: "naver_pay",
  TossPay: "toss_pay",
  Maya: "maya",
  GrabSg: "grab_sg",
  KredivoId: "kredivo_id",
  KPlus: "k_plus",
  KaspiKz: "kaspi_kz",
} as const;
export type BaseOnlineDataBrand =
  | (typeof BaseOnlineDataBrand)[keyof typeof BaseOnlineDataBrand]
  | (string & {});

export const baseOnlineDataBrandSchema: EnumSchema<BaseOnlineDataBrand> =
  s.enumOf<BaseOnlineDataBrand>(BaseOnlineDataBrand);
