import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * この店舗で作成されるトランザクション・トークンに付与される、継続課金の権限レベル。`none` は継続利用を許可せず、`bounded` は回数制限付きで継続課金を許可し、`infinite`
 * は無制限の継続課金を許可します。
 */
export const CheckoutRecurringTokenPrivilege = {
  None: "none",
  Bounded: "bounded",
  Infinite: "infinite",
} as const;
export type CheckoutRecurringTokenPrivilege =
  | (typeof CheckoutRecurringTokenPrivilege)[keyof typeof CheckoutRecurringTokenPrivilege]
  | (string & {});

export const checkoutRecurringTokenPrivilegeSchema: EnumSchema<CheckoutRecurringTokenPrivilege> =
  s.enumOf<CheckoutRecurringTokenPrivilege>(CheckoutRecurringTokenPrivilege);
