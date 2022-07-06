import { FC, MouseEventHandler } from "react";
import { useRouter } from "next/router";

const HomeButton: FC<any> = () => {
  const router = useRouter();

  const handleClick = (e: MouseEventHandler<HTMLButtonElement>) => {
    router.push("/");
  };
  
  return <button type="submit" onClick={handleClick}>Voltar para o Inicio</button>;
};

export default HomeButton;
