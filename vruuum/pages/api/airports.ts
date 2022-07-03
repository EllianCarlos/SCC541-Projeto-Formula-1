import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Exemplo de como adicionar endpoint na api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    try {
      const data = await prisma.product.findMany({});
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
