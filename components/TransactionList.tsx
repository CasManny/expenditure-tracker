import { getAllTransaction } from '@/actions/transactions.actions'
import { ITransactionObject } from '@/types'
import React from 'react'
import TransactionItem from './TransactionItem'

const TransactionList = async () => {
    const { transactions, error } = await getAllTransaction()
    if (error) {
        return <p className="error">{ error }</p>
    }
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions && transactions.map((transaction: ITransactionObject) => (
                    <TransactionItem key={ transaction.id} transaction={transaction} />
                ))}
            </ul>
        </>
  )
}

export default TransactionList