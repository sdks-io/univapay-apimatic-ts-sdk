import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { subscriptionThreeDsModeSchema, type SubscriptionThreeDsMode } from "./subscription-three-ds-mode.js";

/** 定期課金の決済に適用される3Dセキュアの設定とリダイレクト情報。 */
export type SubscriptionThreeDs = {
  /**
   * 定期課金の決済に適用される3Dセキュア認証モード。`if_available` は、継続（recurring）トークンの認証情報が利用可能で、かつまだ 3DS が完了していない場合にのみ
   * 3DS を強制します。`provided` は、外部から提供された MPI 認証データが使用されたことを示します。
   */
  mode?: SubscriptionThreeDsMode | null;
  /** 3Dセキュア認証のために消費者がリダイレクトされる URL。 */
  redirectEndpoint?: string | null;
  /** リダイレクト識別子。 */
  redirectId?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const subscriptionThreeDsProperties: s.Shape<SubscriptionThreeDs> = {
  mode: s.optionalNullable(s.lazy(() => subscriptionThreeDsModeSchema)),
  redirectEndpoint: s.optionalNullable(s.string()),
  redirectId: s.optionalNullable(s.string()),
  _keysMap: {
    redirectEndpoint: "redirect_endpoint",
    redirectId: "redirect_id",
  },
};

export const subscriptionThreeDsInternalSchema: Schema<SubscriptionThreeDs> = s.object<SubscriptionThreeDs>(
  subscriptionThreeDsProperties,
  { additionalProperties: s.json() },
);

export const subscriptionThreeDsSchema: Schema<SubscriptionThreeDs> = s.lazySchema(() =>
  s.object<SubscriptionThreeDs>(
    {
      ...subscriptionThreeDsProperties,
      redirectEndpoint: s.optionalNullable(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
