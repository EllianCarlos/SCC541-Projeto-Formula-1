import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

// Exemplo de como adicionar endpoint na api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    let prismaClient = prisma as PrismaClient;
    try {
      const data =
        await prismaClient.$queryRaw`SELECT nome_status, CAST(quantidade AS int) FROM lista_status('Administrador', 1);`;
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
