import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";

/** 加盟店が継承した振込（精算）スケジュール設定。 */
export type MerchantWebhookTransferScheduleConfiguration = {
  /** 課金が支払い可能になるまでの ISO-8601 保留期間。 */
  waitPeriod?: string;
  /** 支払いに選択された振込周期。 */
  period?: string;
  /** 最初の振込周期を完全に完了する必要があるかどうか。 */
  fullPeriodRequired?: boolean | null;
  /** 週次スケジュールを使用する場合の支払い曜日。 */
  dayOfWeek?: string | null;
  /** 月次スケジュールで使用される月の週番号。 */
  weekOfMonth?: number | null;
  /** 月次スケジュールで使用される日の日付。 */
  dayOfMonth?: number | null;
  /** 残高集計のための週次締め日。 */
  weeklyClosingDay?: string | null;
  /** 週次の支払い日。 */
  weeklyPayoutDay?: string | null;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const merchantWebhookTransferScheduleConfigurationSchema: Schema<MerchantWebhookTransferScheduleConfiguration> =
  s.object<MerchantWebhookTransferScheduleConfiguration>(
    {
      waitPeriod: s.optional(s.string()),
      period: s.optional(s.string()),
      fullPeriodRequired: s.optionalNullable(s.boolean()),
      dayOfWeek: s.optionalNullable(s.string()),
      weekOfMonth: s.optionalNullable(s.int()),
      dayOfMonth: s.optionalNullable(s.int()),
      weeklyClosingDay: s.optionalNullable(s.string()),
      weeklyPayoutDay: s.optionalNullable(s.string()),
      _keysMap: {
        waitPeriod: "wait_period",
        fullPeriodRequired: "full_period_required",
        dayOfWeek: "day_of_week",
        weekOfMonth: "week_of_month",
        dayOfMonth: "day_of_month",
        weeklyClosingDay: "weekly_closing_day",
        weeklyPayoutDay: "weekly_payout_day",
      },
    },
    { additionalProperties: s.json() },
  );
