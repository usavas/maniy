import Transaction from "@/src/Transaction";

export default function Home() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = document.querySelector("form")!;

    let formdata: FormData = new FormData(form);

    let amount = formdata.get("amount") as string;
    let account = formdata.get("account") as string;
    let description = formdata.get("description") as string;

    if (!amount || isNaN(parseFloat(amount))) {
      console.log("amount is obligatory");
      return;
    }

    if (!account) {
      console.log("account is obligatory");
      return;
    }

    let transaction = Transaction.createExpense(
      account,
      parseFloat(amount),
      description
    );

    fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <main className={`flex min-h-screen flex-col justify-between p-12`}>
      <form id="expenseForm" method="POST" onSubmit={submit}>
        <div className="input-group">
          <label htmlFor="account" className="label-primary">
            Account
          </label>
          <input
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
          <input type="text" id="amount" name="amount" className="input-text" />
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
