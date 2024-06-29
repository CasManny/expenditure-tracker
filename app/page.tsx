import AddTransaction from "@/components/AddTransaction";
import styles from "./page.module.css";
import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return <Guest />
  }
  return (
    <main>
      <h2>Welcome {user.firstName}</h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />

    </main>
  );
}
