import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  baseKonbiniDataConvenienceStoreSchema,
  type BaseKonbiniDataConvenienceStore,
} from "./base-konbini-data-convenience-store.js";
import {
  tokenCreatePhoneNumberInternalSchema,
  tokenCreatePhoneNumberSchema,
  type TokenCreatePhoneNumber,
} from "./token-create-phone-number.js";

/** トークン作成用のコンビニデータスキーマ。 */
export type TokenCreateKonbiniData = {
  /** 消費者名。 */
  customerName: string;
  /** 基本コンビニデータ（コンビニエンスストア一覧）のスキーマ。 */
  convenienceStore: BaseKonbiniDataConvenienceStore;
  /** ISO-8601 期間形式（例：'P7D'）。デフォルトは30日です。 */
  expirationPeriod?: string | null;
  /** トークン作成用の電話番号スキーマ。 */
  phoneNumber: TokenCreatePhoneNumber;
  /** 有効期限のタイムシフト値。 */
  expirationTimeShift?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenCreateKonbiniDataProperties: s.Shape<TokenCreateKonbiniData> = {
  customerName: s.string(),
  convenienceStore: baseKonbiniDataConvenienceStoreSchema,
  expirationPeriod: s.optionalNullable(s.string()),
  phoneNumber: tokenCreatePhoneNumberInternalSchema,
  expirationTimeShift: s.optional(s.string()),
  _keysMap: {
    customerName: "customer_name",
    convenienceStore: "convenience_store",
    expirationPeriod: "expiration_period",
    phoneNumber: "phone_number",
    expirationTimeShift: "expiration_time_shift",
  },
};

export const tokenCreateKonbiniDataInternalSchema: Schema<TokenCreateKonbiniData> =
  s.object<TokenCreateKonbiniData>(tokenCreateKonbiniDataProperties, { additionalProperties: s.json() });

export const tokenCreateKonbiniDataSchema: Schema<TokenCreateKonbiniData> = s.lazySchema(() =>
  s.object<TokenCreateKonbiniData>(
    {
      ...tokenCreateKonbiniDataProperties,
      phoneNumber: tokenCreatePhoneNumberSchema,
    },
    { additionalProperties: s.json() },
  ),
);
