import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  chargeCreateRequestClientMetadataSchema,
  type ChargeCreateRequestClientMetadata,
} from "./charge-create-request-client-metadata.js";
import {
  chargeCreateRequestRedirectInternalSchema,
  chargeCreateRequestRedirectSchema,
  type ChargeCreateRequestRedirect,
} from "./charge-create-request-redirect.js";
import {
  chargeCreateRequestThreeDsInternalSchema,
  chargeCreateRequestThreeDsSchema,
  type ChargeCreateRequestThreeDs,
} from "./charge-create-request-three-ds.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";

/** 課金作成用のリクエスト・ペイロード。 */
export type ChargeCreateRequest = {
  /** トランザクション・トークン識別子。 */
  transactionTokenId: string;
  /** 課金金額。 */
  amount: number;
  /** ISO-4217 通貨コード。 @default "JPY" */
  currency?: string;
  /** false の場合、オーソリ（保留）のみを作成します。 */
  capture?: boolean;
  /** カードの場合は自動キャプチャ日、コンビニ/銀行の場合は支払い期限。注意: セブン-イレブン、セイコーマート、PayEasy では時間の指定は無視されます。 */
  captureAt?: Date;
  /** 加盟店によって定義された一意のトランザクション ID。we_chat, we_chat_mpm, we_chat_online などの特定のブランドで必須/使用されます。 */
  merchantTransactionId?: string;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 課金作成リクエストのクライアントメタデータスキーマ。 */
  clientMetadata?: ChargeCreateRequestClientMetadata;
  /** 課金作成リクエストのリダイレクトスキーマ。 */
  redirect?: ChargeCreateRequestRedirect;
  /**
   * 課金作成リクエストの3Dセキュアスキーマ。`mode`（および任意で `redirect_endpoint`）を指定して Univapay に 3DS を実行させるか、Univapay
   * の外部で 3DS 認証がすでに完了している場合は 6 つの外部 MPI フィールド（`authentication_value` から `transaction_status`
   * まで）すべてを指定してください。その場合、`mode` はサーバーによって自動的に `provided` に設定されるため、手動で送信しないでください。
   */
  threeDs?: ChargeCreateRequestThreeDs;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const chargeCreateRequestProperties: s.Shape<ChargeCreateRequest> = {
  transactionTokenId: s.string(),
  amount: s.int(),
  currency: s.defaulted(s.string(), "JPY"),
  capture: s.optional(s.boolean()),
  captureAt: s.optional(s.dateTime()),
  merchantTransactionId: s.optional(s.string()),
  metadata: s.optional(s.lazy(() => genericMetadataSchema)),
  clientMetadata: s.optional(s.lazy(() => chargeCreateRequestClientMetadataSchema)),
  redirect: s.optional(s.lazy(() => chargeCreateRequestRedirectInternalSchema)),
  threeDs: s.optional(s.lazy(() => chargeCreateRequestThreeDsInternalSchema)),
  _keysMap: {
    transactionTokenId: "transaction_token_id",
    captureAt: "capture_at",
    merchantTransactionId: "merchant_transaction_id",
    clientMetadata: "client_metadata",
    threeDs: "three_ds",
  },
};

export const chargeCreateRequestInternalSchema: Schema<ChargeCreateRequest> = s.object<ChargeCreateRequest>(
  chargeCreateRequestProperties,
  { additionalProperties: s.json() },
);

export const chargeCreateRequestSchema: Schema<ChargeCreateRequest> = s.lazySchema(() =>
  s.object<ChargeCreateRequest>(
    {
      ...chargeCreateRequestProperties,
      merchantTransactionId: s.optional(s.string().check(s.maxLength(32))),
      redirect: s.optional(s.lazy(() => chargeCreateRequestRedirectSchema)),
      threeDs: s.optional(s.lazy(() => chargeCreateRequestThreeDsSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
