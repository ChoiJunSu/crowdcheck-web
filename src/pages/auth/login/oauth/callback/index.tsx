import { useEffect } from "react";
import AuthApi from "@api/AuthApi";
import { WEB_URL } from "@constants/url";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ILoginOauthCallbackPageProps } from "@pages/auth/login/oauth/callback/type";
import { ILoginOauthRequest } from "@api/AuthApi/type";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const LoginOauthCallbackPage = ({ provider }: ILoginOauthCallbackPageProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = `${WEB_URL}/auth/login/oauth/callback/${provider}`;
  const setLoginState = useSetRecoilState(loginAtom);

  useEffect(() => {
    (async () => {
      if (provider && code) {
        const loginOauthResponse = await AuthApi.loginOauth({
          provider,
          code,
          redirectUri,
        } as ILoginOauthRequest);
        if (!loginOauthResponse.ok) {
          alert(loginOauthResponse.error || "로그인 오류입니다.");
        } else {
          const { authToken } = loginOauthResponse;
          try {
            const { name } = jwtDecode(authToken) as IAuthTokenPayload;
            setLoginState({
              isLoggedIn: true,
              authToken,
              name,
            });
            localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
          } catch (e) {
            console.error(e);
            alert("로그인 오류입니다.");
          }
        }
        navigate("/");
      }
    })();
  }, []);

  return <div>로그인 중...</div>;
};

export default LoginOauthCallbackPage;
