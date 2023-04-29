import Account from "@/src/models/Account";
import { useState, useEffect } from "react";

function UseAccounts(): [Account[]] {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    getAccounts();
  }, []);

  async function getAccounts() {
    await fetch("/api/account", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      })
      .catch((error) => console.error(error));
  }

  return [accounts];
}

export default UseAccounts;
