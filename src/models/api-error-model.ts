import * as s from "../core/validation/index.js";
import type { JsonValue, Schema } from "../core/validation/schema.js";
import { apiErrorDetailSchema, type ApiErrorDetail } from "./api-error-detail.js";

/** 標準的な API エラーレスポンスのペイロード。 */
export type ApiErrorModel = {
  /** 常に 'error' を返します。 @default "error" */
  status?: "error";
  /**
   * API リクエストエラーコード。
   *
   * | HTTP | エラーコード | 説明 |
   * | :--- | :--- | :--- |
   * | 400 | ALREADY_CAPTURED | 対象の課金はすでにキャプチャされているか、またはオーソリが未完了です。 |
   * | 400 | AUTH_NOT_SUPPORTED | 設定されたゲートウェイはオーソリをサポートしていません。 |
   * | 400 | CANCEL_NOT_ALLOWED | この決済手段はキャンセルをサポートしていないか、あるいは現在の課金ステータスではキャンセルできません。 |
   * | 400 | CANNOT_CHANGE_CANCELED_SUBSCRIPTION | 解約された定期課金は変更できません。 |
   * | 400 | CANNOT_CHANGE_TOKEN | この状態の定期課金のトランザクション・トークンは変更できません。 |
   * | 400 | CANNOT_REFUND_UNSUCCESSFUL_CHARGE | 「successful（成功）」以外のステータスの課金は返金できません。 |
   * | 400 | CAPTURE_AMOUNT_TOO_LARGE | キャプチャ金額がオーソリ金額を超えています。 |
   * | 400 | CHARGEBACK_NOT_ALLOWED | 返金理由 `chargeback_reverse` は、ステータスが `successful` の返金にのみ設定できます。 |
   * | 400 | CARD_BRAND_NOT_SUPPORTED | 設定されたゲートウェイは指定されたカードブランドをサポートしていません。 |
   * | 400 | CARD_COUNTRY_NOT_SUPPORTED | 設定されたゲートウェイは指定されたカード発行国をサポートしていません。 |
   * | 400 | CARD_PROCESSING_DISABLED | この決済手段ではカード処理が無効化されています。 |
   * | 400 | CHARGE_TOO_QUICK | 同じカードまたは継続課金トークンに対して、30秒以内に同じ金額の課金を複数回作成しようとしました。 |
   * | 400 | CONVENIENCE_PROCESSING_DISABLED | この決済手段ではコンビニ決済処理が無効化されています。 |
   * | 400 | CURRENCY_MUST_MATCH_CHARGE | 返金通貨は元の課金通貨と一致する必要があります。 |
   * | 400 | CVV_REQUIRED | CVV が必要です。 |
   * | 400 | CVV_AUTHORIZATION_NOT_COMPLETED | CVV 認証に失敗しました。 |
   * | 400 | FILE_INVALID_TYPE | アップロードされたファイルの MIME タイプが正しくありません。 |
   * | 400 | FILE_MAX_SIZE_EXCEEDED | アップロードされたファイルのサイズが大きすぎます。 |
   * | 400 | FORBIDDEN_IP | リクエストの IP アドレスから判定された国が許可されていません。 |
   * | 400 | INSTALLMENT_MAX_PAYOUT_PERIOD_EXCEEDED | 分割払いの期間が許容される最大期間を超えています。 |
   * | 400 | INSTALLMENT_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN | この分割払いプランでは決済手段が許可されていません。 |
   * | 400 | INSTALLMENT_INVALID_CYCLES_COUNT | 指定された分割回数は利用できません。 |
   * | 400 | INSTALLMENT_INVALID_PLAN | サポートされていない分割払いプランです。 |
   * | 400 | INVALID_CARDHOLDER_NAME | カード名義人の名前が、この決済を処理するゲートウェイの要件を満たしていません。 |
   * | 400 | INVALID_PLATFORM | 無効なプラットフォームが指定されました。 |
   * | 400 | INVALID_REFUND_REASON | 指定された返金理由は許可されていません。返金の作成時に `chargeback_reverse` は設定できません。また、既存の理由をチャージバック系の理由とそれ以外の理由との間で変更することはできません。 |
   * | 400 | INVALID_TOKEN_TYPE | 無効なトランザクション・トークンタイプです。 |
   * | 400 | INVALID_QR_SCAN_GATEWAY | QR コードスキャンゲートウェイが設定されていないか、有効になっていません。 |
   * | 400 | LAST_NAME_REQUIRED | カード名義人の、スペースで区切られた「姓（苗字）」が必要です。 |
   * | 400 | LIVE_MODE_NOT_ENABLED_WHEN_UNVERIFIED | 本番モードを使用するにはアカウントの審査を完了する必要があります。 |
   * | 400 | NO_DIRECT_CURRENCY_GATEWAY | 通貨換算なしで決済を処理できるゲートウェイが利用できません。 |
   * | 400 | NO_GATEWAYS_AVAILABLE | 利用可能なゲートウェイが見つかりません。 |
   * | 400 | NO_TEST_CARD_IN_LIVE_MODE | 本番モードでテストカードは使用できません。 |
   * | 400 | NON_SUBSCRIPTION_PAYMENT | 課金を作成するには、ワンタイムトークンまたはリカーリングトークンを指定してください。 |
   * | 400 | NOT_ONE_TIME_TOKEN | ワンタイムトークンのみがサポートされています。 |
   * | 400 | NOT_SUBSCRIPTION_TOKEN | 定期課金またはリカーリングトークンを指定してください。 |
   * | 400 | PARTIAL_CAPTURE_NOT_ALLOWED | この決済手段では部分キャプチャが有効になっていません。オーソリ金額の全額をキャプチャしてください。 |
   * | 400 | PARTIAL_CAPTURE_NOT_SUPPORTED | 部分キャプチャはサポートされていません。 |
   * | 400 | PAYMENT_EXPIRATION_EXCEEDS_PERIOD | 支払い有効期限が許容されるサイクルを超えています。 |
   * | 400 | PAYMENT_TYPE_NOT_ALLOWED | トランザクショントークンの決済手段は、この操作では使用できません（例: 定期課金に銀行振込のトークンを指定した場合）。 |
   * | 400 | PROCESSING_MODE_MISMATCH | アプリケーション・トークンとトランザクション・トークンのモードが一致しません（例：本番 vs テスト）。 |
   * | 400 | QR_PROCESSING_DISABLED | この決済手段では QR 決済処理が無効化されています。 |
   * | 400 | RECURRING_TOKEN_DISABLED | トランザクション・トークンが無効になっているか、アカウントにリカーリングトークンを使用する権限がありません。 |
   * | 400 | RECURRING_USAGE_LIMIT_REQUIRED | `usage_limit` パラメータが必要です。 |
   * | 400 | RECURRING_USAGE_REQUIRES_CVV | 継続利用には CVV が必要です。 |
   * | 400 | REFUND_EXCEEDS_CHARGE_AMOUNT | 返金金額が課金金額を超えています。 |
   * | 400 | REFUND_NOT_ALLOWED | この決済手段は返金をサポートしていないか、返金が拒否されました。 |
   * | 400 | REFUND_EXCEEDS_SALES | 返金金額が加盟店の利用可能な残高制限を超えています。 |
   * | 400 | REFUND_NOT_WITHIN_BOUNDS | 部分返金の合計額が総課金金額を超えています。 |
   * | 400 | RESOURCE_LIMIT_REACHED | リソース制限に達しました。 |
   * | 400 | SUBSCRIPTION_ALREADY_ENDED | 定期課金はすでに終了しています。 |
   * | 400 | SUBSCRIPTION_PAYMENT_TYPE_NOT_ALLOWED_FOR_PLAN | この定期課金プランでは決済手段が許可されていません。 |
   * | 400 | TOKEN_FOR_WRONG_STORE | トランザクション・トークンの店舗が定期課金の店舗と異なります。 |
   * | 400 | TRANSACTION_ALREADY_PROCESSED | 使用済みのトランザクション・トークンは再度指定できません。 |
   * | 400 | TRANSACTION_TOKEN_EXPIRED | トランザクション・トークンの有効期限が切れています。 |
   * | 400 | USAGE_LIMIT_NOT_APPLICABLE | ここでは `usage_limit` を指定できません。 |
   * | 400 | VALIDATION_ERROR | リクエストパラメータにバリデーションエラーがあります。詳細は `errors` を確認してください。 |
   * | 400 | CHARGE_AMOUNT_TOO_HIGH | 課金金額が許容される最大制限を超えています。 |
   * | 400 | NOT_SUPPORTED_BY_PROCESSOR | ゲートウェイはこのリクエストをサポートしていません。 |
   * | 401 | AUTH_HEADER_MISSING | `Authorization` ヘッダーがありません。 |
   * | 401 | EXPIRED_LOGIN_TOKEN | ログイン・トークンの有効期限が切れています。 |
   * | 401 | INVALID_APP_TOKEN | 指定されたアプリケーション・トークンが無効です。 |
   * | 401 | INVALID_CREDENTIALS | 認証資格情報が無効です。 |
   * | 401 | INVALID_DOMAIN | 要求された `Origin` ドメインは、指定されたアプリケーション・トークンに登録されていません。 |
   * | 401 | INVALID_LOGIN_TOKEN | ログイン・トークンが無効です。 |
   * | 401 | DIRECT_CARD_TOKEN_CREATION_DISABLED | PCI DSS に準拠していないため、生のカードデータを送信できません。 |
   * | 403 | CARD_LOCKED | 特定の期間内に失敗しきい値を超えたため、このカードは一時的にロックされています。 |
   * | 403 | INVALID_PERMISSIONS | アプリケーション・トークンのタイプが正しくないか、アカウントに十分な権限がありません。 |
   * | 403 | INSTALLMENT_PROCESSOR_INITIAL_AMOUNTS_NOT_SUPPORTED | このゲートウェイでは、分割払いの初回金額指定はサポートされていません。 |
   * | 403 | OUTDATED_APP_TOKEN | アプリケーション・トークンのバージョンが古いです。新しいトークンを作成してください。 |
   * | 403 | TEST_CARD_CANNOT_BE_BANNED | テストカードを禁止（BAN）することはできません。 |
   * | 403 | INSTALLMENTS_NOT_ENABLED | 分割払いが有効になっていません。 |
   * | 409 | IDEMPOTENCY_KEY_CONFLICT | 指定されたべき等キー（Idempotency Key）は、以前別のリクエストで使用されています。 |
   * | 409 | NON_UNIQUE_ACTIVE_TOKEN | アクティブなトランザクション・トークンがすでに存在します。 |
   * | 409 | WEBHOOK_URL_EXISTS | 指定されたウェブフック URL はすでに登録されています。 |
   * | 500 | COULD_NOT_REFRESH_AUTH | ログイン・トークンのリフレッシュに失敗しました。 |
   * | 500 | DB_ERROR | 内部データベースエラー。 |
   * | 500 | FILE_UPLOAD_ERROR | ファイルのアップロードに失敗しました。 |
   * | 500 | IMPROPER_AUTH | 認証状態が不適切です。 |
   * | 500 | TIMEOUT | 内部処理中にタイムアウトが発生しました。 |
   * | 500 | UNABLE_TO_GET_IDEMPOTENT_RESULT | べき等キーのキャッシュは見つかりましたが、以前の処理結果を取得できませんでした。 |
   * | 500 | UNKNOWN_ERROR | 予期しないエラーが発生しました。 |
   * | 503 | SERVICE_UNAVAILABLE_TRY_AGAIN | サービスは一時的に利用できません。後でもう一度お試しください。 |
   * | 504 | NO_GATEWAY_AVAILABLE_TO_PROCESS_THE_REQUEST | このリクエストは、接続されているゲートウェイシステムでサポートされていません。 |
   */
  code: string;
  /** 詳細な API エラーのリスト。 */
  errors?: ApiErrorDetail[];
  /** Properties the service sent or accepts beyond those declared. */
  additionalProperties?: Record<string, JsonValue>;
};

export const apiErrorModelSchema: Schema<ApiErrorModel> = s.object<ApiErrorModel>(
  {
    status: s.defaulted(s.literal("error"), "error"),
    code: s.string(),
    errors: s.optional(s.array(s.lazy(() => apiErrorDetailSchema))),
  },
  { additionalProperties: s.json() },
);
