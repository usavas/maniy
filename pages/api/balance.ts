import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query, method } = req;

  switch (method) {
    case "GET":
      let response = await getBalanceInfo();
      res.send(await response.text());
      break;
    default:
      break;
  }
}

async function getBalanceInfo() {
  return await fetch(
    (process.env.TRANSACTION_API_PATH_V8 as string) + "?path=balance",
    {
      method: "GET",
    }
  );
}
