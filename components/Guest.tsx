import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const Guest = () => {
  return (
      <div className='guest'>
          <h2>Welcome</h2>
          <p>Please sign in to manage your transaction</p>
          <SignInButton />
    </div>
  )
}

export default Guest