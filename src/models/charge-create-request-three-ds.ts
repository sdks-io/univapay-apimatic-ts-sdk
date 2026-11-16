import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  chargeCreateRequestThreeDsModeSchema,
  type ChargeCreateRequestThreeDsMode,
} from "./charge-create-request-three-ds-mode.js";

/**
 * 課金作成リクエストの3Dセキュアスキーマ。`mode`（および任意で `redirect_endpoint`）を指定して Univapay に 3DS を実行させるか、Univapay の外部で
 * 3DS 認証がすでに完了している場合は 6 つの外部 MPI フィールド（`authentication_value` から `transaction_status`
 * まで）すべてを指定してください。その場合、`mode` はサーバーによって自動的に `provided` に設定されるため、手動で送信しないでください。
 */
export type ChargeCreateRequestThreeDs = {
  /** 3Dセキュア認証後に消費者をリダイレクトする URL。 */
  redirectEndpoint?: string;
  /**
   * 3Dセキュア認証タイプ。'skip'（スキップ）を使用するには、アプリケーション・トークンのシークレットが必要です。`if_available`
   * は、継続（recurring）トークンの認証情報が利用可能で、かつまだ 3DS が完了していない場合にのみ 3DS を強制します。`provided` は、リクエストに外部 MPI
   * 認証データ（`authentication_value`、`eci`
   * など）が送信された場合にサーバーによって自動的に設定されるものであり、手動で設定することはできません。省略した場合は、店舗のデフォルトの 3DS ポリシーが適用されます — 'normal'
   * が適用されると仮定しないでください。
   */
  mode?: ChargeCreateRequestThreeDsMode;
  /**
   * 外部 MPI: 3Dセキュアディレクトリサーバーから返されるカード会員認証値（CAVV/AAV）。外部で完了した 3DS
   * 認証データを提供するには、`eci`、`ds_transaction_id`、`server_transaction_id`、`message_version`、`transaction_status`
   * と合わせて送信してください — 6 つすべてのフィールドが存在するか、いずれも存在しないかのどちらかである必要があります。
   */
  authenticationValue?: string;
  /** 外部 MPI: ディレクトリサーバーから返される 2 桁の電子商トランザクション指標（ECI）。他の外部 MPI フィールドと合わせて送信してください。 */
  eci?: string;
  /** 外部 MPI: ディレクトリサーバーのトランザクション ID。他の外部 MPI フィールドと合わせて送信してください。 */
  dsTransactionId?: string;
  /** 外部 MPI: 3DS サーバーのトランザクション ID。他の外部 MPI フィールドと合わせて送信してください。 */
  serverTransactionId?: string;
  /** 外部 MPI: 3Dセキュアプロトコルのメッセージバージョン（例: '2.1.0'、'2.2.0'）。他の外部 MPI フィールドと合わせて送信してください。 */
  messageVersion?: string;
  /** 外部 MPI: 3Dセキュアディレクトリサーバーのトランザクションステータス。認証成功のステータスのみが受け付けられます。他の外部 MPI フィールドと合わせて送信してください。 */
  transactionStatus?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeCreateRequestThreeDsProperties: s.Shape<ChargeCreateRequestThreeDs> = {
  redirectEndpoint: s.optional(s.string()),
  mode: s.optional(s.lazy(() => chargeCreateRequestThreeDsModeSchema)),
  authenticationValue: s.optional(s.string()),
  eci: s.optional(s.string()),
  dsTransactionId: s.optional(s.string()),
  serverTransactionId: s.optional(s.string()),
  messageVersion: s.optional(s.string()),
  transactionStatus: s.optional(s.string()),
  _keysMap: {
    redirectEndpoint: "redirect_endpoint",
    authenticationValue: "authentication_value",
    dsTransactionId: "ds_transaction_id",
    serverTransactionId: "server_transaction_id",
    messageVersion: "message_version",
    transactionStatus: "transaction_status",
  },
};

export const chargeCreateRequestThreeDsInternalSchema: Schema<ChargeCreateRequestThreeDs> =
  s.object<ChargeCreateRequestThreeDs>(chargeCreateRequestThreeDsProperties, {
    additionalProperties: s.json(),
  });

export const chargeCreateRequestThreeDsSchema: Schema<ChargeCreateRequestThreeDs> = s.lazySchema(() =>
  s.object<ChargeCreateRequestThreeDs>(
    {
      ...chargeCreateRequestThreeDsProperties,
      redirectEndpoint: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
