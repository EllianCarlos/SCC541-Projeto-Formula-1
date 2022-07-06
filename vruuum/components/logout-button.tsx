import { FC, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const LogoutButton: FC<any> = () => {
  const router = useRouter();
  const [_cookie, _setCookie, removeCookie] = useCookies();
  const handleClick = (e: any) => {
    e.preventDefault();
    removeCookie("user_type");
    removeCookie("username");
    router.push("/");
  };

  return (
    <button type="submit" onClick={handleClick}>
      Fazer Logout
    </button>
  );
};

export default LogoutButton;
