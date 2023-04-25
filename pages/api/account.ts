import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query, method } = req;

  switch (method) {
    case "GET":
      let response = await getAccounts();
      res.send(await response.text());
      break;
    default:
      break;
  }
}

async function getAccounts() {
  return await fetch(
    (process.env.TRANSACTION_API_PATH_V9 as string) + "?path=account",
    {
      method: "GET",
    }
  );
}
