import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionTerminationModeSchema,
  type SubscriptionTerminationMode,
} from "./subscription-termination-mode.js";

/** 定期課金で更新可能なスケジュール設定。 */
export type SubscriptionUpdateScheduleSettings = {
  /** 定期課金終了モードのスキーマ。 */
  terminationMode?: SubscriptionTerminationMode;
  /**
   * 定期課金開始日（YYYY-MM-DD）。初期段階で決済手段のみを登録した定期課金に対して、最初の実際の課金日を変更するために使用されます。未来の日付である必要があり、定期課金の支払い済み回数が1回以下の場合のみ利用できます。
   */
  startOn?: string;
  /** true の場合、以降の課金は常に月末日に行われます。 */
  preserveEndOfMonth?: boolean;
  /** 決済失敗時のリトライ間隔を、ISO-8601 期間形式（例：3日間の場合は P3D、48時間の場合は PT48H）で指定します。 */
  retryInterval?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionUpdateScheduleSettingsSchema: Schema<SubscriptionUpdateScheduleSettings> =
  s.object<SubscriptionUpdateScheduleSettings>(
    {
      terminationMode: s.optional(s.lazy(() => subscriptionTerminationModeSchema)),
      startOn: s.optional(s.dateOnly()),
      preserveEndOfMonth: s.optional(s.boolean()),
      retryInterval: s.optional(s.string()),
      _keysMap: {
        terminationMode: "termination_mode",
        startOn: "start_on",
        preserveEndOfMonth: "preserve_end_of_month",
        retryInterval: "retry_interval",
      },
    },
    { additionalProperties: s.json() },
  );
