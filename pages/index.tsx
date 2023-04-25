import TransactionComp from "@/components/TransactionComp";
import Balance from "@/src/models/Balance";
import { useEffect, useReducer, useRef, useState } from "react";

export default function Home() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [transactionType, setTransactionType] = useState("expense");

  useEffect(() => {
    getBalances();
  }, []);

  async function getBalances() {
    await fetch("/api/balance", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBalances(data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <main className={`flex min-h-screen flex-col justify-normal p-12`}>
      <h1>Balance</h1>
      <div className="flex flex-row justify-stretch">
        <button className="btn-secondary">Expense</button>
        <button className="btn-secondary">Income</button>
      </div>
      <ul>
        {balances.map((b) => (
          <li key={b.Platform + b.Currency.toString()}>
            {b.Platform} {b.Capital} {b.Currency}
          </li>
        ))}
      </ul>
      <TransactionComp transactionType="expense"></TransactionComp>
    </main>
  );
}

// export async function getServerSideProps(query: any) {}
