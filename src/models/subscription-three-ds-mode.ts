import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 定期課金の決済に適用される3Dセキュア認証モード。`if_available` は、継続（recurring）トークンの認証情報が利用可能で、かつまだ 3DS が完了していない場合にのみ 3DS
 * を強制します。`provided` は、外部から提供された MPI 認証データが使用されたことを示します。
 */
export const SubscriptionThreeDsMode = {
  Normal: "normal",
  Require: "require",
  Force: "force",
  Skip: "skip",
  IfAvailable: "if_available",
  Provided: "provided",
} as const;
export type SubscriptionThreeDsMode =
  | (typeof SubscriptionThreeDsMode)[keyof typeof SubscriptionThreeDsMode]
  | (string & {});

export const subscriptionThreeDsModeSchema: EnumSchema<SubscriptionThreeDsMode> =
  s.enumOf<SubscriptionThreeDsMode>(SubscriptionThreeDsMode);
