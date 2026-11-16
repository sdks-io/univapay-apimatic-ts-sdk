import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import {
  bankTransferTransactionTokenInternalSchema,
  bankTransferTransactionTokenSchema,
  type BankTransferTransactionToken,
} from "../bank-transfer-transaction-token.js";
import {
  cardTransactionTokenInternalSchema,
  cardTransactionTokenSchema,
  type CardTransactionToken,
} from "../card-transaction-token.js";
import {
  konbiniTransactionTokenInternalSchema,
  konbiniTransactionTokenSchema,
  type KonbiniTransactionToken,
} from "../konbini-transaction-token.js";
import {
  onlineTransactionTokenInternalSchema,
  onlineTransactionTokenSchema,
  type OnlineTransactionToken,
} from "../online-transaction-token.js";
import {
  paidyTransactionTokenInternalSchema,
  paidyTransactionTokenSchema,
  type PaidyTransactionToken,
} from "../paidy-transaction-token.js";
import {
  qrMerchantTransactionTokenInternalSchema,
  qrMerchantTransactionTokenSchema,
  type QrMerchantTransactionToken,
} from "../qr-merchant-transaction-token.js";
import {
  qrScanTransactionTokenInternalSchema,
  qrScanTransactionTokenSchema,
  type QrScanTransactionToken,
} from "../qr-scan-transaction-token.js";

/**
 * 保存されたトランザクション・トークンリソース。`payment_type` によって具体的な形状（`data`
 * の内容を含む）が判別されます。バリアントスキーマは上記のマッピングを参照してください。
 */
export type TransactionToken =
  | (CardTransactionToken & { paymentType: "card" })
  | (KonbiniTransactionToken & { paymentType: "konbini" })
  | (OnlineTransactionToken & { paymentType: "online" })
  | (BankTransferTransactionToken & { paymentType: "bank_transfer" })
  | (PaidyTransactionToken & { paymentType: "paidy" })
  | (QrScanTransactionToken & { paymentType: "qr_scan" })
  | (QrMerchantTransactionToken & { paymentType: "qr_merchant" });

export const transactionTokenInternalSchema: Schema<TransactionToken> =
  s.discriminatedUnion<TransactionToken>("payment_type", {
    card: cardTransactionTokenInternalSchema,
    konbini: konbiniTransactionTokenInternalSchema,
    online: onlineTransactionTokenInternalSchema,
    bank_transfer: bankTransferTransactionTokenInternalSchema,
    paidy: paidyTransactionTokenInternalSchema,
    qr_scan: qrScanTransactionTokenInternalSchema,
    qr_merchant: qrMerchantTransactionTokenInternalSchema,
  });

export const transactionTokenSchema: Schema<TransactionToken> = s.lazySchema(() =>
  s.discriminatedUnion<TransactionToken>("payment_type", {
    card: cardTransactionTokenSchema,
    konbini: konbiniTransactionTokenSchema,
    online: onlineTransactionTokenSchema,
    bank_transfer: bankTransferTransactionTokenSchema,
    paidy: paidyTransactionTokenSchema,
    qr_scan: qrScanTransactionTokenSchema,
    qr_merchant: qrMerchantTransactionTokenSchema,
  }),
);
