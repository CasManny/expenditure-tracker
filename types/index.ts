
export interface ITransactionData {
    text: string;
    amount: number;
}

export interface ITransactionResult {
    data?: ITransactionData;
    error?: string;
}

export interface ITransactionObject {
    id: string;
    text: string;
    amount: number;
    userId: string;
    createdAt: Date;
}