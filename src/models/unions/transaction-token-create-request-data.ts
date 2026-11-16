import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import {
  tokenCreateBankTransferDataSchema,
  type TokenCreateBankTransferData,
} from "../token-create-bank-transfer-data.js";
import {
  tokenCreateCardDataInternalSchema,
  tokenCreateCardDataSchema,
  type TokenCreateCardData,
} from "../token-create-card-data.js";
import {
  tokenCreateKonbiniDataInternalSchema,
  tokenCreateKonbiniDataSchema,
  type TokenCreateKonbiniData,
} from "../token-create-konbini-data.js";
import { tokenCreateOnlineDataSchema, type TokenCreateOnlineData } from "../token-create-online-data.js";
import {
  tokenCreateQrMerchantDataSchema,
  type TokenCreateQrMerchantData,
} from "../token-create-qr-merchant-data.js";
import { tokenCreateQrScanDataSchema, type TokenCreateQrScanData } from "../token-create-qr-scan-data.js";

/** トランザクション・トークン作成リクエストデータのスキーマ。 */
export type TransactionTokenCreateRequestData =
  | TokenCreateCardData
  | TokenCreateKonbiniData
  | TokenCreateOnlineData
  | TokenCreateBankTransferData
  | TokenCreateQrScanData
  | TokenCreateQrMerchantData;

export const transactionTokenCreateRequestDataInternalSchema: Schema<TransactionTokenCreateRequestData> =
  s.of<TransactionTokenCreateRequestData>(
    s.union([
      s.lazy(() => tokenCreateCardDataInternalSchema),
      s.lazy(() => tokenCreateKonbiniDataInternalSchema),
      s.lazy(() => tokenCreateOnlineDataSchema),
      s.lazy(() => tokenCreateBankTransferDataSchema),
      s.lazy(() => tokenCreateQrScanDataSchema),
      s.lazy(() => tokenCreateQrMerchantDataSchema),
    ]),
  );

export const transactionTokenCreateRequestDataSchema: Schema<TransactionTokenCreateRequestData> =
  s.lazySchema(() =>
    s.of<TransactionTokenCreateRequestData>(
      s.union([
        s.lazy(() => tokenCreateCardDataSchema),
        s.lazy(() => tokenCreateKonbiniDataSchema),
        s.lazy(() => tokenCreateOnlineDataSchema),
        s.lazy(() => tokenCreateBankTransferDataSchema),
        s.lazy(() => tokenCreateQrScanDataSchema),
        s.lazy(() => tokenCreateQrMerchantDataSchema),
      ]),
    ),
  );
