import { useRouter } from "next/router";
import { useEffect } from "react";
import OauthApi from "@api/OauthApi";
import { IOauthLoginRequest } from "@api/OauthApi/type";
import { useSetRecoilState } from "recoil";
import loginState from "@atoms/loginState";
import { WEB_URL } from "@constants/url";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const OauthCallbackPage = () => {
  const router = useRouter();
  const { provider, code } = router.query;
  const redirectUri = `${WEB_URL}/oauth/callback/${provider}`;
  const setLoginState = useSetRecoilState(loginState);
  useEffect(() => {
    if (router.asPath !== router.route) {
      (async () => {
        if (provider && code) {
          const oauthLoginResponse = await OauthApi.oauthLogin({
            provider,
            code,
            redirectUri,
          } as IOauthLoginRequest);
          if (!oauthLoginResponse.ok) {
            alert("로그인 오류입니다.");
          } else {
            const { authToken, email } = oauthLoginResponse;
            localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
            setLoginState({
              isLoggedIn: true,
              authToken,
              email,
            });
          }
          await router.push("/");
        }
      })();
    }
  });

  return <div>로그인중...</div>;
};

export default OauthCallbackPage;
