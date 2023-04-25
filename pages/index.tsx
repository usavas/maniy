import TransactionComp from "@/components/TransactionComp";
import Account from "@/src/models/Account";
import Balance from "@/src/models/Balance";
import Currency from "@/src/models/Currency";
import { useEffect, useState } from "react";

type TransactionType = "expense" | "income";

export default function Home() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");

  useEffect(() => {
    getBalances();
    getAccounts();
    getCurrencies();
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

  async function getAccounts() {
    await fetch("/api/account", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAccounts(data);
      })
      .catch((error) => console.error(error));
  }

  async function getCurrencies() {
    await fetch("/api/currency", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrencies(data);
      })
      .catch((error) => console.error(error));
  }

  function handleTransactionType(transactionType: TransactionType) {
    setTransactionType(transactionType);
  }

  var totalBalanceUSD: number = balances
    .filter((b) => b.Currency === "USD")
    .reduce((acc: any, curr: Balance) => {
      return acc + curr.Capital;
    }, 0);

  var totalBalanceTRY: number = balances
    .filter((b) => b.Currency === "TRY")
    .reduce((acc: any, curr: Balance) => {
      return acc + curr.Capital;
    }, 0);

  return (
    <main className={`flex min-h-screen flex-col justify-normal p-12`}>
      <h1>Balance</h1>
      <div className="flex my-8 flex-row items-stretch justify-around">
        <button
          className={
            "flex-1 mx-2 " +
            (transactionType === "expense"
              ? "btn-secondary-selected"
              : "btn-secondary")
          }
          onClick={() => {
            handleTransactionType("expense");
          }}
        >
          Expense
        </button>
        <button
          className={
            "flex-1 mx-2 " +
            (transactionType === "income"
              ? "btn-secondary-selected"
              : "btn-secondary")
          }
          onClick={() => {
            handleTransactionType("income");
          }}
        >
          Income
        </button>
      </div>
      <ul>
        {balances.map((b) => (
          <li key={b.Platform + b.Currency.toString()}>
            {b.Platform} {b.Capital} {b.Currency}
          </li>
        ))}
        <li className="mt-2">
          {"Total: " + totalBalanceUSD.toFixed(2) + " USD"}
        </li>
        <li>{"Total: " + totalBalanceTRY.toFixed(2) + " TRY"}</li>
      </ul>
      <TransactionComp
        transactionType={transactionType}
        currencies={currencies}
        accounts={accounts}
      ></TransactionComp>
    </main>
  );
}

// export async function getServerSideProps(query: any) {}
