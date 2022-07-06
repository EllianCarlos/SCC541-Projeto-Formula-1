import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const OverviewInfo: FC<void> = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [tipo, setTipo] = useState("tipo");
  const [username, setUsername] = useState("username");
  const [fields, setFields] = useState("fields");
  useEffect(() => setTipo(cookies.user_type), [cookies.user_type]);
  useEffect(() => setUsername(cookies.username), [cookies.username]);

  useEffect(() => {
    const data = {
      login: username,
      type: tipo,
    };
    const endpoint = "/api/get-overview?" + new URLSearchParams(data);

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, options).then(async (response) => {
      if (response.ok) {
        const responseFields = (await response.json()).fields;
        setFields(responseFields.map((field: any) => {
          return (
            <li key={field.name}>
              <b>{field.value}</b> {field.name}
            </li>
          );
        }));
      }
    });
  }, [tipo, username]);

  if (tipo === null || tipo === undefined) {
    console.log("redirecting to home");
    router.push("/");
  }

  return <ul>{fields}</ul>;
};

export default OverviewInfo;
