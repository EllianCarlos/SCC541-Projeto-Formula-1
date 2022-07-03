import { FC } from "react";

const OverviewInfo: FC<void> = () => {
  return (
    <ul>
      <li>
        <b>42</b> pilotos cadastrados
      </li>
      <li>
        <b>10</b> escuderias cadastradas
      </li>
      <li>
        <b>9</b> corridas cadastradas
      </li>
      <li>
        <b>6</b> temporadas cadastradas
      </li>
    </ul>
  );
};

export default OverviewInfo;
