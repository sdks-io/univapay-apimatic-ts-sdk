import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * 3Dセキュア認証タイプ。'skip'（スキップ）を使用するには、アプリケーション・トークンのシークレットが必要です。`if_available`
 * は、継続（recurring）トークンの認証情報が利用可能で、かつまだ 3DS が完了していない場合にのみ 3DS を強制します。`provided` は、リクエストに外部 MPI
 * 認証データ（`authentication_value`、`eci`
 * など）が送信された場合にサーバーによって自動的に設定されるものであり、手動で設定することはできません。省略した場合は、店舗のデフォルトの 3DS ポリシーが適用されます — 'normal'
 * が適用されると仮定しないでください。
 */
export const ChargeCreateRequestThreeDsMode = {
  Normal: "normal",
  Require: "require",
  Force: "force",
  Skip: "skip",
  IfAvailable: "if_available",
  Provided: "provided",
} as const;
export type ChargeCreateRequestThreeDsMode =
  | (typeof ChargeCreateRequestThreeDsMode)[keyof typeof ChargeCreateRequestThreeDsMode]
  | (string & {});

export const chargeCreateRequestThreeDsModeSchema: EnumSchema<ChargeCreateRequestThreeDsMode> =
  s.enumOf<ChargeCreateRequestThreeDsMode>(ChargeCreateRequestThreeDsMode);
