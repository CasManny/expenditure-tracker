import { getIncomeExpenses } from '@/actions/transactions.actions'
import React from 'react'

const IncomeExpense = async  () => {
    const { income, expenses } = await getIncomeExpenses()
  return (
      <div className='inc-exp-container'>
          <div>
              <h4>Income</h4>
              <p className="money plus">${ income}</p>
          </div>
          <div>
              <h4>Expense</h4>
              <p className="money minus">${expenses }</p>
          </div>
    </div>
  )
}

export default IncomeExpense