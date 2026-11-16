import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 加盟店が受信を選択した口座振替のメール通知。 */
export type DirectDebitNotificationConfiguration = {
  /** 振替依頼書が銀行に到着する期限が近づいたときに通知します (郵送期限の通知)。 */
  notifyDeadlineMailing?: boolean;
  /** 振替の登録締切日が近づいたときに通知します (締切日の通知)。 */
  notifyDeadlineDebit?: boolean;
  /** 振替結果が反映されたときに通知します (振替結果の通知)。 */
  notifyDebitUpdate?: boolean;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const directDebitNotificationConfigurationSchema: Schema<DirectDebitNotificationConfiguration> =
  s.object<DirectDebitNotificationConfiguration>(
    {
      notifyDeadlineMailing: s.optional(s.boolean()),
      notifyDeadlineDebit: s.optional(s.boolean()),
      notifyDebitUpdate: s.optional(s.boolean()),
      _keysMap: {
        notifyDeadlineMailing: "notify_deadline_mailing",
        notifyDeadlineDebit: "notify_deadline_debit",
        notifyDebitUpdate: "notify_debit_update",
      },
    },
    { additionalProperties: s.json() },
  );
