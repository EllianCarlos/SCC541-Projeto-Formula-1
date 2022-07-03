import {
  PrismaClient
} from "@prisma/client";

let prisma: any;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:postgres@localhost:5432/postgres?schema=public",
      },
    },
  });
} else {
  if (!(global.prisma)) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;