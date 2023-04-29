import TransactionComp from "@/components/TransactionComp";
import Balance from "@/src/models/Balance";
import UseAccounts from "@/src/states/AccountsState";
import UseBalances from "@/src/states/BalancesState";
import UseCurrencies from "@/src/states/CurrenciesState";
import { useState } from "react";

type TransactionType = "expense" | "income";

export default function Home() {
  const [balances] = UseBalances();
  const [accounts] = UseAccounts();
  const [currencies] = UseCurrencies();

  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");

  function handleTransactionType(transactionType: TransactionType) {
    setTransactionType(transactionType);
  }

  var totalBalanceUSD: number = balances
    .filter((b) => b.Currency === "USD")
    .reduce((acc: any, curr: Balance) => {
      return acc + curr.Amount;
    }, 0);

  var totalBalanceTRY: number = balances
    .filter((b) => b.Currency === "TRY")
    .reduce((acc: any, curr: Balance) => {
      return acc + curr.Amount;
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
