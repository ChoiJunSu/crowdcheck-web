import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@states/loginState/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { IOnLoginRequest } from "./type";
import { useRecoilState } from "recoil";
import loginState from "@states/loginState";
import { useCallback } from "react";

const useLogin = () => {
  const [{ isLoggedIn, email, authToken }, setLoginState] =
    useRecoilState(loginState);

  const onLogin = useCallback(
    ({ authToken }: IOnLoginRequest) => {
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
    },
    [setLoginState]
  );

  const onLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_AUTH_TOKEN);
    setLoginState({
      isLoggedIn: false,
      authToken: "",
      email: "",
    });
  }, [setLoginState]);

  return { isLoggedIn, email, authToken, onLogin, onLogout };
};

export default useLogin;
