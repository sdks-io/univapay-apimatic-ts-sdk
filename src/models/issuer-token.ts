import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { issuerTokenCallMethodSchema, type IssuerTokenCallMethod } from "./issuer-token-call-method.js";
import { issuerTokenPayloadSchema, type IssuerTokenPayload } from "./issuer-token-payload.js";
import { issuerTokenPaymentTypeSchema, type IssuerTokenPaymentType } from "./issuer-token-payment-type.js";

/** イシュアートークンまたは銀行振込の案内ペイロード。 */
export type IssuerToken = {
  /** 課金の決済手段のタイプ。 */
  paymentType: IssuerTokenPaymentType;
  /** （オンライン決済の場合）消費者が決済を実行するためのトークン、または決済 URL。 */
  issuerToken?: string | null;
  /**
   * （オンライン決済の場合）クライアントがトークンをどのように実行すべきか。- `sdk` / `app`: ネイティブアプリ環境/SDK内での直接利用。- `web`:
   * 特殊な拡張ブラウザ環境内での直接利用。- `http_get` / `http_post`: 新しいブラウザウィンドウまたは iframe 内で直接実行。
   */
  callMethod?: IssuerTokenCallMethod | null;
  /**
   * 決済アクションを完了するために必要なキーと値のペア。該当しない場合は null。`call_method` が `http_post` の場合に使用されます。存在する場合、クライアントは
   * POST リクエストを送信する前に、この JSON を期待される `content_type`（例：`application/x-www-form-urlencoded`
   * 文字列）に変換する必要があります。
   */
  payload?: IssuerTokenPayload | null;
  /** （銀行振込の場合）接続システムによって発行された仮想銀行口座の一意の ID。 */
  accountId?: string | null;
  /** （銀行振込の場合）支店コード。 */
  branchCode?: string | null;
  /** （銀行振込の場合）支店名。 */
  branchName?: string | null;
  /** （銀行振込の場合）口座名義。 */
  accountHolderName?: string | null;
  /** （銀行振込の場合）口座番号。 */
  accountNumber?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const issuerTokenSchema: Schema<IssuerToken> = s.object<IssuerToken>(
  {
    paymentType: issuerTokenPaymentTypeSchema,
    issuerToken: s.optionalNullable(s.string()),
    callMethod: s.optionalNullable(s.lazy(() => issuerTokenCallMethodSchema)),
    payload: s.optionalNullable(s.lazy(() => issuerTokenPayloadSchema)),
    accountId: s.optionalNullable(s.string()),
    branchCode: s.optionalNullable(s.string()),
    branchName: s.optionalNullable(s.string()),
    accountHolderName: s.optionalNullable(s.string()),
    accountNumber: s.optionalNullable(s.string()),
    _keysMap: {
      paymentType: "payment_type",
      issuerToken: "issuer_token",
      callMethod: "call_method",
      accountId: "account_id",
      branchCode: "branch_code",
      branchName: "branch_name",
      accountHolderName: "account_holder_name",
      accountNumber: "account_number",
    },
  },
  { additionalProperties: s.json() },
);
