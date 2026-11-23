import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import {
  subscriptionTerminationModeSchema,
  type SubscriptionTerminationMode,
} from "./subscription-termination-mode.js";

/** スケジュール関連の設定。 */
export type SuspendScheduleSettings = {
  /** 定期課金終了モードのスキーマ。 */
  terminationMode?: SubscriptionTerminationMode;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const suspendScheduleSettingsSchema: Schema<SuspendScheduleSettings> =
  s.object<SuspendScheduleSettings>(
    {
      terminationMode: s.optional(s.lazy(() => subscriptionTerminationModeSchema)),
      _keysMap: {
        terminationMode: "termination_mode",
      },
    },
    { additionalProperties: s.json() },
  );
