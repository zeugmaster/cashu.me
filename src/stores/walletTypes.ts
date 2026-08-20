export enum PaymentMethod {
  Bolt11 = "bolt11",
  Bolt12 = "bolt12",
  Bolt12Subpayment = "bolt12-subpayment",
  Onchain = "onchain",
  OnchainSubpayment = "onchain-subpayment",
}

// A NUT-04/05 payment method: either a first-class member of PaymentMethod
// or a custom method string advertised by a mint (e.g. "branch").
export type PaymentMethodId = PaymentMethod | (string & {});

const KNOWN_PAYMENT_METHODS = new Set<string>(Object.values(PaymentMethod));

const SUBPAYMENT_SUFFIX = "-subpayment";

// Custom method names are used to build mint endpoint paths; only accept
// conservative identifiers from mint advertisements.
const CUSTOM_METHOD_PATTERN = /^[a-z0-9_-]{1,32}$/;

export function isValidCustomMethodName(method: unknown): method is string {
  return typeof method === "string" && CUSTOM_METHOD_PATTERN.test(method);
}

export function isCustomPaymentMethod(
  method?: string | null
): method is string {
  return Boolean(method) && !KNOWN_PAYMENT_METHODS.has(method as string);
}

// "bolt12-subpayment" -> "bolt12", "branch-subpayment" -> "branch"
export function basePaymentMethod(method: string): string {
  return method.endsWith(SUBPAYMENT_SUFFIX)
    ? method.slice(0, -SUBPAYMENT_SUFFIX.length)
    : method;
}

export function subpaymentMethod(method: string): string {
  return `${method}${SUBPAYMENT_SUFFIX}`;
}

export function paymentMethodLabel(method: string): string {
  const base = basePaymentMethod(method);
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export enum UnifiedTransactionType {
  Ecash = "ecash",
  Lightning = "lightning",
  Onchain = "onchain",
}
