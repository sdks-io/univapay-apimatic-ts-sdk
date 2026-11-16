import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { cardLimitSchema, type CardLimit } from "./card-limit.js";

/** チェックアウトに適用されるカード決済の設定。 */
export type CheckoutCardConfiguration = {
  /** カード決済が有効かどうか。 */
  enabled?: boolean;
  /** デビットカードを許可するかどうか。 */
  debitEnabled?: boolean;
  /** プリペイドカードを許可するかどうか。 */
  prepaidEnabled?: boolean;
  /** デビットカードでオーソリ（保留）のみのフローを許可するかどうか。 */
  debitAuthorizationEnabled?: boolean;
  /** プリペイドカードでオーソリ（保留）のみのフローを許可するかどうか。 */
  prepaidAuthorizationEnabled?: boolean;
  /** カード処理を直接精算通貨（現地通貨決済）のみに制限するかどうか。 */
  onlyDirectCurrency?: boolean;
  /**
   * 加盟店のポリシーによって拒否されるカードブランド。一般的な値には
   * `visa`、`mastercard`、`american_express`、`maestro`、`discover`、`jcb`、`diners_club`、`private_label`、`unionpay`
   * が含まれます。プラットフォームがマッピングできないゲートウェイ固有のブランドは `unmapped_<raw value>` として表されます。拒否されるブランドがない場合は `null`
   * になります。
   */
  forbiddenCardBrands?: string[] | null;
  /** カード決済の送信元 IP ジオロケーションによって許可される ISO 3166-1 alpha-2 国コード。制限がない場合は `null` になります。 */
  allowedCountriesByIp?: string[] | null;
  /** 主要営業国以外で発行されたカード（海外カード）を許可するかどうか。 */
  foreignCardsAllowed?: boolean;
  /** 過去にトランザクション履歴のない消費者メールアドレスからのカード課金を拒否するかどうか。設定されていない場合は `null` になります。 */
  failOnNewEmail?: boolean | null;
  /** カードごとの利用上限額。上限が設定されていない場合は `null` になります。 */
  cardLimit?: CardLimit | null;
  /** CVV なしでのカードフローを許可するかどうか。設定されていない場合は `null` になります。 */
  allowEmptyCvv?: boolean | null;
  /** ホストされたキャプチャフローを経ずに、直接カードトークンを作成することを許可するかどうか。 */
  allowDirectTokenCreation?: boolean;
  /** 対象となるカードフローに3Dセキュアを要求するかどうか。 */
  threeDsRequired?: boolean;
  /** 3Dセキュアを実行する際に請求先住所データを要求するかどうか。 */
  threeDsAddressRequired?: boolean;
  /** 特権を持つ呼び出し元が3Dセキュアスキップモードをリクエストできるかどうか。 */
  threeDsSkipEnabled?: boolean;
  /** 3Dセキュアを実行する際に電話番号を要求するかどうか。 */
  threeDsPhoneNumberRequired?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutCardConfigurationSchema: Schema<CheckoutCardConfiguration> =
  s.object<CheckoutCardConfiguration>(
    {
      enabled: s.optional(s.boolean()),
      debitEnabled: s.optional(s.boolean()),
      prepaidEnabled: s.optional(s.boolean()),
      debitAuthorizationEnabled: s.optional(s.boolean()),
      prepaidAuthorizationEnabled: s.optional(s.boolean()),
      onlyDirectCurrency: s.optional(s.boolean()),
      forbiddenCardBrands: s.optionalNullable(s.array(s.string())),
      allowedCountriesByIp: s.optionalNullable(s.array(s.string())),
      foreignCardsAllowed: s.optional(s.boolean()),
      failOnNewEmail: s.optionalNullable(s.boolean()),
      cardLimit: s.optionalNullable(s.lazy(() => cardLimitSchema)),
      allowEmptyCvv: s.optionalNullable(s.boolean()),
      allowDirectTokenCreation: s.optional(s.boolean()),
      threeDsRequired: s.optional(s.boolean()),
      threeDsAddressRequired: s.optional(s.boolean()),
      threeDsSkipEnabled: s.optional(s.boolean()),
      threeDsPhoneNumberRequired: s.optional(s.boolean()),
      _keysMap: {
        debitEnabled: "debit_enabled",
        prepaidEnabled: "prepaid_enabled",
        debitAuthorizationEnabled: "debit_authorization_enabled",
        prepaidAuthorizationEnabled: "prepaid_authorization_enabled",
        onlyDirectCurrency: "only_direct_currency",
        forbiddenCardBrands: "forbidden_card_brands",
        allowedCountriesByIp: "allowed_countries_by_ip",
        foreignCardsAllowed: "foreign_cards_allowed",
        failOnNewEmail: "fail_on_new_email",
        cardLimit: "card_limit",
        allowEmptyCvv: "allow_empty_cvv",
        allowDirectTokenCreation: "allow_direct_token_creation",
        threeDsRequired: "three_ds_required",
        threeDsAddressRequired: "three_ds_address_required",
        threeDsSkipEnabled: "three_ds_skip_enabled",
        threeDsPhoneNumberRequired: "three_ds_phone_number_required",
      },
    },
    { additionalProperties: s.json() },
  );
