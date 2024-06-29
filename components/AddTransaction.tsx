"use client"
import { addTransaction } from "@/actions/transactions.actions"
import { useRef } from "react"
import { toast } from "react-toastify"

const AddTransaction = () => {
    const formDataRef = useRef<HTMLFormElement>(null)

    const clientAction = async (formdata: FormData) => {
        const { error, data } = await addTransaction(formdata)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Transaction successful")
            formDataRef.current?.reset()
            
        }
    }
    return (
        <>
            <h3>Add Transaction</h3>
            <form ref={formDataRef} action={clientAction}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" name='text' placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)</label>
                    <input type="number" id="amount" name='amount' placeholder="Enter amount..." step={0.01}  />
                </div>

                <button className="btn">Add Transaction</button>
            </form>
        </>
  )
}

export default AddTransaction