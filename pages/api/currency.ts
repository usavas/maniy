import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query, method } = req;

  switch (method) {
    case "GET":
      let response = await getCurrencies();
      res.send(await response.text());
      break;
    default:
      break;
  }
}

async function getCurrencies() {
  return await fetch(
    (process.env.TRANSACTION_API_PATH_V8 as string) + "?path=currency",
    {
      method: "GET",
    }
  );
}
