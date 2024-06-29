import AddTransaction from "@/components/AddTransaction";
import styles from "./page.module.css";
import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return <Guest />
  }
  return (
    <main>
      <h1>Welcome {user.firstName}</h1>
      <AddTransaction />

    </main>
  );
}
