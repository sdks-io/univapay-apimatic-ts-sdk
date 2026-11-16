import type { TokenProvider } from "./core/auth/credentials.js";
import type { CoreClientOptions } from "./core/client-options.js";

export type ClientOptions = SdkClientOptions & CoreClientOptions;

type SdkClientOptions = ServerOptions & {
  /** リクエストに必須。形式：`Bearer {secret}.{jwt}` */
  readonly jwtToken?: TokenProvider | undefined;
};

type ServerOptions = {
  readonly serverOptions?: {
    /** 本番サーバー */
    default?: {
      baseUrl?: string;
      /** APIのベースURL @default "https://api.gyro-n.money" */
      baseUrl2?: string;
    };
    /** 本番サーバー */
    directDebit?: {
      baseUrl?: string;
      /** 口座振替APIのベースURL @default "https://staging-direct-debit.gopay-services.com" */
      directDebitBaseUrl?: string;
    };
  };
};
