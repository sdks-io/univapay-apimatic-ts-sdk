import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 1つの振替日区分における主要な日付。当月の登録受付期間がまだ開いているかを判断するために使用します。 */
export type DirectDebitSchedule = {
  /** 消費者の口座から資金が引き落とされる日 (指定振替日)。 */
  merchantBankAccountTransferDate?: string;
  /** 署名済みの振替依頼書が銀行に到着していなければならない期限 (振替依頼書到着期限)。 */
  merchantBankAccountRegistrationDeadline?: string;
  /** この振替日区分で振替を登録・編集できる最終日 (振替データアップロード期限)。これを過ぎると振替はロックされます。 */
  merchantBankAccountUploadDeadline?: string;
  /** 振替結果がプラットフォームに反映される日 (振替結果反映日)。 */
  platformResultRegistrationDate?: string;
  /** 回収した資金が加盟店に支払われる日 (支払日)。 */
  platformScheduledPayout?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const directDebitScheduleSchema: Schema<DirectDebitSchedule> = s.object<DirectDebitSchedule>(
  {
    merchantBankAccountTransferDate: s.optional(s.dateOnly()),
    merchantBankAccountRegistrationDeadline: s.optional(s.dateOnly()),
    merchantBankAccountUploadDeadline: s.optional(s.dateOnly()),
    platformResultRegistrationDate: s.optional(s.dateOnly()),
    platformScheduledPayout: s.optional(s.dateOnly()),
    _keysMap: {
      merchantBankAccountTransferDate: "merchant_bank_account_transfer_date",
      merchantBankAccountRegistrationDeadline: "merchant_bank_account_registration_deadline",
      merchantBankAccountUploadDeadline: "merchant_bank_account_upload_deadline",
      platformResultRegistrationDate: "platform_result_registration_date",
      platformScheduledPayout: "platform_scheduled_payout",
    },
  },
  { additionalProperties: s.json() },
);
