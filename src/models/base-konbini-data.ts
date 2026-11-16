import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  baseKonbiniDataConvenienceStoreSchema,
  type BaseKonbiniDataConvenienceStore,
} from "./base-konbini-data-convenience-store.js";

/** 基本コンビニデータ（Base Konbini Data）のスキーマ。 */
export type BaseKonbiniData = {
  /** 消費者名。 */
  customerName?: string;
  /** 基本コンビニデータ（コンビニエンスストア一覧）のスキーマ。 */
  convenienceStore?: BaseKonbiniDataConvenienceStore;
  /** ISO-8601 期間形式（例：'P7D'）。デフォルトは30日です。 */
  expirationPeriod?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const baseKonbiniDataSchema: Schema<BaseKonbiniData> = s.object<BaseKonbiniData>(
  {
    customerName: s.optional(s.string()),
    convenienceStore: s.optional(s.lazy(() => baseKonbiniDataConvenienceStoreSchema)),
    expirationPeriod: s.optional(s.string()),
    _keysMap: {
      customerName: "customer_name",
      convenienceStore: "convenience_store",
      expirationPeriod: "expiration_period",
    },
  },
  { additionalProperties: s.json() },
);
