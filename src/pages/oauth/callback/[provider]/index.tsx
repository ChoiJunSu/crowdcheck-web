import { useRouter } from "next/router";
import { useEffect } from "react";
import OauthApi from "@api/OauthApi";
import { IOauthLoginRequest } from "@api/OauthApi/type";
import { useRecoilState, useSetRecoilState } from "recoil";
import loginState from "@atoms/loginState";

const OauthCallbackPage = () => {
  const router = useRouter();
  const { provider, code } = router.query;
  const redirectUri = `http://localhost:3000/oauth/callback/${provider}`;
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
            const { token, email } = oauthLoginResponse;
            localStorage.setItem("token", token);
            setLoginState({
              isLoggedIn: true,
              token,
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
