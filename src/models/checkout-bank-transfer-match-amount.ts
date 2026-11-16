import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** 銀行振込決済に適用される入金額の照合ポリシー。 */
export const CheckoutBankTransferMatchAmount = {
  Exact: "exact",
  Maximum: "maximum",
  Minimum: "minimum",
  Disabled: "disabled",
} as const;
export type CheckoutBankTransferMatchAmount =
  | (typeof CheckoutBankTransferMatchAmount)[keyof typeof CheckoutBankTransferMatchAmount]
  | (string & {});

export const checkoutBankTransferMatchAmountSchema: EnumSchema<CheckoutBankTransferMatchAmount> =
  s.enumOf<CheckoutBankTransferMatchAmount>(CheckoutBankTransferMatchAmount);
