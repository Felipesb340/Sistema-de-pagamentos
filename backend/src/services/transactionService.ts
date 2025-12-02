import { Transaction, TransactionAttrs, TransactionDoc } from "../models/Transaction";

export interface AuthorizeInput {
  pan: string;
  brand: string;
  amount: number;
}

export interface AuthorizeResult {
  status: "approved" | "declined";
  reason: string | null;
  authorizationCode: string | null;
  maskedPan: string;
}

const ACCEPTED_BRANDS = ["Visa", "Mastercard", "Elo"] as const;

function generateAuthorizationCode(): string {
  const num = Math.floor(Math.random() * 1_000_000);
  return String(num).padStart(6, "0");
}

function maskPan(pan: string): string {
  const cleanPan = pan.replace(/\D/g, "");
  const padded = cleanPan.padStart(16, "0");
  const last4 = padded.slice(-4);
  return "**** **** **** " + last4;
}

export function authorizeTransaction(input: AuthorizeInput): AuthorizeResult {
  const { pan, brand, amount } = input;

  if (!/^\d{16}$/.test(pan)) {
    return {
      status: "declined",
      reason: "PAN inválido",
      authorizationCode: null,
      maskedPan: maskPan(pan)
    };
  }

  if (!ACCEPTED_BRANDS.includes(brand as any)) {
    return {
      status: "declined",
      reason: "Bandeira não aceita",
      authorizationCode: null,
      maskedPan: maskPan(pan)
    };
  }

  if (amount <= 0) {
    return {
      status: "declined",
      reason: "Valor inválido",
      authorizationCode: null,
      maskedPan: maskPan(pan)
    };
  }

  if (amount > 1000) {
    return {
      status: "declined",
      reason: "Excede limite permitido",
      authorizationCode: null,
      maskedPan: maskPan(pan)
    };
  }

  return {
    status: "approved",
    reason: null,
    authorizationCode: generateAuthorizationCode(),
    maskedPan: maskPan(pan)
  };
}

export async function createTransaction(
  input: AuthorizeInput
): Promise<TransactionDoc> {
  const result = authorizeTransaction(input);

  const payload: TransactionAttrs = {
    pan: result.maskedPan,
    brand: input.brand,
    amount: input.amount,
    status: result.status,
    reason: result.reason || undefined,
    authorizationCode: result.authorizationCode || undefined
  };

  const tx = await Transaction.create(payload);
  return tx;
}

export async function listTransactions(): Promise<TransactionDoc[]> {
  return Transaction.find().sort({ createdAt: -1 }).exec();
}
