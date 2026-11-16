import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  baseKonbiniDataConvenienceStoreSchema,
  type BaseKonbiniDataConvenienceStore,
} from "./base-konbini-data-convenience-store.js";
import {
  tokenResponsePhoneNumberSchema,
  type TokenResponsePhoneNumber,
} from "./token-response-phone-number.js";

/** トークンレスポンス用のコンビニデータスキーマ。 */
export type TokenResponseKonbiniData = {
  /** 消費者名。 */
  customerName?: string;
  /** 基本コンビニデータ（コンビニエンスストア一覧）のスキーマ。 */
  convenienceStore?: BaseKonbiniDataConvenienceStore;
  /** ISO-8601 期間形式（例：'P7D'）。デフォルトは30日です。 */
  expirationPeriod?: string;
  /** 有効期限に適用されるタイムシフト。通常、特定のタイムゾーンにおける一日の終わりに設定するために使用されます（例：'23:59:59.999999+09:00'）。 */
  expirationTimeShift?: string | null;
  /** トークンレスポンス用の電話番号スキーマ。 */
  phoneNumber?: TokenResponsePhoneNumber;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponseKonbiniDataSchema: Schema<TokenResponseKonbiniData> =
  s.object<TokenResponseKonbiniData>(
    {
      customerName: s.optional(s.string()),
      convenienceStore: s.optional(s.lazy(() => baseKonbiniDataConvenienceStoreSchema)),
      expirationPeriod: s.optional(s.string()),
      expirationTimeShift: s.optionalNullable(s.string()),
      phoneNumber: s.optional(s.lazy(() => tokenResponsePhoneNumberSchema)),
      _keysMap: {
        customerName: "customer_name",
        convenienceStore: "convenience_store",
        expirationPeriod: "expiration_period",
        expirationTimeShift: "expiration_time_shift",
        phoneNumber: "phone_number",
      },
    },
    { additionalProperties: s.json() },
  );
