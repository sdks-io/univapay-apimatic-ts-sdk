import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 消費者向けの決済手段サマリーデータ。 */
export type SubscriptionUserData = {
  /** リソースのタイプ。 */
  type?: string;
  /** カード名義人の値。 */
  cardholderName?: string | null;
  /** 消費者のメールアドレス。 */
  email?: string | null;
  /** ブランドまたはネットワーク名。 */
  brand?: string | null;
  /** ゲートウェイ識別子。 */
  gateway?: string | null;
  /** サービスプロバイダー識別子。 */
  serviceProvider?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionUserDataProperties: s.Shape<SubscriptionUserData> = {
  type: s.optional(s.string()),
  cardholderName: s.optionalNullable(s.string()),
  email: s.optionalNullable(s.string()),
  brand: s.optionalNullable(s.string()),
  gateway: s.optionalNullable(s.string()),
  serviceProvider: s.optionalNullable(s.string()),
  _keysMap: {
    cardholderName: "cardholder_name",
    serviceProvider: "service_provider",
  },
};

export const subscriptionUserDataInternalSchema: Schema<SubscriptionUserData> =
  s.object<SubscriptionUserData>(subscriptionUserDataProperties, { additionalProperties: s.json() });

export const subscriptionUserDataSchema: Schema<SubscriptionUserData> = s.lazySchema(() =>
  s.object<SubscriptionUserData>(
    {
      ...subscriptionUserDataProperties,
      email: s.optionalNullable(s.string().check(s.email())),
    },
    { additionalProperties: s.json() },
  ),
);
