"use client"
import { deleteTransaction } from '@/actions/transactions.actions'
import { addCommas } from '@/lib/utils'
import { ITransactionObject } from '@/types'
import React from 'react'
import { toast } from 'react-toastify'

const TransactionItem = async ({ transaction }: { transaction: ITransactionObject }) => {
    const sign = transaction.amount < 0 ? "-" : "+"
    const handleDeleteTransaction = async (id: string) => {
        const { message, error } = await deleteTransaction(id)
        toast.success(message)
    }
  return (
      <li className={`${transaction.amount > 0 ? "minus": "plus"}`}>
          {transaction.text}
          <span>
              {sign}
              {addCommas(Math.abs(transaction?.amount))}
          </span>
          <button onClick={() => handleDeleteTransaction(transaction.id)} className='delete-btn'>X</button>
    </li>
  )
}

export default TransactionItem