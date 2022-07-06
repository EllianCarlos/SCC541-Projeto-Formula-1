import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

// Exemplo de como adicionar endpoint na api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    console.log("AAAAAAAAAAAA");
    let prismaClient = prisma as PrismaClient;
    try {
      const query = req.query;
      let { cityName } = query;

      cityName = decodeURIComponent(cityName as string);
      console.log(cityName);

      const data =
        await prismaClient.$queryRaw`SELECT * FROM lista_cidade('${cityName}');`;
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
