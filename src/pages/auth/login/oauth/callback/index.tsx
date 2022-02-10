import { useEffect } from "react";
import AuthApi from "@api/AuthApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ILoginOauthCallbackPageProps } from "@pages/auth/login/oauth/callback/type";
import { IAuthLoginOauthRequest } from "@api/AuthApi/type";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const LoginOauthCallbackPage = ({ provider }: ILoginOauthCallbackPageProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  if (!code || !provider) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }
  const redirectUri = `${process.env.REACT_APP_WEB_URL}/auth/login/oauth/callback/${provider}`;
  const setLoginState = useSetRecoilState(loginAtom);

  useEffect(() => {
    (async () => {
      const loginOauthResponse = await AuthApi.loginOauth({
        provider,
        code,
        redirectUri,
      } as IAuthLoginOauthRequest);
      if (!loginOauthResponse.ok) {
        alert(loginOauthResponse.error || "로그인 오류입니다.");
        if (loginOauthResponse.error === "회원가입이 필요합니다.")
          navigate(
            `/auth/register/oauth?registerToken=${loginOauthResponse.registerToken}`
          );
        else navigate(-1);

        return;
      }
      const { authToken } = loginOauthResponse;
      try {
        const { name, type } = jwtDecode(authToken) as IAuthTokenPayload;
        setLoginState({
          isLoggedIn: true,
          authToken,
          name,
          type,
        });
        localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
      } catch (e) {
        alert("로그인 오류입니다.");
      }
      navigate("/");
    })();
  }, []);

  return <div>로그인 중...</div>;
};

export default LoginOauthCallbackPage;
