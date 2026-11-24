import { buildAuthSchemes, type AuthSchemes } from "./auth-schemes.js";
import type { ClientOptions } from "./client-options.js";
import { buildCoreClientOptions } from "./core/client-options.js";
import { RawClient } from "./core/raw-client.js";
import * as host from "./core/runtime-environment.js";
import * as s from "./core/validation/index.js";
import { Cancels } from "./resources/cancels.js";
import { Charges } from "./resources/charges.js";
import { Checkout } from "./resources/checkout.js";
import { DirectDebit } from "./resources/direct-debit.js";
import { Merchants } from "./resources/merchants.js";
import { PciDssRequired } from "./resources/pci-dss-required.js";
import { Refunds } from "./resources/refunds.js";
import { Stores } from "./resources/stores.js";
import { Subscriptions } from "./resources/subscriptions.js";
import { TransactionHistory } from "./resources/transaction-history.js";
import { TransactionTokens } from "./resources/transaction-tokens.js";
import { Webhooks } from "./resources/webhooks.js";
import { buildServers, type Servers } from "./servers.js";

/**
 * Univapay オンライン決済 API の OpenAPI 仕様書。
 *
 * ## 認証 (JWT)
 * この API では、HTTP `Authorization` ヘッダーを介した JWT (JSON Web Tokens) 認証を使用します。認証を行うには、Univapay
 * ダッシュボードで**アプリケーション・トークン**を生成する必要があります。これにより、次の2つのコンポーネントが生成されます： 1. **トークン (`{jwt}`)** 2.
 * **シークレット (`{secret}`)**
 *
 *   ### ⚠️ セキュリティ警告
 * **シークレット**には広範な権限（課金の作成、認証済みカード課金のキャプチャ、返金など）が付与されています。
 *
 * **フロントエンドのアプリケーションコード（消費者のブラウザなど）や公開リポジトリに `{secret}`を絶対に露出させないでください。** これは厳密にサーバー間通信専用です。
 *
 * *Univapay は、漏洩したシークレットによって発生した事故について一切の責任を負いません。*
 *
 *   ### ベアラー認証（Bearer Auth）の形式
 * API を呼び出す場所によって、ベアラー形式が異なります：
 *
 *   * **フロントエンド / ブラウザ（シークレットなし）**: `Bearer {jwt}`
 *     *(ウィジェットやインラインフォームで使用されます。トークン作成時に、ダッシュボードで許可するドメインを登録する必要があります)*。
 *   * **バックエンド / サーバー（シークレットあり）**: `Bearer {secret}.{jwt}` *(すべてのバックエンド処理で必須です)*。
 *
 * すべてのリクエストはバックエンドサーバーから送信されることを想定しているため、すべてのリクエストにシークレットが必要となります。
 *
 *   ### トークンタイプ
 *   * **店舗・トークン**: その特定の店舗に対するリクエストへのフルアクセスを許可します。
 *   * **加盟店・トークン**: トランザクション・トークンを作成することはできませんが、複数の店舗のデータにアクセスできます。
 */
export class UnivapayPublicApiClient {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;
  #charges?: Charges;
  #transactionTokens?: TransactionTokens;
  #pciDssRequired?: PciDssRequired;
  #refunds?: Refunds;
  #subscriptions?: Subscriptions;
  #cancels?: Cancels;
  #merchants?: Merchants;
  #stores?: Stores;
  #webhooks?: Webhooks;
  #directDebit?: DirectDebit;
  #checkout?: Checkout;
  #transactionHistory?: TransactionHistory;

  constructor(options: ClientOptions = {}) {
    this.#rawClient = new RawClient({
      ...buildCoreClientOptions(options, "UNIVAPAY_PUBLIC_API_LOG"),
      defaultHeaders: [
        { name: "User-Agent", value: "UnivapayPublicApiClient/1.3.0 TypeScript", schema: s.string() },
        { name: "X-APIMatic-Lang", value: "TypeScript", schema: s.string() },
        { name: "X-APIMatic-Package-Version", value: "1.3.0", schema: s.string() },
        { name: "X-APIMatic-Gen-Version", value: "4.0.0", schema: s.string() },
        { name: "X-APIMatic-OS", value: host.operatingSystem(), schema: s.optional(s.string()) },
        { name: "X-APIMatic-Runtime", value: host.runtimeDescription(), schema: s.optional(s.string()) },
      ],
      defaultQuery: [],
      defaultPathParams: [],
    });

    this.#servers = buildServers(options);

    this.#auth = buildAuthSchemes(options);
  }

  /**
   * 決済、オーソリ（保留）、キャプチャ（売上確定）の作成・管理、および決済ステータスの確認を行うエンドポイント。
   */
  get charges(): Charges {
    return (this.#charges ??= new Charges(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 消費者の決済情報（カード、コンビニ、QR）を安全に保存・管理するためのエンドポイント。
   */
  get transactionTokens(): TransactionTokens {
    return (this.#transactionTokens ??= new TransactionTokens(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * ⚠️ **セキュリティ警告**: このタグが付いたエンドポイントは、クレジットカードデータ（カード番号や CVV
   * など）を処理できます。クレジットカード決済にこれらのエンドポイントを使用する場合、サーバー環境は MUST で PCI DSS に準拠している必要があります。
   */
  get pciDssRequired(): PciDssRequired {
    return (this.#pciDssRequired ??= new PciDssRequired(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 課金に対する返金を作成・管理するためのエンドポイント。
   */
  get refunds(): Refunds {
    return (this.#refunds ??= new Refunds(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 継続的な定期課金決済を作成・管理するためのエンドポイント。
   */
  get subscriptions(): Subscriptions {
    return (this.#subscriptions ??= new Subscriptions(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 課金のキャンセルを作成・管理するためのエンドポイント。
   */
  get cancels(): Cancels {
    return (this.#cancels ??= new Cancels(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 認証されたオペレーター向けの、加盟店の識別情報および有効な設定を取得するエンドポイント。
   */
  get merchants(): Merchants {
    return (this.#merchants ??= new Merchants(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 加盟店文脈における、店舗の検索および設定を取得するエンドポイント。
   */
  get stores(): Stores {
    return (this.#stores ??= new Stores(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 店舗レベルのウェブフックの作成・管理、および配信履歴の表示を行うエンドポイント。
   */
  get webhooks(): Webhooks {
    return (this.#webhooks ??= new Webhooks(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 消費者の銀行口座を登録し、毎月固定の振替日区分で引き落とす継続的な口座振替を予約するためのエンドポイント。
   */
  get directDebit(): DirectDebit {
    return (this.#directDebit ??= new DirectDebit(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 加盟店のチェックアウトウィジェット設定（有効な決済手段、上限、ブランディング、ブランドごとの機能サポート）を取得するためのエンドポイント。
   */
  get checkout(): Checkout {
    return (this.#checkout ??= new Checkout(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * 決済タイプを横断した課金・返金の統合履歴を検索するためのエンドポイント。
   */
  get transactionHistory(): TransactionHistory {
    return (this.#transactionHistory ??= new TransactionHistory(this.#rawClient, this.#servers, this.#auth));
  }
}
