import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

// Exemplo de como adicionar endpoint na api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const query = req.query;
    const { login, type } = query;

    let prismaClient = prisma as PrismaClient;
    try {
      const query: any[] =
        await prismaClient.$queryRaw`SELECT idoriginal FROM users WHERE login = ${login} AND tipo = 'Escuderia'`;

      if (query.length > 1 || query.length < 0) {
        return res.status(500).json({ msg: "Não foi possível achar a escuderia" });
      }

      const queryResult = query[0] as any;
      const idoriginal = Number(queryResult!.idoriginal);

      const data =
        await prismaClient.$queryRaw`SELECT nome_status, CAST(quantidade AS int) FROM lista_status(CAST('Escuderia' AS TEXT), CAST(${idoriginal} AS INTEGER));`;
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
