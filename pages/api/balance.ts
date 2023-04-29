import type { NextApiRequest, NextApiResponse } from "next";
import Balance from "@/src/models/Balance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query, method } = req;

  switch (method) {
    case "GET":
      let response = await getBalanceInfo();
      res.send(JSON.stringify(response));
      break;
    default:
      break;
  }
}

/**
 *
 * @returns Balance Info
 */
async function getBalanceInfo() {
  const result = await fetch(
    (process.env.TRANSACTION_API_PATH_V9 as string) + "?path=balance",
    {
      method: "GET",
    }
  );

  const body = await result.text();
  const balances = JSON.parse(body) as Balance[];

  let sanitizedBalances: Balance[] = [];

  let prevAccount: string = "";
  for (let i = 1; i < balances.length; i++) {
    const b = balances[i];
    if (!b.Currency) {
      continue;
    }
    if (!b.Account) {
      b.Account = prevAccount;
    }

    sanitizedBalances.push(b);

    if (b.Account) {
      prevAccount = b.Account;
    }
  }

  return sanitizedBalances;
}
