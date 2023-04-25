import Account from "@/src/models/Account";
import Balance from "@/src/models/Balance";
import Currency from "@/src/models/Currency";
import Transaction from "@/src/models/Transaction";
import { useEffect, useReducer, useRef, useState } from "react";

export default function Home() {
  const [transaction, setTransaction] = useState<Transaction>(
    Transaction.createExpense("", 0.0, "")
  );
  const [balances, setBalances] = useState<Balance[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const accountInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    getBalances();
    getAccounts();
    getCurrencies();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { account, amount, description } = transaction!;

    if (!amount) {
      console.log("amount is obligatory");
      return;
    }

    if (!account) {
      console.log("account is obligatory");
      return;
    }

    function clearInputs() {
      setTransaction(Transaction.createExpense("", 0, ""));
    }

    await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        clearInputs();
        accountInputRef.current?.focus();
      })
      .catch((error) => console.error(error));
  }

  function handleAccount(e: any) {
    setTransaction({ ...transaction, account: e.target.value });
  }

  function handleAmount(e: any) {
    if (isNaN(parseFloat(e.target.value))) {
      return;
    }
    setTransaction({ ...transaction, amount: e.target.value });
  }

  function handleDescription(e: any) {
    setTransaction({ ...transaction, description: e.target.value });
  }

  return (
    <main className={`flex min-h-screen flex-col justify-between p-12`}>
      <h1>Balance</h1>
      <ul>
        {balances.map((b) => (
          <li key={b.Platform + b.Currency.toString()}>
            {b.Platform} {b.Capital} {b.Currency}
          </li>
        ))}
      </ul>
      <ul>
        {accounts.map((a) => (
          <li key={a.Account}>{a.Account}</li>
        ))}
      </ul>
      <ul>
        {currencies.map((c) => (
          <li key={c.Currency}>{c.Currency}</li>
        ))}
      </ul>
      <form id="expenseForm" method="POST" onSubmit={submit}>
        <div className="input-group">
          <label htmlFor="account" className="label-primary">
            Account
          </label>
          <input
            value={transaction?.account}
            onChange={handleAccount}
            ref={accountInputRef}
            type="text"
            id="account"
            name="account"
            className="input-text"
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className="label-primary">
            Description
          </label>
          <input
            value={transaction?.description}
            onChange={handleDescription}
            type="text"
            id="description"
            name="description"
            className="input-text"
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount" className="label-primary">
            Amount
          </label>
          <input
            value={transaction?.amount}
            onChange={handleAmount}
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            className="input-text"
          />
        </div>
        <div className="input-group">
          <button type="submit" className="btn-primary">
            Add Expense
          </button>
        </div>
      </form>
    </main>
  );
}

// export async function getServerSideProps(query: any) {}
