import Balance from "@/src/models/Balance";
import { useState, useEffect } from "react";

function UseBalances(): [Balance[], () => void] {
  const [balances, setBalances] = useState<Balance[]>([]);

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

  async function updateBalances() {
    await getBalances();
  }

  return [balances, updateBalances];
}

export default UseBalances;
