import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** イベントタイプの識別子 — `charge_updated` または `charge_finished`。 */
export const ChargeEvent = {
  ChargeUpdated: "charge_updated",
  ChargeFinished: "charge_finished",
} as const;
export type ChargeEvent = (typeof ChargeEvent)[keyof typeof ChargeEvent] | (string & {});

export const chargeEventSchema: EnumSchema<ChargeEvent> = s.enumOf<ChargeEvent>(ChargeEvent);
