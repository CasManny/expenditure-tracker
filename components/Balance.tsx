import { getUserBalance } from '@/actions/transactions.actions'
import { addCommas } from '@/lib/utils'
import React from 'react'

const Balance = async () => {
    const { balance, error} = await getUserBalance()
  return (
      <>
          <h4>Your Balance</h4>
          <h1>${addCommas(Number(balance?.toFixed(2))) ?? 0}</h1>
      </>
  )
}

export default Balance