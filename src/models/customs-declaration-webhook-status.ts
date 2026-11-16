import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** バックエンドから返される税関申告ステータス。 */
export const CustomsDeclarationWebhookStatus = {
  Pending: "pending",
  Successful: "successful",
  Failed: "failed",
  Error: "error",
} as const;
export type CustomsDeclarationWebhookStatus =
  | (typeof CustomsDeclarationWebhookStatus)[keyof typeof CustomsDeclarationWebhookStatus]
  | (string & {});

export const customsDeclarationWebhookStatusSchema: EnumSchema<CustomsDeclarationWebhookStatus> =
  s.enumOf<CustomsDeclarationWebhookStatus>(CustomsDeclarationWebhookStatus);
