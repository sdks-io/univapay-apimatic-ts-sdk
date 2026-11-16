import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { issuerTokenPayloadSchema, type IssuerTokenPayload } from "./issuer-token-payload.js";

/** 3Dセキュアイシュアートークンのペイロード。 */
export type ThreeDsIssuerToken = {
  /** 3Dセキュアイシュアートークンでは 'card' のみがサポートされます。 @default "card" */
  paymentType?: "card";
  /** クライアントがリクエストを送信する必要がある3Dセキュア認証 URL。 */
  issuerToken: string;
  /** 実行方法。現在、'http_post' のみがサポートされています。 @default "http_post" */
  callMethod?: "http_post";
  /**
   * 決済アクションを完了するために必要なキーと値のペア。該当しない場合は null。`call_method` が `http_post` の場合に使用されます。存在する場合、クライアントは
   * POST リクエストを送信する前に、この JSON を期待される `content_type`（例：`application/x-www-form-urlencoded`
   * 文字列）に変換する必要があります。
   */
  payload?: IssuerTokenPayload | null;
  /**
   * カード発行会社のエンドポイントが要求するペイロードの期待されるコンテンツタイプ（例：'application/x-www-form-urlencoded; charset=UTF-8'）。
   */
  contentType: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const threeDsIssuerTokenProperties: s.Shape<ThreeDsIssuerToken> = {
  paymentType: s.defaulted(s.literal("card"), "card"),
  issuerToken: s.string(),
  callMethod: s.defaulted(s.literal("http_post"), "http_post"),
  payload: s.optionalNullable(s.lazy(() => issuerTokenPayloadSchema)),
  contentType: s.string(),
  _keysMap: {
    paymentType: "payment_type",
    issuerToken: "issuer_token",
    callMethod: "call_method",
    contentType: "content_type",
  },
};

export const threeDsIssuerTokenInternalSchema: Schema<ThreeDsIssuerToken> = s.object<ThreeDsIssuerToken>(
  threeDsIssuerTokenProperties,
  { additionalProperties: s.json() },
);

export const threeDsIssuerTokenSchema: Schema<ThreeDsIssuerToken> = s.lazySchema(() =>
  s.object<ThreeDsIssuerToken>(
    {
      ...threeDsIssuerTokenProperties,
      issuerToken: s.string().check(s.url()),
    },
    { additionalProperties: s.json() },
  ),
);
