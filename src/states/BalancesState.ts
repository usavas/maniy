import Balance from "@/src/models/Balance";
import { useState, useEffect } from "react";

function UseBalances(): [Balance[]] {
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

  return [balances];
}

export default UseBalances;
