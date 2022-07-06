import Header from "@/components/header";
import Login from "@/components/login";
import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";

const Overview: NextPage = () => {
  return (
    <>
      <Header></Header>
      <Login></Login>
    </>
  );
};

export default Overview;
