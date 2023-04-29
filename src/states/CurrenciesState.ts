import Currency from "@/src/models/Currency";
import { useState, useEffect } from "react";

function useCurrencies(): [Currency[]] {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    getCurrencies();
  }, []);

  async function getCurrencies() {
    await fetch("/api/currency", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data);
      })
      .catch((error) => console.error(error));
  }

  return [currencies];
}

export default useCurrencies;
