import type { FC, MouseEventHandler } from "react";
import { useRouter } from "next/router";

const UserActions: FC<void> = () => {
  const router = useRouter();

  const registerTeamHandler = (e: any) => {
    router.push('register-team');
  };

  const registerPilotHandler = (e: any) => {
    router.push('register-pilot');
  };

  const getPilotHandler = (e: any) => {
    router.push('get-pilot');
  };

  return (
    <article>
      <hr></hr>
      <h2>Ações permitidas</h2>
      <h3>Cadastros: </h3>
      <center>
        <button type="submit" onClick={registerTeamHandler} >Cadastrar Escuderia</button>
        <button type="submit" onClick={registerPilotHandler}>Cadastrar Piloto</button>
        <button type="submit">Consultar Piloto</button>
      </center>
      <h3>Geração de Relatórios: </h3>
      <center>
        <button type="submit">Gerar Relatório de Status</button>
        <button type="submit">Gerar Relatório de Aeroportos por Cidade</button>
      </center>
    </article>
  );
};

export default UserActions;
