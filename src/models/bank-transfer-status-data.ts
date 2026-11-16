import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  bankTransferPaymentStatusSchema,
  type BankTransferPaymentStatus,
} from "./bank-transfer-payment-status.js";
import { genericMetadataSchema, type GenericMetadata } from "./generic-metadata.js";

/** `bank_transfer_status_updated` ウェブフックイベントのデータペイロード。金額やメタデータと並んで、インライン化された銀行振込拡張フィールドが含まれています。 */
export type BankTransferStatusData = {
  /** 銀行振込課金拡張レコードの ID。 */
  id?: string | null;
  /** 関連付けられた課金の ID。 */
  chargeId?: string;
  /** 銀行振込課金の決済ステータス。 */
  paymentStatus?: BankTransferPaymentStatus;
  /** 最も直近の入金日。 */
  latestDepositDate?: Date | null;
  /** 銀行振込拡張レコードが作成された日時。 */
  createdOn?: Date | null;
  /** 通貨の最小単位による最も直近の入金金額。 */
  latestDepositAmount?: number | null;
  /** 通貨の最小単位による現在の未払残高。 */
  balance?: number | null;
  /** ISO 4217 通貨コード。 */
  currency?: string;
  /** 通貨の最小単位による総課金金額。 */
  amount?: number;
  /** 支払額と期待される金額の差額（プラス = 過入金、マイナス = 不足）。 */
  amountDifference?: number | null;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  tokenMetadata?: GenericMetadata;
  /** カスタムメタデータ用のフリーフォームディクショナリ。 */
  chargeMetadata?: GenericMetadata;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const bankTransferStatusDataSchema: Schema<BankTransferStatusData> = s.object<BankTransferStatusData>(
  {
    id: s.optionalNullable(s.string()),
    chargeId: s.optional(s.string()),
    paymentStatus: s.optional(s.lazy(() => bankTransferPaymentStatusSchema)),
    latestDepositDate: s.optionalNullable(s.dateTime()),
    createdOn: s.optionalNullable(s.dateTime()),
    latestDepositAmount: s.optionalNullable(s.int()),
    balance: s.optionalNullable(s.int()),
    currency: s.optional(s.string()),
    amount: s.optional(s.int()),
    amountDifference: s.optionalNullable(s.int()),
    tokenMetadata: s.optional(s.lazy(() => genericMetadataSchema)),
    chargeMetadata: s.optional(s.lazy(() => genericMetadataSchema)),
    _keysMap: {
      chargeId: "charge_id",
      paymentStatus: "payment_status",
      latestDepositDate: "latest_deposit_date",
      createdOn: "created_on",
      latestDepositAmount: "latest_deposit_amount",
      amountDifference: "amount_difference",
      tokenMetadata: "token_metadata",
      chargeMetadata: "charge_metadata",
    },
  },
  { additionalProperties: s.json() },
);
