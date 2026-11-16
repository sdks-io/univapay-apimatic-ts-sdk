import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  tokenResponsePaidyDataShippingAddressSchema,
  type TokenResponsePaidyDataShippingAddress,
} from "./token-response-paidy-data-shipping-address.js";

/** トークンレスポンス用のPaidyデータスキーマ。 */
export type TokenResponsePaidyData = {
  /** クライアント側のPaidy SDK/ウィジェットが発行するワンタイムトークン。 */
  paidyToken: string;
  /** 日本形式の消費者電話番号。 */
  phoneNumber?: string | null;
  /** Paidyトークンに対して返される配送先住所。 */
  shippingAddress?: TokenResponsePaidyDataShippingAddress;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const tokenResponsePaidyDataSchema: Schema<TokenResponsePaidyData> = s.object<TokenResponsePaidyData>(
  {
    paidyToken: s.string(),
    phoneNumber: s.optionalNullable(s.string()),
    shippingAddress: s.optional(s.lazy(() => tokenResponsePaidyDataShippingAddressSchema)),
    _keysMap: {
      paidyToken: "paidy_token",
      phoneNumber: "phone_number",
      shippingAddress: "shipping_address",
    },
  },
  { additionalProperties: s.json() },
);
