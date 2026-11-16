import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { suspendScheduleSettingsSchema, type SuspendScheduleSettings } from "./suspend-schedule-settings.js";

/** 定期課金を一時停止するためのリクエストボディ。`schedule_settings.termination_mode` フィールドで、一時停止がいつ発効するかを制御します。 */
export type SubscriptionSuspendRequest = {
  /** スケジュール関連の設定。 */
  scheduleSettings?: SuspendScheduleSettings;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const subscriptionSuspendRequestSchema: Schema<SubscriptionSuspendRequest> =
  s.object<SubscriptionSuspendRequest>(
    {
      scheduleSettings: s.optional(s.lazy(() => suspendScheduleSettingsSchema)),
      _keysMap: {
        scheduleSettings: "schedule_settings",
      },
    },
    { additionalProperties: s.json() },
  );
