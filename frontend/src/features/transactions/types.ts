export type TransactionStatus = "approved" | "declined";

export interface Transaction {
  _id: string;
  pan: string;                
  brand: string;
  amount: number;
  status: TransactionStatus;
  authorizationCode?: string;
  reason?: string;
  createdAt: string;
}

export interface CreateTransactionDTO {
  pan: string;
  brand: string;
  amount: number;
}
