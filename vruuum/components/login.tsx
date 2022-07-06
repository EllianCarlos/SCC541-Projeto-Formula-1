import { FC } from "react";
import styles from "../styles/Login.module.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Login: FC<any> = () => {
  const [cookie, setCookie] = useCookies(["user_type", "username"]);
  const router = useRouter();

  // Handles the submit event on form submit.
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      login: event.target.login.value,
      password: event.target.password.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      return;
    }

    const result = await response.json();

    setCookie("user_type", result.type, {
      path: "/",
      maxAge: 3600,
      sameSite: false,
    });

    setCookie("username", event.target.login.value, {
      path: "/",
      maxAge: 3600,
      sameSite: false,
    });

    await router.push('overview');
  };

  return (
    <center>
      <br />
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="login" id="Login" placeholder="Login" />
          <input type="password" name="password" id="Senha" placeholder="Senha" />
          <br />
          <button type="submit">Enviar</button>
        </form>
      </main>
      <br />
    </center>
  );
};

export default Login;
