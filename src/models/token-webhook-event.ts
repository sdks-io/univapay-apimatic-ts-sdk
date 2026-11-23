import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { tokenEventSchema, type TokenEvent } from "./token-event.js";
import {
  transactionTokenInternalSchema,
  transactionTokenSchema,
  type TransactionToken,
} from "./unions/transaction-token.js";

/**
 * トランザクショントークンのライフサイクルイベント用のウェブフックエンベロープ。トークン作成時は `token_created`、メタデータ変更時は
 * `token_updated`、3Dセキュアデータ変更時は `token_three_ds_updated`、CVV 認証変更時は `token_cvv_auth_updated`、CVV
 * 認証チェック変更時は `token_cvv_auth_check_updated`、トークン置き換え時（例：カード更新後）は `token_replaced`、リカーリングトークン削除時は
 * `recurring_token_deleted` で発火します。`data` フィールドには、イベント発生時点の TransactionToken オブジェクト全体が含まれます。
 */
export type TokenWebhookEvent = {
  /** このウェブフック配信の一意の ID。 */
  id?: string;
  /**
   * イベントタイプの識別子 —
   * `token_created`、`token_updated`、`token_three_ds_updated`、`token_cvv_auth_updated`、`token_cvv_auth_check_updated`、`token_replaced`、または
   * `recurring_token_deleted`。
   */
  event: TokenEvent;
  /**
   * 保存されたトランザクション・トークンリソース。`payment_type` によって具体的な形状（`data`
   * の内容を含む）が判別されます。バリアントスキーマは上記のマッピングを参照してください。
   */
  data?: TransactionToken;
  /** イベントがトリガーされたタイムスタンプ。 */
  createdOn?: Date;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenWebhookEventProperties: s.Shape<TokenWebhookEvent> = {
  id: s.optional(s.string()),
  event: tokenEventSchema,
  data: s.optional(s.lazy(() => transactionTokenInternalSchema)),
  createdOn: s.optional(s.dateTime()),
  _keysMap: {
    createdOn: "created_on",
  },
};

export const tokenWebhookEventInternalSchema: Schema<TokenWebhookEvent> = s.object<TokenWebhookEvent>(
  tokenWebhookEventProperties,
  { additionalProperties: s.json() },
);

export const tokenWebhookEventSchema: Schema<TokenWebhookEvent> = s.lazySchema(() =>
  s.object<TokenWebhookEvent>(
    {
      ...tokenWebhookEventProperties,
      data: s.optional(s.lazy(() => transactionTokenSchema)),
    },
    { additionalProperties: s.json() },
  ),
);
