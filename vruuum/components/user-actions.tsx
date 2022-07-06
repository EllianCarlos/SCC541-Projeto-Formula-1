import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { tipos } from "@/lib/tipos";

const UserActions: FC<void> = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [tipo, setTipo] = useState("tipo");
  const [username, setUsername] = useState("username");

  useEffect(() => setTipo(cookies.user_type), [cookies.user_type]);
  useEffect(() => setUsername(cookies.username), [cookies.username]);

  if (tipo === null || tipo === undefined) {
    console.log("redirecting to home");
    router.push("/");
  }

  const registerTeamHandler = (e: any) => {
    router.push("register-team");
  };

  const registerPilotHandler = (e: any) => {
    router.push("register-pilot");
  };

  const getByForename = (e: any) => {
    router.push("get-by-forename");
  };

  let buttons;
  if (tipo === tipos.ADMINISTRADOR) {
    buttons = (
      <>
        <button type="submit" onClick={registerTeamHandler}>
          Cadastrar Escuderia
        </button>
        <button type="submit" onClick={registerPilotHandler}>
          Cadastrar Piloto
        </button>
      </>
    );
  }

  if (tipo === tipos.ESCUDERIA) {
    buttons = (
      <>
        <button type="submit" onClick={getByForename}>
          Consultar por Forename
        </button>
      </>
    );
  }

  if (tipo === tipos.PILOTO) {
    buttons = <></>;
  }

  const generateStatusReport = (e: any) => {
    router.push("status-report");
  };

  const generateAirportReport = (e: any) => {
    router.push("airport-report");
  };

  let reports;
  if (tipo === tipos.ADMINISTRADOR) {
    reports = (
      <>
      <button type="submit" onClick={generateStatusReport}>Gerar Relatório de Status</button>
      <button type="submit" onClick={generateAirportReport}>Gerar Relatório de Aeroportos por Cidade</button>
      </>
    );
  }

  if (tipo === tipos.ESCUDERIA) {
    reports = (
      <>
      <button type="submit" onClick={registerTeamHandler}>
        Gerar Relatório de seus pilotos
      </button>
        <button type="submit" onClick={registerTeamHandler}>
          Gerar Relatório de seus status
        </button>
      </>
    );
  }

  if (tipo === tipos.PILOTO) {
    reports = (
      <>
      <button type="submit" onClick={registerTeamHandler}>
        Gerar Relatório de vitórias
      </button>
        <button type="submit" onClick={registerTeamHandler}>
          Gerar Relatório de seus status
        </button>
      </>
    );
  }

  return (
    <article>
      <hr></hr>
      <h2>Ações permitidas</h2>
      <h3>Cadastros e Consultas: </h3>
      <center>{buttons}</center>
      <h3>Geração de Relatórios: </h3>
      <center>
        {reports}
      </center>
    </article>
  );
};

export default UserActions;
