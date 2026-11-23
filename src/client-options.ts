import type { SecretProvider } from "./core/auth/credentials.js";
import type { CoreClientOptions } from "./core/client-options.js";

export type ClientOptions = SdkClientOptions & CoreClientOptions;

type SdkClientOptions = ServerOptions & {
  /** リクエストに必須。形式：`Bearer {secret}.{jwt}` */
  readonly jwtToken?: SecretProvider | undefined;
};

type ServerOptions = {
  readonly serverOptions?: {
    /** 本番サーバー */
    default?: {
      baseUrl?: string;
    };
    /** 本番サーバー */
    directDebit?: {
      baseUrl?: string;
    };
  };
};
