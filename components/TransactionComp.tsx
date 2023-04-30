import React, { useEffect } from "react";
import Transaction from "@/src/models/Transaction";
import { useRef, useState } from "react";
import UseAccounts from "@/src/states/AccountsState";
import UseCurrencies from "@/src/states/CurrenciesState";

interface Props {
  transactionType: "income" | "expense";
  updateBalances: () => void;
}

const TransactionComp: React.FC<Props> = (props: Props) => {
  const [accounts] = UseAccounts();
  const [currencies] = UseCurrencies();

  function getTransactionBasedOnCurrentType() {
    return props.transactionType === "expense"
      ? Transaction.createExpense("", 0.0, "", "")
      : Transaction.createIncome("", 0.0, "", "");
  }

  const [transaction, setTransaction] = useState<Transaction>(
    getTransactionBasedOnCurrentType()
  );

  useEffect(() => {
    const transaction = getTransactionBasedOnCurrentType();
    setTransaction(transaction);
  }, [props.transactionType]);

  const accountInputRef = useRef<HTMLSelectElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { account, amount, currency, description } = transaction!;

    if (!amount) {
      console.log("amount is obligatory");
      return;
    }

    if (!account) {
      console.log("account is obligatory");
      return;
    }

    if (transaction.type === "out") {
      transaction.amount = transaction.amount * -1;
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
        clearInputs();
        props.updateBalances();
        accountInputRef.current?.focus();
      })
      .catch((error) => console.error(error));

    function clearInputs() {
      if (props.transactionType === "expense") {
        setTransaction(Transaction.createExpense("", 0, "", ""));
      } else {
        setTransaction(Transaction.createIncome("", 0, "", ""));
      }
    }
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

  function handleCurrency(e: any) {
    setTransaction({ ...transaction, currency: e.target.value });
  }

  return (
    <form
      className="mt-8 mb-8"
      id="expenseForm"
      method="POST"
      onSubmit={submit}
    >
      <div className="input-group">
        <label htmlFor="account" className="label-primary">
          Account
        </label>
        <select
          name="account"
          id="account"
          className="input-text"
          onChange={handleAccount}
          ref={accountInputRef}
          value={transaction?.account}
        >
          <option></option>
          {accounts.map((a) => (
            <option key={a.Account}>{a.Account}</option>
          ))}
        </select>
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
        <label htmlFor="currency" className="label-primary">
          Currency
        </label>
        <select
          name="currency"
          id="currency"
          className="input-text"
          onChange={handleCurrency}
          value={transaction?.currency}
        >
          <option></option>
          {currencies.map((c) => (
            <option key={c.Currency}>{c.Currency}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <button
          type="submit"
          className={
            props.transactionType === "expense"
              ? "btn-primary-red"
              : "btn-primary"
          }
        >
          {props.transactionType === "expense" ? "Add Expense" : "Add Income"}
        </button>
      </div>
    </form>
  );
};

export default TransactionComp;
