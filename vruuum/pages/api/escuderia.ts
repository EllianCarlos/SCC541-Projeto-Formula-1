import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const body = req.body;

      let prismaClient = prisma as PrismaClient;
      const nextIdQuery =
        (await prismaClient.$queryRaw`SELECT MAX(constructorid) as constructorid FROM constructors;`) as any;
      const nextId = Number(nextIdQuery[0].constructorid) + 1;

      const createdRows =
        await prismaClient.$queryRaw`INSERT INTO public.constructors (constructorid, constructorref, "name", nationality, url) VALUES (${nextId}, '${body.constructorref}','${body.name}','${body.nationality}','${body.url}' );`;
      console.log(createdRows);
      return res.status(201).json({ msg: "Created" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
