import type { NextPage } from "next";
import Header from "@/components/header";
import Overview from "@/pages/overview";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

const Home: NextPage = () => {  
  return (
    <div>
      <Header></Header>
      {/* <Login></Login> */}
      <Overview></Overview>
    </div>
  );
};

export default Home;

// Exemplo de como fazer as queries no banco
export async function getStaticProps(_context: any) {
  let prismaClient = prisma as PrismaClient;
  const data = await prismaClient.$queryRaw`SELECT * FROM circuits`;


  return {
    props: { data }
  }
}