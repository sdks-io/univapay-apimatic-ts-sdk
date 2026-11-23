import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { paymentErrorSchema, type PaymentError } from "./payment-error.js";
import {
  tokenResponseCardDataThreeDsStatusSchema,
  type TokenResponseCardDataThreeDsStatus,
} from "./token-response-card-data-three-ds-status.js";

/** トークンレスポンスのカードデータ3Dセキュアのスキーマ。 */
export type TokenResponseCardDataThreeDs = {
  /** 有効化フラグの値。 */
  enabled?: boolean;
  status?: TokenResponseCardDataThreeDsStatus | null;
  /** リダイレクト先エンドポイント URL。 */
  redirectEndpoint?: string | null;
  /** リダイレクト識別子。 */
  redirectId?: string | null;
  /** 3Dセキュアチェックが免除されたかどうかを示します。免除された場合、課金作成時に3Dセキュアチェックは要求されません。 */
  exempted?: boolean;
  /** 決済エラーの詳細。成功した場合は null。 */
  error?: PaymentError | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const tokenResponseCardDataThreeDsProperties: s.Shape<TokenResponseCardDataThreeDs> = {
  enabled: s.optional(s.boolean()),
  status: s.optionalNullable(s.lazy(() => tokenResponseCardDataThreeDsStatusSchema)),
  redirectEndpoint: s.optionalNullable(s.string()),
  redirectId: s.optionalNullable(s.string()),
  exempted: s.optional(s.boolean()),
  error: s.optionalNullable(s.lazy(() => paymentErrorSchema)),
  _keysMap: {
    redirectEndpoint: "redirect_endpoint",
    redirectId: "redirect_id",
  },
};

export const tokenResponseCardDataThreeDsInternalSchema: Schema<TokenResponseCardDataThreeDs> =
  s.object<TokenResponseCardDataThreeDs>(tokenResponseCardDataThreeDsProperties, {
    additionalProperties: s.json(),
  });

export const tokenResponseCardDataThreeDsSchema: Schema<TokenResponseCardDataThreeDs> = s.lazySchema(() =>
  s.object<TokenResponseCardDataThreeDs>(
    {
      ...tokenResponseCardDataThreeDsProperties,
      redirectEndpoint: s.optionalNullable(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
