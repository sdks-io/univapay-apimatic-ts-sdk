import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionTerminationModeSchema,
  type SubscriptionTerminationMode,
} from "./subscription-termination-mode.js";

/** 定期課金に適用されるスケジュール設定。 */
export type SubscriptionScheduleSettings = {
  /** 定期スケジュールが開始される日付（YYYY-MM-DD）。 */
  startOn?: string | null;
  /** IANA タイムゾーン ID。 */
  zoneId?: string;
  /** true の場合、それ以降の課金は常に月末日に発生します。 */
  preserveEndOfMonth?: boolean | null;
  /** 決済が失敗した場合のリトライ間隔を、ISO-8601 期間形式（例：P5D）で指定します。 */
  retryInterval?: string | null;
  /** 定期課金終了モードのスキーマ。 */
  terminationMode?: SubscriptionTerminationMode;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionScheduleSettingsSchema: Schema<SubscriptionScheduleSettings> =
  s.object<SubscriptionScheduleSettings>(
    {
      startOn: s.optionalNullable(s.dateOnly()),
      zoneId: s.optional(s.string()),
      preserveEndOfMonth: s.optionalNullable(s.boolean()),
      retryInterval: s.optionalNullable(s.string()),
      terminationMode: s.optional(s.lazy(() => subscriptionTerminationModeSchema)),
      _keysMap: {
        startOn: "start_on",
        zoneId: "zone_id",
        preserveEndOfMonth: "preserve_end_of_month",
        retryInterval: "retry_interval",
        terminationMode: "termination_mode",
      },
    },
    { additionalProperties: s.json() },
  );
