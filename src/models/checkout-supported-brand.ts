import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { checkoutPaymentTypeSchema, type CheckoutPaymentType } from "./checkout-payment-type.js";

/** 店舗が受け付け可能な、単一の決済手段／ブランドの組み合わせに対する機能サポートおよび対応可否フラグ。 */
export type CheckoutSupportedBrand = {
  /** チェックアウト設定全体で使用される決済手段の識別子。 */
  paymentType?: CheckoutPaymentType;
  /**
   * `payment_type` に対応するブランド識別子。`card` および `apple_pay` の場合、一般的な `CardBrand`
   * の値（`visa`、`mastercard`、`american_express`、`maestro`、`discover`、`jcb`、`diners_club`、`private_label`、`unionpay`）のいずれか、またはフォールバックの
   * `unmapped_<raw value>` になります。`qr_scan` の場合は QR-CPM
   * ブランド（例：`pay_pay`、`we_chat`、`qq`、`line_pay`、`au_pay`、`alipay_china`）。`qr_merchant` の場合は QR-MPM
   * ブランド（例：`rakuten_pay_merchant`、`alipay_merchant_qr`、`pay_pay_merchant`、`d_barai_mpm`、`we_chat_mpm`）。`online`
   * の場合はオンラインリダイレクト系のブランド（例：`alipay_online`、`pay_pay_online`、`we_chat_online`、`d_barai_online`、`kakaopay`）。`konbini`
   * の場合はコンビニブランド（例：`seven_eleven`、`family_mart`、`lawson`）。`paidy` および `bank_transfer`
   * の場合は決済手段自体の識別子になります。ブランドの全カタログは膨大かつゲートウェイに依存するため、固定された集合ではなくオープンな文字列として扱ってください。
   */
  brand?: string;
  /** `brand` のレガシーエイリアス。`payment_type` が `card` または `apple_pay` の場合にのみ含まれます。 */
  cardBrand?: string;
  /** `brand` のレガシーエイリアス。`payment_type` が `qr_merchant` の場合にのみ含まれます。 */
  qrBrand?: string;
  /** `brand` のレガシーエイリアス。`payment_type` が `online` の場合にのみ含まれます。 */
  onlineBrand?: string;
  /** このブランドの対応機能セットが動的に解決されるかどうか。 */
  dynamicInfo?: boolean;
  /** このブランドがオーソリとキャプチャの分離をサポートしているかどうか。 */
  supportAuthCapture?: boolean;
  /** このブランドがカード名義人のフルネームを要求するかどうか。 */
  requiresFullName?: boolean;
  /** このブランドが CVV を要求するかどうか。 */
  requiresCvv?: boolean;
  /** このブランドで許可される ISO 3166-1 alpha-2 国コード。制限がない場合は `null` になります。 */
  countriesAllowed?: string[] | null;
  /** このブランドでサポートされる ISO-4217 通貨コード。制限がない場合は `null` になります。 */
  supportedCurrencies?: string[] | null;
  /** このブランドが CVV のみの認証をサポートしているかどうか。 */
  cvvAuth?: boolean;
  /** このブランドが分割払いプランをサポートしているかどうか。 */
  installmentCapable?: boolean;
  /** このブランドが複数通貨価格設定（MCP）をサポートしているかどうか。 */
  mcpCapable?: boolean;
  /** このブランドが複数通貨価格設定（MCP）経由でのみ利用可能かどうか。 */
  mcpOnly?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const checkoutSupportedBrandSchema: Schema<CheckoutSupportedBrand> = s.object<CheckoutSupportedBrand>(
  {
    paymentType: s.optional(s.lazy(() => checkoutPaymentTypeSchema)),
    brand: s.optional(s.string()),
    cardBrand: s.optional(s.string()),
    qrBrand: s.optional(s.string()),
    onlineBrand: s.optional(s.string()),
    dynamicInfo: s.optional(s.boolean()),
    supportAuthCapture: s.optional(s.boolean()),
    requiresFullName: s.optional(s.boolean()),
    requiresCvv: s.optional(s.boolean()),
    countriesAllowed: s.optionalNullable(s.array(s.string())),
    supportedCurrencies: s.optionalNullable(s.array(s.string())),
    cvvAuth: s.optional(s.boolean()),
    installmentCapable: s.optional(s.boolean()),
    mcpCapable: s.optional(s.boolean()),
    mcpOnly: s.optional(s.boolean()),
    _keysMap: {
      paymentType: "payment_type",
      cardBrand: "card_brand",
      qrBrand: "qr_brand",
      onlineBrand: "online_brand",
      dynamicInfo: "dynamic_info",
      supportAuthCapture: "support_auth_capture",
      requiresFullName: "requires_full_name",
      requiresCvv: "requires_cvv",
      countriesAllowed: "countries_allowed",
      supportedCurrencies: "supported_currencies",
      cvvAuth: "cvv_auth",
      installmentCapable: "installment_capable",
      mcpCapable: "mcp_capable",
      mcpOnly: "mcp_only",
    },
  },
  { additionalProperties: s.json() },
);
