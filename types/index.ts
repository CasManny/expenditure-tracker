
export interface ITransactionData {
    text: string;
    amount: number;
}

export interface ITransactionResult {
    data?: ITransactionData;
    error?: string;
}