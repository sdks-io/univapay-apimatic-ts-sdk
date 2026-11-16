import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** イベントタイプの識別子 — このコールバックでは常に `customs_declaration_finished` になります。 */
export const CustomsDeclarationEvent = {
  CustomsDeclarationFinished: "customs_declaration_finished",
} as const;
export type CustomsDeclarationEvent =
  | (typeof CustomsDeclarationEvent)[keyof typeof CustomsDeclarationEvent]
  | (string & {});

export const customsDeclarationEventSchema: EnumSchema<CustomsDeclarationEvent> =
  s.enumOf<CustomsDeclarationEvent>(CustomsDeclarationEvent);
