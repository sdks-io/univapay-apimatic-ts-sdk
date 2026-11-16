import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  bankTransferPaymentStatusSchema,
  type BankTransferPaymentStatus,
} from "./bank-transfer-payment-status.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";
import {
  transactionHistoryChargeTypeSchema,
  type TransactionHistoryChargeType,
} from "./transaction-history-charge-type.js";
import { transactionHistoryModeSchema, type TransactionHistoryMode } from "./transaction-history-mode.js";
import {
  transactionHistoryPaymentTypeSchema,
  type TransactionHistoryPaymentType,
} from "./transaction-history-payment-type.js";
import {
  transactionHistoryStatusSchema,
  type TransactionHistoryStatus,
} from "./transaction-history-status.js";
import { transactionHistoryTypeSchema, type TransactionHistoryType } from "./transaction-history-type.js";
import {
  transactionHistoryUserDataSchema,
  type TransactionHistoryUserData,
} from "./transaction-history-user-data.js";

/** 加盟店のトランザクション履歴における単一の課金または返金の行。 */
export type TransactionHistoryItem = {
  /** 店舗の識別子。 */
  storeId?: string;
  /** 元となるリソースの ID。課金の行では課金 ID、返金の行では返金 ID になります。 */
  resourceId?: string;
  /** 元となる課金の ID。課金の行では `null`、返金の行では値が設定されます。 */
  chargeId?: string | null;
  /** 通貨の最小単位による金額。 */
  amount?: number;
  /** ISO-4217 通貨コード。 */
  currency?: string;
  /** 通貨の表示単位でフォーマットされた金額。 */
  amountFormatted?: number;
  /** この行が課金と返金のどちらを表すか。 */
  type?: TransactionHistoryType;
  /**
   * 元となるリソースのステータス。課金の行はすべての値を使用しますが、返金の行では `pending`、`successful`、`failed`、`error` のいずれかのみが報告されます。
   */
  status?: TransactionHistoryStatus;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  metadata?: GenericMetadata;
  /** 元となるリソースが作成されたタイムスタンプ。 */
  createdOn?: Date;
  /**
   * 環境モード: `live` と `test` は認証に使用された資格情報を反映し、`live_test` は本番モードのデータに対してテストを行う特権的な呼び出し元向けに予約されています。
   */
  mode?: TransactionHistoryMode;
  /** 加盟店の表示名。 */
  merchantName?: string;
  /** 店舗の表示名。 */
  storeName?: string;
  /** 元となる課金で使用された決済手段。 */
  paymentType?: TransactionHistoryPaymentType;
  /**
   * この行に関する決済タイプ固有の詳細情報。これはすべての決済タイプを網羅する単一のフラットなオブジェクトであり、実際に値が設定されるフィールドは `payment_type`
   * によって異なります（各フィールドの説明を参照）。該当する決済タイプに存在しないフィールドは省略されます。
   */
  userData?: TransactionHistoryUserData;
  /** 銀行振込の支払いステータス。該当しない場合は `null`。 */
  bankTransferPaymentStatus?: BankTransferPaymentStatus | null;
  /** 銀行振込の課金に対して照合された直近の入金タイムスタンプ。該当しない場合は `null` になります。 */
  bankTransferLatestDepositDate?: Date | null;
  /** 該当する場合に使用されたマルチカレンシープライシングトークンの ID。該当しない場合は `null` になります。 */
  mcpTokenId?: string | null;
  /** 課金タイプ。該当しない場合は `null`。 */
  chargeType?: TransactionHistoryChargeType | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const transactionHistoryItemSchema: Schema<TransactionHistoryItem> = s.object<TransactionHistoryItem>(
  {
    storeId: s.optional(s.string()),
    resourceId: s.optional(s.string()),
    chargeId: s.optionalNullable(s.string()),
    amount: s.optional(s.int()),
    currency: s.optional(s.string()),
    amountFormatted: s.optional(s.float64()),
    type: s.optional(s.lazy(() => transactionHistoryTypeSchema)),
    status: s.optional(s.lazy(() => transactionHistoryStatusSchema)),
    metadata: s.optional(s.lazy(() => genericMetadataSchema)),
    createdOn: s.optional(s.dateTime()),
    mode: s.optional(s.lazy(() => transactionHistoryModeSchema)),
    merchantName: s.optional(s.string()),
    storeName: s.optional(s.string()),
    paymentType: s.optional(s.lazy(() => transactionHistoryPaymentTypeSchema)),
    userData: s.optional(s.lazy(() => transactionHistoryUserDataSchema)),
    bankTransferPaymentStatus: s.optionalNullable(s.lazy(() => bankTransferPaymentStatusSchema)),
    bankTransferLatestDepositDate: s.optionalNullable(s.dateTime()),
    mcpTokenId: s.optionalNullable(s.string()),
    chargeType: s.optionalNullable(s.lazy(() => transactionHistoryChargeTypeSchema)),
    _keysMap: {
      storeId: "store_id",
      resourceId: "resource_id",
      chargeId: "charge_id",
      amountFormatted: "amount_formatted",
      createdOn: "created_on",
      merchantName: "merchant_name",
      storeName: "store_name",
      paymentType: "payment_type",
      userData: "user_data",
      bankTransferPaymentStatus: "bank_transfer_payment_status",
      bankTransferLatestDepositDate: "bank_transfer_latest_deposit_date",
      mcpTokenId: "mcp_token_id",
      chargeType: "charge_type",
    },
  },
  { additionalProperties: s.json() },
);
