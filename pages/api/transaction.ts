import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query, method } = req;

  switch (method) {
    case "POST":
      let response = await saveTransaction(req.body);
      res.send(await response.text());
      break;
    default:
      break;
  }
}

async function saveTransaction(transaction: string) {
  console.log(process.env.TRANSACTION_API_PATH_V8 as string);

  return await fetch(process.env.TRANSACTION_API_PATH_V8 as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
}
