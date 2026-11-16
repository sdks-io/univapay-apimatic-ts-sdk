import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { checkoutMoneyAmountSchema, type CheckoutMoneyAmount } from "./checkout-money-amount.js";

/** 継続的なカード課金（定期課金および継続権限を持つトークン）に適用される CVV 再確認ポリシー。 */
export type RecurringCvvConfirmation = {
  /** 継続的なカード課金に CVV の再確認を要求するかどうか。設定されていない場合は `false` に解決されます。 */
  enabled?: boolean;
  /** CVV の再確認が必要となる金額のしきい値。しきい値が設定されていない場合は `null` になります。 */
  threshold?: CheckoutMoneyAmount[] | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const recurringCvvConfirmationSchema: Schema<RecurringCvvConfirmation> =
  s.object<RecurringCvvConfirmation>(
    {
      enabled: s.optional(s.boolean()),
      threshold: s.optionalNullable(s.array(s.lazy(() => checkoutMoneyAmountSchema))),
    },
    { additionalProperties: s.json() },
  );
