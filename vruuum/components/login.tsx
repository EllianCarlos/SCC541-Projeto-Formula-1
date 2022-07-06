import { FC } from "react";
import styles from "../styles/Login.module.css";

const Login: FC<any> = () => {
  return (
    <center>
      <br />
      <main className={styles.container}>
        <form action="">
          <input type="text" name="Login" id="Login" placeholder="Login" />
          <input type="text" name="Senha" id="Senha" placeholder="Senha" />
          <br />
          <button type="submit">Enviar</button>
        </form>
      </main>
      <br />
    </center>
  );
};

export default Login;
