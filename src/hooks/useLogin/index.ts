import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginState/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { IOnLoginRequest } from "./type";
import { useRecoilState } from "recoil";
import loginState from "@atoms/loginState";

const useLogin = () => {
  const [{ isLoggedIn, email }, setLoginState] = useRecoilState(loginState);

  const onLogin = ({ authToken }: IOnLoginRequest) => {
    try {
      const { email } = jwtDecode<IAuthTokenPayload>(authToken);
      localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
      setLoginState({
        isLoggedIn: true,
        authToken,
        email,
      });
    } catch (error) {
      console.error(error);
      alert("로그인 오류입니다.");
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCAL_AUTH_TOKEN);
    setLoginState({
      isLoggedIn: false,
      authToken: "",
      email: "",
    });
  };

  return { isLoggedIn, email, onLogin, onLogout };
};

export default useLogin;
