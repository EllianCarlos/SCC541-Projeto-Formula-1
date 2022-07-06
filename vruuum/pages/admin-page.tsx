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