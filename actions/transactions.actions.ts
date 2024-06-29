"use server";

import { db } from "@/lib/db";
import {
  ITransactionData,
  ITransactionObject,
  ITransactionResult,
} from "@/types";
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
    revalidatePath("/");

    return { data: transactonData };
  } catch (error) {
    return { error: "Transaction invalid" };
  }
};

export const getUserBalance = async (): Promise<{
  balance?: number;
  error?: string;
}> => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId,
      },
    });
    const balance = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    revalidatePath("/");
    return { balance };
  } catch (error) {
    return { error: "Error in getting balance" };
  }
};

export const getIncomeExpenses = async (): Promise<{
  income?: number;
  expenses?: number;
  error?: string;
}> => {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId,
      },
    });
    const amounts = transactions.map((transaction) => transaction.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);
    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);
    revalidatePath("/");

    return { income, expenses: Math.abs(expense) };
  } catch (error) {
    return { error: "Error in getting details" };
  }
};

export const getAllTransaction = async (): Promise<{
  transactions?: ITransactionObject[];
  error?: string;
}> => {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: { createdAt: "desc" },
    });
    revalidatePath("/");
    return { transactions };
  } catch (error) {
    return { error: "Error in retrieving transactions" };
  }
};

export const deleteTransaction = async (
  id: string
): Promise<{ message?: string; error?: string }> => {
  const { userId } = auth();
  if (!userId) {
    return { error: "user not fount" };
  }

  try {
    await db.transaction.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    revalidatePath('/')
    return { message: "deleted successfully"}
  } catch (error) {
    return { error: "Error in deleting file" };
  }
};
