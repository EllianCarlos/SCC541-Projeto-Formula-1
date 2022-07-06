import Header from "@/components/header";
import Login from "@/components/login";
import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";

const Overview: NextPage = () => {
  const handleLogin = (e: any) => {
  }


  return (
    <>
      <Header></Header>
      <Login></Login>
    </>
  );
};

export default Overview;

export async function getStaticProps(_context: any) {
  let prismaClient = prisma as PrismaClient;
  const data = await prismaClient.$queryRaw`SELECT * FROM circuits`;


  return {
    props: { data }
  }
}