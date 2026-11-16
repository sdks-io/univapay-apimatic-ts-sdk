import type { ClientOptions } from "./client-options.js";
import type { ServerBase, UrlTemplate } from "./core/api-request.js";
import { resolveBaseUrl } from "./core/url.js";
import * as s from "./core/validation/index.js";

export type Servers = {
  default: (subPath: string) => UrlTemplate;
  directDebit: (subPath: string) => UrlTemplate;
};

const serverSchemas = {
  default: {
    baseUrl: s.of(s.defaulted(s.string(), "{baseUrl}")),
    baseUrl2: s.of(s.defaulted(s.string(), "https://api.gyro-n.money")),
  },
  directDebit: {
    baseUrl: s.of(s.defaulted(s.string(), "{directDebitBaseUrl}")),
    directDebitBaseUrl: s.of(s.defaulted(s.string(), "https://staging-direct-debit.gopay-services.com")),
  },
};

export function buildServers(options: ClientOptions): Servers {
  const base = {
    default: resolveBaseUrl(defaultServer(options)),
    directDebit: resolveBaseUrl(directDebitServer(options)),
  };
  return {
    default: (subPath) => ({ baseUrl: base.default, subPath }),
    directDebit: (subPath) => ({ baseUrl: base.directDebit, subPath }),
  };
}

function defaultServer(options: ClientOptions): ServerBase {
  return {
    baseUrl: serverSchemas.default.baseUrl.decode(options.serverOptions?.default?.baseUrl),
    variables: { baseUrl: serverSchemas.default.baseUrl2.decode(options.serverOptions?.default?.baseUrl2) },
  };
}

function directDebitServer(options: ClientOptions): ServerBase {
  return {
    baseUrl: serverSchemas.directDebit.baseUrl.decode(options.serverOptions?.directDebit?.baseUrl),
    variables: {
      directDebitBaseUrl: serverSchemas.directDebit.directDebitBaseUrl.decode(
        options.serverOptions?.directDebit?.directDebitBaseUrl,
      ),
    },
  };
}
