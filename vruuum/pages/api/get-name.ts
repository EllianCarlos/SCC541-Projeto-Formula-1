import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    try {
      const query = req.query;
      const { login, type } = query;

      let prismaClient = prisma as PrismaClient;

      if (type === "Piloto") {
        const query: any[] =
          await prismaClient.$queryRaw`SELECT idoriginal FROM users WHERE login = ${login} AND tipo = 'Piloto'`;

        if (query.length > 1 || query.length < 0) {
          return res
            .status(500)
            .json({ msg: "Não foi possível resolver nome" });
        }

        const queryResult = query[0];

        if (queryResult === undefined) {
          return res
            .status(500)
            .json({ msg: "Não foi possível resolver nome" });
        }

        const idoriginal = queryResult.idoriginal;

        const nameQuery: any[] =
          await prismaClient.$queryRaw`SELECT forename, surname FROM driver WHERE driverid = ${idoriginal}`;

        if (nameQuery.length > 1 || nameQuery.length < 0) {
          return res
            .status(500)
            .json({ msg: "Não foi possível resolver nome" });
        }

        const nameQueryResult = nameQuery[0];
        const forename = nameQueryResult.forename;
        const surname = nameQueryResult.surname;

        return res.status(200).json({ name: `${forename} ${surname}` });
      }

      if (type === "Escuderia") {
        const query: any[] =
          await prismaClient.$queryRaw`SELECT idoriginal FROM users WHERE login = ${login} AND tipo = 'Escuderia'`;

        if (query.length > 1 || query.length < 0) {
          return res
            .status(500)
            .json({ msg: "Não foi possível resolver nome" });
        }

        const queryResult = query[0];

        if (queryResult === undefined) {
          return res
            .status(500)
            .json({ msg: "Não foi possível resolver nome" });
        }

        const idoriginal = queryResult.idoriginal;

        const nameQuery: any[] =
          await prismaClient.$queryRaw`SELECT name FROM constructors WHERE constructorid = ${idoriginal}`;

        if (nameQuery.length > 1 || nameQuery.length < 0) {
          return res
            .status(500)
            .json({ msg: "Não foi possível resolver nome" });
        }

        const nameQueryResult = nameQuery[0];
        const name = nameQueryResult.name;

        return res.status(200).json({ name });
      }

      if (type === "Administrador") {
        return res.status(200).json({ name: "Administrador" });
      }

      return res.status(400).json({ msg: "Tipo de usuário não reconhecido" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
