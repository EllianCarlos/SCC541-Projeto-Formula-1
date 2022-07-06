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

      if (type === "Administrador") {
        const numberOfPilots = (
          (await prismaClient.$queryRaw`SELECT COUNT(*) as "count" FROM driver;`) as any
        )[0].count;
        const numberOfTeams = (
          (await prismaClient.$queryRaw`SELECT COUNT(*) as "count" FROM constructors;`) as any
        )[0].count;
        const numberOfRaces = (
          (await prismaClient.$queryRaw`SELECT COUNT(*) as "count" FROM races;`) as any
        )[0].count;
        const numberOfSeasons = (
          (await prismaClient.$queryRaw`SELECT COUNT(*) as "count" FROM seasons;`) as any
        )[0].count;

        return res.status(200).json({
          fields: [
            { name: "pilotos cadastrados", value: Number(numberOfPilots) },
            { name: "escuderias cadastradas", value: Number(numberOfTeams) },
            { name: "corridas cadastradas", value: Number(numberOfRaces) },
            { name: "temporadas cadastradas", value: Number(numberOfSeasons) },
          ],
        });
      }

      if (type === "Piloto") {
        const query: any[] =
          await prismaClient.$queryRaw`SELECT idoriginal FROM users WHERE login = ${login} AND tipo = 'Piloto'`;

        if (query.length > 1 || query.length < 0) {
          return res
            .status(500)
            .json({ msg: "Não foi possível achar o piloto" });
        }

        const queryResult = query[0];
        const idoriginal = queryResult.idoriginal;

        const numberOfVictories = (
          (await prismaClient.$queryRaw`SELECT COUNT(*) as "count" FROM results WHERE driverid = ${idoriginal} AND position = 1;`) as any
        )[0].count;
        const years = (
          (await prismaClient.$queryRaw`SELECT MAX(ra."year") AS last_year, MIN(ra."year") AS first_year FROM results re INNER JOIN races ra ON ra.raceid = re.raceid  WHERE driverid = ${idoriginal};`) as any
        )[0];

        return res.status(200).json({
          fields: [
            { name: "vitórias", value: Number(numberOfVictories) },
            { name: `${years.first_year} - ${years.last_year}`, value: "Anos ativos: " },
          ],
        });
      }

      if (type === "Escuderia") {
        const query: any[] =
          await prismaClient.$queryRaw`SELECT idoriginal FROM users WHERE login = ${login} AND tipo = 'Escuderia'`;

        if (query.length > 1 || query.length < 0) {
          return res
            .status(500)
            .json({ msg: "Não foi possível achar o piloto" });
        }

        const queryResult = query[0];
        const idoriginal = queryResult.idoriginal;

        const numberOfVictories = (
          (await prismaClient.$queryRaw`SELECT COUNT(*) as "count" FROM results WHERE constructorid = ${idoriginal} AND position = 1;`) as any
        )[0].count;
        const years = (
          (await prismaClient.$queryRaw`SELECT MAX(ra."year") AS last_year, MIN(ra."year") AS first_year FROM results re INNER JOIN races ra ON ra.raceid = re.raceid  WHERE constructorid = ${idoriginal};`) as any
        )[0];

        return res.status(200).json({
          fields: [
            { name: "vitórias", value: Number(numberOfVictories) },
            { name: `${years.first_year} - ${years.last_year}`, value: "Anos ativos: " },
          ],
        });
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
