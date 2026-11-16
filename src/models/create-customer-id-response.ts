import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 決定論的な消費者 ID の導出後に返されるレスポンス・ペイロード。 */
export type CreateCustomerIdResponse = {
  /** 店舗と指定されたローカルな `customer_id` から導出された決定論的な UUID。同じ入力で繰り返し呼び出しても同一の値になります。 */
  customerId?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const createCustomerIdResponseSchema: Schema<CreateCustomerIdResponse> =
  s.object<CreateCustomerIdResponse>(
    {
      customerId: s.optional(s.string()),
      _keysMap: {
        customerId: "customer_id",
      },
    },
    { additionalProperties: s.json() },
  );
