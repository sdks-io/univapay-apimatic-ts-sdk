import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  checkoutEcEmailConfigurationSchema,
  type CheckoutEcEmailConfiguration,
} from "./checkout-ec-email-configuration.js";
import {
  checkoutEcProductsConfigurationSchema,
  type CheckoutEcProductsConfiguration,
} from "./checkout-ec-products-configuration.js";

/** EC メール受信および商品明細のホスト機能に関する、チェックアウトの切り替え設定。 */
export type CheckoutEcConfiguration = {
  /** EC メールに関するチェックアウト設定。 */
  ecEmail?: CheckoutEcEmailConfiguration;
  /** EC 商品明細に関するチェックアウト設定。 */
  ecProducts?: CheckoutEcProductsConfiguration;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutEcConfigurationSchema: Schema<CheckoutEcConfiguration> =
  s.object<CheckoutEcConfiguration>(
    {
      ecEmail: s.optional(s.lazy(() => checkoutEcEmailConfigurationSchema)),
      ecProducts: s.optional(s.lazy(() => checkoutEcProductsConfigurationSchema)),
      _keysMap: {
        ecEmail: "ec_email",
        ecProducts: "ec_products",
      },
    },
    { additionalProperties: s.json() },
  );
