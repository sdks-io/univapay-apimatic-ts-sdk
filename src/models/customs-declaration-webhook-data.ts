import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  customsDeclarationWebhookDeclarationSchema,
  type CustomsDeclarationWebhookDeclaration,
} from "./customs-declaration-webhook-declaration.js";
import {
  customsDeclarationWebhookErrorSchema,
  type CustomsDeclarationWebhookError,
} from "./customs-declaration-webhook-error.js";
import {
  customsDeclarationWebhookResultSchema,
  type CustomsDeclarationWebhookResult,
} from "./customs-declaration-webhook-result.js";
import {
  customsDeclarationWebhookStatusSchema,
  type CustomsDeclarationWebhookStatus,
} from "./customs-declaration-webhook-status.js";

/**
 * `customs_declaration_finished` ウェブフックで配信される税関申告ペイロード。プラットフォームレベルの配信には `platform_id` と
 * `updated_on` が含まれる場合があります。
 */
export type CustomsDeclarationWebhookData = {
  /** 税関申告識別子。 */
  id?: string;
  /** 申告に関連付けられている課金識別子。 */
  chargeId?: string;
  /** 加盟店識別子。 */
  merchantId?: string;
  /** 店舗識別子。 */
  storeId?: string;
  /** プラットフォーム識別子（プラットフォームレベルの配信に含まれます）。 */
  platformId?: string | null;
  /** 処理モード。 */
  mode?: string;
  /** 申告を処理したゲートウェイ。 */
  gateway?: string;
  /** バックエンドフォーマッタによって返される WeChat 税関申告ペイロード。 */
  declaration?: CustomsDeclarationWebhookDeclaration;
  /** 税関申告フォーマッタによって返される結果ペイロード。 */
  declarationResult?: CustomsDeclarationWebhookResult | null;
  /** バックエンドから返される税関申告ステータス。 */
  status?: CustomsDeclarationWebhookStatus;
  /** 税関申告処理が失敗したときに返されるエラーペイロード。 */
  error?: CustomsDeclarationWebhookError | null;
  /** 申告が作成されたタイムスタンプ。 */
  createdOn?: Date;
  /** 申告が最後に更新されたタイムスタンプ（プラットフォームレベルの配信に含まれます）。 */
  updatedOn?: Date | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const customsDeclarationWebhookDataSchema: Schema<CustomsDeclarationWebhookData> =
  s.object<CustomsDeclarationWebhookData>(
    {
      id: s.optional(s.string()),
      chargeId: s.optional(s.string()),
      merchantId: s.optional(s.string()),
      storeId: s.optional(s.string()),
      platformId: s.optionalNullable(s.string()),
      mode: s.optional(s.string()),
      gateway: s.optional(s.string()),
      declaration: s.optional(s.lazy(() => customsDeclarationWebhookDeclarationSchema)),
      declarationResult: s.optionalNullable(s.lazy(() => customsDeclarationWebhookResultSchema)),
      status: s.optional(s.lazy(() => customsDeclarationWebhookStatusSchema)),
      error: s.optionalNullable(s.lazy(() => customsDeclarationWebhookErrorSchema)),
      createdOn: s.optional(s.dateTime()),
      updatedOn: s.optionalNullable(s.dateTime()),
      _keysMap: {
        chargeId: "charge_id",
        merchantId: "merchant_id",
        storeId: "store_id",
        platformId: "platform_id",
        declarationResult: "declaration_result",
        createdOn: "created_on",
        updatedOn: "updated_on",
      },
    },
    { additionalProperties: s.json() },
  );
