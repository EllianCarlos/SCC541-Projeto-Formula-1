import type { FC } from "react";

const UserActions: FC<void> = () => {
  return (
    <article>
      <hr></hr>
      <h2>Ações permitidas</h2>
      <h3>Cadastros: </h3>
      <center>
        <button type="submit">Cadastrar Escuderia</button>
        <button type="submit">Cadastrar Piloto</button>
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
