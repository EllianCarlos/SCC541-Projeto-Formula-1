import type { NextPage } from "next";
import Header from "../components/header";
import Overview from "./overview";

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
