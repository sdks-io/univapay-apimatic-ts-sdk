import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  transactionHistoryRefundReasonSchema,
  type TransactionHistoryRefundReason,
} from "./transaction-history-refund-reason.js";
import {
  transactionHistoryRefundSchema,
  type TransactionHistoryRefund,
} from "./transaction-history-refund.js";
import {
  transactionHistoryServiceProviderSchema,
  type TransactionHistoryServiceProvider,
} from "./transaction-history-service-provider.js";
import { transactionHistoryTypeSchema, type TransactionHistoryType } from "./transaction-history-type.js";

/**
 * この行に関する決済タイプ固有の詳細情報。これはすべての決済タイプを網羅する単一のフラットなオブジェクトであり、実際に値が設定されるフィールドは `payment_type`
 * によって異なります（各フィールドの説明を参照）。該当する決済タイプに存在しないフィールドは省略されます。
 */
export type TransactionHistoryUserData = {
  /** この行が課金と返金のどちらを表すか。 */
  type?: TransactionHistoryType;
  /** カード名義人名。`card` および `apple_pay` の行にのみ存在します。 */
  cardholderName?: string;
  /**
   * カード名義人・消費者のメールアドレス。`konbini` のレガシーエイリアスフィールドを除くすべての決済タイプに存在します。`bank_transfer` の行では常に非
   * null、それ以外のタイプでは null になり得ます。
   */
  cardholderEmailAddress?: string | null;
  /** カード名義人の電話番号。`paidy` の行にのみ存在します。 */
  cardholderPhoneNumber?: string | null;
  /** チェックアウト時に入力された消費者名。`konbini` の行にのみ存在します（未入力の場合は空文字列）。 */
  customerName?: string;
  /** `brand` のレガシーな重複フィールドです。`konbini` の行にのみ存在します。 */
  convenienceStore?: string;
  /**
   * 決済手段の生のブランド識別子。すべての決済タイプに存在しますが、値の種類は決済タイプごとに異なります（例: `card`/`apple_pay`
   * はカードブランド、`qr_scan`/`qr_merchant` は QR ブランド、`online` はオンラインウォレットのブランド、`konbini`
   * はコンビニブランド、`paidy` の行は `paidy`）。`qr_scan`、`qr_merchant`、`online` では null になり得ますが、それ以外のタイプでは常に非
   * null です。
   */
  brand?: string | null;
  /** 決済を処理した生のゲートウェイ識別子。すべての決済タイプに存在します。 */
  gateway?: string | null;
  /** サービスプロバイダー。報告されない場合は `null`。 */
  serviceProvider?: TransactionHistoryServiceProvider | null;
  /** この課金に対して発行された返金。課金の行（`type: charge`）にのみ存在し、返金の行には存在しません。 */
  refunds?: TransactionHistoryRefund[];
  /** 返金理由。未設定の場合は `null`。 */
  reason?: TransactionHistoryRefundReason | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionHistoryUserDataSchema: Schema<TransactionHistoryUserData> =
  s.object<TransactionHistoryUserData>(
    {
      type: s.optional(s.lazy(() => transactionHistoryTypeSchema)),
      cardholderName: s.optional(s.string()),
      cardholderEmailAddress: s.optionalNullable(s.string()),
      cardholderPhoneNumber: s.optionalNullable(s.string()),
      customerName: s.optional(s.string()),
      convenienceStore: s.optional(s.string()),
      brand: s.optionalNullable(s.string()),
      gateway: s.optionalNullable(s.string()),
      serviceProvider: s.optionalNullable(s.lazy(() => transactionHistoryServiceProviderSchema)),
      refunds: s.optional(s.array(s.lazy(() => transactionHistoryRefundSchema))),
      reason: s.optionalNullable(s.lazy(() => transactionHistoryRefundReasonSchema)),
      _keysMap: {
        cardholderName: "cardholder_name",
        cardholderEmailAddress: "cardholder_email_address",
        cardholderPhoneNumber: "cardholder_phone_number",
        customerName: "customer_name",
        convenienceStore: "convenience_store",
        serviceProvider: "service_provider",
      },
    },
    { additionalProperties: s.json() },
  );
