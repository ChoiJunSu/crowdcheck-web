import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OauthApi from "@api/OauthApi";
import { oauthLoginRequestDto } from "@api/OauthApi/type";

const OauthCallbackPage = () => {
  const router = useRouter();
  const { provider, code } = router.query;
  const redirectUri = `http://localhost:3000/oauth/callback/${provider}`;
  useEffect(() => {
    if (router.asPath !== router.route) {
      (async () => {
        if (provider && code) {
          const oauthLoginResponse = await OauthApi.oauthLogin({
            provider,
            code,
            redirectUri,
          } as oauthLoginRequestDto);
          console.log(oauthLoginResponse);
          if (!oauthLoginResponse.ok) {
            alert("로그인 오류입니다.");
          }
          await router.push("/");
        }
      })();
    }
  });
  return <div>로그인중...</div>;
};

export default OauthCallbackPage;
