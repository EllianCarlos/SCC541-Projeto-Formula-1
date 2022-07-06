import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const login = req.body.login;
      const password = req.body.password;
      console.log(login);
      console.log(password);

      let prismaClient = prisma as PrismaClient;
      const query: any[] =
        await prismaClient.$queryRaw`SELECT password, tipo, userid FROM users WHERE login = ${login}`;

      if (query.length > 1) {
        return res.status(503).json({ msg: "Login não reconhecido 1" });
      }

      const queryData = query[0];
      const userPassword = queryData.password;
      const userId = queryData.userid;
      const tipo = queryData.tipo;

      if (!userPassword || userId === null || userId === undefined) {
        return res.status(503).json({ msg: "Login não reconhecido 1" });
      }

      if (md5(password) !== userPassword) {
        return res.status(503).json({ msg: "Login não reconhecido 2" });
      }

      return res.status(200).json({ type: tipo, userId: userId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
