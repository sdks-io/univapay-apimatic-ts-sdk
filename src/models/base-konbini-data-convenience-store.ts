import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 基本コンビニデータ（コンビニエンスストア一覧）のスキーマ。 */
export const BaseKonbiniDataConvenienceStore = {
  SevenEleven: "seven_eleven",
  FamilyMart: "family_mart",
  Lawson: "lawson",
  MiniStop: "mini_stop",
  SeicoMart: "seico_mart",
  PayEasy: "pay_easy",
  DailyYamazaki: "daily_yamazaki",
  YamazakiDailyStore: "yamazaki_daily_store",
} as const;
export type BaseKonbiniDataConvenienceStore =
  | (typeof BaseKonbiniDataConvenienceStore)[keyof typeof BaseKonbiniDataConvenienceStore]
  | (string & {});

export const baseKonbiniDataConvenienceStoreSchema: EnumSchema<BaseKonbiniDataConvenienceStore> =
  s.enumOf<BaseKonbiniDataConvenienceStore>(BaseKonbiniDataConvenienceStore);
