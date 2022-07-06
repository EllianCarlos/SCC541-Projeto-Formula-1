import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    try {
      const query = req.query;
      const { forename } = query;

      let prismaClient = prisma as PrismaClient;

      if (forename) {
        const queryString = String();

        const query =
          (await prismaClient.$queryRaw`SELECT * FROM driver WHERE UPPER(forename) = UPPER(${String(
            forename
          ).trim()}) LIMIT 1;`) as any;

        console.log(query);
        if (query.length < 0 || query.length > 1) {
          return res
            .status(400)
            .json({ msg: "Não foi possível encontrar o piloto" });
        }

        const pilotData = query[0];
        return res.status(200).json({ ...pilotData });
      }

      return res
        .status(400)
        .json({ msg: "Não foi possível encontrar o piloto" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
