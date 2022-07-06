import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import md5 from 'md5';

// Exemplo de como adicionar endpoint na api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const login = req.body.login;
      const password = req.body.password;

      let prismaClient = prisma as PrismaClient;
      const [userPassword, tipo, userid]: any = await prismaClient.$queryRaw`SELECT password, tipo, userid FROM login WHERE login = ${login}`;

      if (!!userPassword || !!tipo) {
        return res.status(503).json({ msg: "Login não reconhecido" });
      }

      if (md5(password) !== userPassword) {
        return res.status(503).json({ msg: "Login não reconhecido" });
      }

      return res.status(200).json({ tipo });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
