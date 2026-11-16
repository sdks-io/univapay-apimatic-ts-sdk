import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 課金の決済手段のタイプ。 */
export const IssuerTokenPaymentType = {
  Online: "online",
  BankTransfer: "bank_transfer",
} as const;
export type IssuerTokenPaymentType =
  | (typeof IssuerTokenPaymentType)[keyof typeof IssuerTokenPaymentType]
  | (string & {});

export const issuerTokenPaymentTypeSchema: EnumSchema<IssuerTokenPaymentType> =
  s.enumOf<IssuerTokenPaymentType>(IssuerTokenPaymentType);
