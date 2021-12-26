import { useSetRecoilState } from "recoil";
import loginState from "@atoms/loginState";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const LogoutButton = () => {
  const setLoginState = useSetRecoilState(loginState);
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_AUTH_TOKEN);
    setLoginState({
      isLoggedIn: false,
      authToken: "",
      email: "",
    });
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LogoutButton;
