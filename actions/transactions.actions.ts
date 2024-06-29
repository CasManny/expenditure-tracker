"use server";

import { db } from "@/lib/db";
import { ITransactionData, ITransactionResult } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const addTransaction = async (
  formdata: FormData
): Promise<ITransactionResult> => {
  const textValue = formdata.get("text");
  const amountValue = formdata.get("amount");

  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  // check for input values
  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or Amount is missing" };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  try {
    const transactonData: ITransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });
    revalidatePath('/')

    return { data: transactonData };
  } catch (error) {
    return { error: "Transaction invalid"}
  }
};
