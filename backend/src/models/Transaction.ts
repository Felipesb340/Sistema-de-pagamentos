import mongoose, { Document, Model } from "mongoose";

export type TransactionStatus = "approved" | "declined";

export interface TransactionAttrs {
  pan: string;                 
  brand: string;              
  amount: number;
  status: TransactionStatus;
  reason?: string;
  authorizationCode?: string;
  createdAt?: Date;
}

export interface TransactionDoc extends Document, TransactionAttrs {}

const transactionSchema = new mongoose.Schema<TransactionDoc>(
  {
    pan: { type: String, required: true },
    brand: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["approved", "declined"],
      required: true
    },
    reason: { type: String },
    authorizationCode: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Transaction: Model<TransactionDoc> =
  mongoose.models.Transaction ||
  mongoose.model<TransactionDoc>("Transaction", transactionSchema);
