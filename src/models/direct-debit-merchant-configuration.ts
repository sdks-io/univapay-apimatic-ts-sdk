import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { directDebitDebitDateSchema, type DirectDebitDebitDate } from "./direct-debit-debit-date.js";

/** 加盟店に適用されている口座振替の設定。 */
export type DirectDebitMerchantConfiguration = {
  /** 旧口座振替システムにおける加盟店の識別子。 */
  legacyId?: string;
  /** この加盟店で口座振替が有効かどうか。 */
  enabled?: boolean;
  /** 毎月の振替日区分 — 資金は14日または27日に引き落とされます。 */
  debitDate?: DirectDebitDebitDate;
  /** 収納銀行から割り当てられた委託者コード。 */
  consignorCode?: string;
  /** 収納銀行との取り決めによる振替の区分コード。 */
  classifier?: string;
  /** 消費者の通帳に記載される印字名。半角カタカナで指定します。 */
  signature?: string;
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

const directDebitMerchantConfigurationProperties: s.Shape<DirectDebitMerchantConfiguration> = {
  legacyId: s.optional(s.string()),
  enabled: s.optional(s.boolean()),
  debitDate: s.optional(s.lazy(() => directDebitDebitDateSchema)),
  consignorCode: s.optional(s.string()),
  classifier: s.optional(s.string()),
  signature: s.optional(s.string()),
  _keysMap: {
    legacyId: "legacy_id",
    debitDate: "debit_date",
    consignorCode: "consignor_code",
  },
};

export const directDebitMerchantConfigurationInternalSchema: Schema<DirectDebitMerchantConfiguration> =
  s.object<DirectDebitMerchantConfiguration>(directDebitMerchantConfigurationProperties, {
    additionalProperties: s.json(),
  });

export const directDebitMerchantConfigurationSchema: Schema<DirectDebitMerchantConfiguration> = s.lazySchema(
  () =>
    s.object<DirectDebitMerchantConfiguration>(
      {
        ...directDebitMerchantConfigurationProperties,
        legacyId: s.optional(s.string().check(s.pattern("^[0-9]+$"))),
        consignorCode: s.optional(s.string().check(s.minLength(6), s.maxLength(6), s.pattern("^[0-9]{6}$"))),
        classifier: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^[0-9]{2}$"))),
      },
      { additionalProperties: s.json() },
    ),
);
