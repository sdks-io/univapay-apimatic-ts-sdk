import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** カード決済の設定。 */
export type MerchantWebhookCardConfiguration = {
  /** カード決済を有効にします。 */
  enabled?: boolean | null;
  /** デビットカードを決済フローで許可します。 */
  debitEnabled?: boolean | null;
  /** プリペイドカードを決済フローで許可します。 */
  prepaidEnabled?: boolean | null;
  /** デビットカードでのオーソリ（保留）のみのフローを許可します。 */
  debitAuthorizationEnabled?: boolean | null;
  /** プリペイドカードでのオーソリ（保留）のみのフローを許可します。 */
  prepaidAuthorizationEnabled?: boolean | null;
  /** 加盟店のポリシーによって拒否されるカードブランド。 */
  forbiddenCardBrands?: string[] | null;
  /** カード決済が許可されている送信元 IP の国コード。 */
  allowedCountriesByIp?: string[] | null;
  /** 主要営業国以外で発行されたカード（海外カード）を許可します。 */
  foreignCardsAllowed?: boolean | null;
  /** 過去にトランザクション履歴のない消費者メールアドレスからのカード課金を拒否します。 */
  failOnNewEmail?: boolean | null;
  /** 消費者コンテキストあたりに許可される最大カード数。 */
  cardLimit?: number | null;
  /** CVV なしでのカードフローを許可します。 */
  allowEmptyCvv?: boolean | null;
  /** カード処理を直接精算通貨（現地通貨決済）のみに制限します。 */
  onlyDirectCurrency?: boolean | null;
  /** 対象となるカードフローに3Dセキュアを要求します。 */
  threeDsRequired?: boolean | null;
  /** 3Dセキュアを実行する際に請求先住所データを要求します。 */
  threeDsAddressRequired?: boolean | null;
  /** 特権を持つ呼び出し元が3Dセキュアスキップモードをリクエストできるようにします。 */
  threeDsSkipEnabled?: boolean | null;
  /** ホストされたキャプチャフローを経ずに、直接カードトークンを作成することを許可します。 */
  allowDirectTokenCreation?: boolean | null;
  /** 3Dセキュアを実行する際に電話番号を要求します。 */
  threeDsPhoneNumberRequired?: boolean | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookCardConfigurationSchema: Schema<MerchantWebhookCardConfiguration> =
  s.object<MerchantWebhookCardConfiguration>(
    {
      enabled: s.optionalNullable(s.boolean()),
      debitEnabled: s.optionalNullable(s.boolean()),
      prepaidEnabled: s.optionalNullable(s.boolean()),
      debitAuthorizationEnabled: s.optionalNullable(s.boolean()),
      prepaidAuthorizationEnabled: s.optionalNullable(s.boolean()),
      forbiddenCardBrands: s.optionalNullable(s.array(s.string())),
      allowedCountriesByIp: s.optionalNullable(s.array(s.string())),
      foreignCardsAllowed: s.optionalNullable(s.boolean()),
      failOnNewEmail: s.optionalNullable(s.boolean()),
      cardLimit: s.optionalNullable(s.int()),
      allowEmptyCvv: s.optionalNullable(s.boolean()),
      onlyDirectCurrency: s.optionalNullable(s.boolean()),
      threeDsRequired: s.optionalNullable(s.boolean()),
      threeDsAddressRequired: s.optionalNullable(s.boolean()),
      threeDsSkipEnabled: s.optionalNullable(s.boolean()),
      allowDirectTokenCreation: s.optionalNullable(s.boolean()),
      threeDsPhoneNumberRequired: s.optionalNullable(s.boolean()),
      _keysMap: {
        debitEnabled: "debit_enabled",
        prepaidEnabled: "prepaid_enabled",
        debitAuthorizationEnabled: "debit_authorization_enabled",
        prepaidAuthorizationEnabled: "prepaid_authorization_enabled",
        forbiddenCardBrands: "forbidden_card_brands",
        allowedCountriesByIp: "allowed_countries_by_ip",
        foreignCardsAllowed: "foreign_cards_allowed",
        failOnNewEmail: "fail_on_new_email",
        cardLimit: "card_limit",
        allowEmptyCvv: "allow_empty_cvv",
        onlyDirectCurrency: "only_direct_currency",
        threeDsRequired: "three_ds_required",
        threeDsAddressRequired: "three_ds_address_required",
        threeDsSkipEnabled: "three_ds_skip_enabled",
        allowDirectTokenCreation: "allow_direct_token_creation",
        threeDsPhoneNumberRequired: "three_ds_phone_number_required",
      },
    },
    { additionalProperties: s.json() },
  );
