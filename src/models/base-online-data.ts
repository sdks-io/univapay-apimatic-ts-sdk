import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { baseOnlineDataBrandSchema, type BaseOnlineDataBrand } from "./base-online-data-brand.js";
import {
  baseOnlineDataCallMethodSchema,
  type BaseOnlineDataCallMethod,
} from "./base-online-data-call-method.js";
import { baseOnlineDataOsTypeSchema, type BaseOnlineDataOsType } from "./base-online-data-os-type.js";
import {
  baseOnlineDataUserIdentifierSourceSchema,
  type BaseOnlineDataUserIdentifierSource,
} from "./base-online-data-user-identifier-source.js";

/** 基本オンラインデータ（Base Online Data）のスキーマ。 */
export type BaseOnlineData = {
  /**
   * 基本オンラインデータ（決済ブランド）のスキーマ。`alipay_china`、`alipay_hk`、`gcash`、`dana`、`truemoney`、`kakaopay`、`tng`、`rabbit_line_pay`、`bpi`、`boost`、`tinaba`、`naver_pay`、`toss_pay`、`maya`、`grab_sg`、`kredivo_id`、`k_plus`、`kaspi_kz`
   * は、`alipay_plus_online` ゲートウェイファミリー経由でルーティングされる Alipay+ の地域ウォレットです。
   */
  brand?: BaseOnlineDataBrand;
  /** 基本オンラインデータ（呼び出し方法）のスキーマ。 */
  callMethod?: BaseOnlineDataCallMethod;
  /** 基本オンラインデータ（OS タイプ）のスキーマ。 */
  osType?: BaseOnlineDataOsType | null;
  /** 不正防止のために一部のゲートウェイで要求される消費者特有の識別子。 */
  userIdentifier?: string | null;
  /** ユーザー識別子のソース。 */
  userIdentifierSource?: BaseOnlineDataUserIdentifierSource | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const baseOnlineDataSchema: Schema<BaseOnlineData> = s.object<BaseOnlineData>(
  {
    brand: s.optional(s.lazy(() => baseOnlineDataBrandSchema)),
    callMethod: s.optional(s.lazy(() => baseOnlineDataCallMethodSchema)),
    osType: s.optionalNullable(s.lazy(() => baseOnlineDataOsTypeSchema)),
    userIdentifier: s.optionalNullable(s.string()),
    userIdentifierSource: s.optionalNullable(s.lazy(() => baseOnlineDataUserIdentifierSourceSchema)),
    _keysMap: {
      callMethod: "call_method",
      osType: "os_type",
      userIdentifier: "user_identifier",
      userIdentifierSource: "user_identifier_source",
    },
  },
  { additionalProperties: s.json() },
);
