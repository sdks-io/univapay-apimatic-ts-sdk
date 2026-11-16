import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 決定論的な消費者 ID を導出するためのリクエスト・ペイロード。 */
export type CreateCustomerIdRequest = {
  /** 加盟店自身のローカルな消費者識別子。店舗ごとの決定論的な UUID を生成するためのシードとして使用されます。 */
  customerId: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const createCustomerIdRequestProperties: s.Shape<CreateCustomerIdRequest> = {
  customerId: s.string(),
  _keysMap: {
    customerId: "customer_id",
  },
};

export const createCustomerIdRequestInternalSchema: Schema<CreateCustomerIdRequest> =
  s.object<CreateCustomerIdRequest>(createCustomerIdRequestProperties, { additionalProperties: s.json() });

export const createCustomerIdRequestSchema: Schema<CreateCustomerIdRequest> = s.lazySchema(() =>
  s.object<CreateCustomerIdRequest>(
    {
      ...createCustomerIdRequestProperties,
      customerId: s.string().check(s.minLength(1), s.maxLength(64)),
    },
    { additionalProperties: s.json() },
  ),
);
