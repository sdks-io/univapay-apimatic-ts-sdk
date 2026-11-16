import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 3Dセキュアイシュアートークンでは 'card' のみがサポートされます。 */
export const ThreeDsIssuerTokenPaymentType = {
  Card: "card",
} as const;
export type ThreeDsIssuerTokenPaymentType =
  | (typeof ThreeDsIssuerTokenPaymentType)[keyof typeof ThreeDsIssuerTokenPaymentType]
  | (string & {});

export const threeDsIssuerTokenPaymentTypeSchema: EnumSchema<ThreeDsIssuerTokenPaymentType> =
  s.enumOf<ThreeDsIssuerTokenPaymentType>(ThreeDsIssuerTokenPaymentType);
