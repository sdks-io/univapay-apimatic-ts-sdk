import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 継続（recurring）トークンで 3DS を有効化するためのリクエスト・ペイロード。本文と `redirect_endpoint` はどちらも任意です。 */
export type EnableTokenThreeDsRequest = {
  /** 3Dセキュア認証後に消費者をリダイレクトする URL。 */
  redirectEndpoint?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const enableTokenThreeDsRequestProperties: s.Shape<EnableTokenThreeDsRequest> = {
  redirectEndpoint: s.optional(s.string()),
  _keysMap: {
    redirectEndpoint: "redirect_endpoint",
  },
};

export const enableTokenThreeDsRequestInternalSchema: Schema<EnableTokenThreeDsRequest> =
  s.object<EnableTokenThreeDsRequest>(enableTokenThreeDsRequestProperties, {
    additionalProperties: s.json(),
  });

export const enableTokenThreeDsRequestSchema: Schema<EnableTokenThreeDsRequest> = s.lazySchema(() =>
  s.object<EnableTokenThreeDsRequest>(
    {
      ...enableTokenThreeDsRequestProperties,
      redirectEndpoint: s.optional(s.string().check(s.url())),
    },
    { additionalProperties: s.json() },
  ),
);
