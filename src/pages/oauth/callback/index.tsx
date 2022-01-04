import { useEffect } from "react";
import AuthApi from "@api/AuthApi";
import { WEB_URL } from "@constants/url";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IOauthCallbackPageProps } from "@pages/oauth/callback/type";
import { IOauthLoginRequest } from "@api/AuthApi/type";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const OauthCallbackPage = ({ provider }: IOauthCallbackPageProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = `${WEB_URL}/oauth/callback/${provider}`;
  const setLoginState = useSetRecoilState(loginAtom);

  useEffect(() => {
    (async () => {
      if (provider && code) {
        const oauthLoginResponse = await AuthApi.oauthLogin({
          provider,
          code,
          redirectUri,
        } as IOauthLoginRequest);
        if (!oauthLoginResponse.ok) {
          alert("로그인 오류입니다.");
        } else {
          const { authToken } = oauthLoginResponse.data;
          try {
            const { email } = jwtDecode(authToken) as IAuthTokenPayload;
            setLoginState({
              isLoggedIn: true,
              authToken,
              email,
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

export default OauthCallbackPage;
