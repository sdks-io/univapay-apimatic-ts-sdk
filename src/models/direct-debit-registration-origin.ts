import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 銀行口座の登録元 — 加盟店管理画面からの登録は `merchant_console`、それ以外は `anywhere`。 */
export const DirectDebitRegistrationOrigin = {
  Anywhere: "anywhere",
  MerchantConsole: "merchant_console",
} as const;
export type DirectDebitRegistrationOrigin =
  | (typeof DirectDebitRegistrationOrigin)[keyof typeof DirectDebitRegistrationOrigin]
  | (string & {});

export const directDebitRegistrationOriginSchema: EnumSchema<DirectDebitRegistrationOrigin> =
  s.enumOf<DirectDebitRegistrationOrigin>(DirectDebitRegistrationOrigin);
