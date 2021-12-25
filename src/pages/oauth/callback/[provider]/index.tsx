import { useRouter } from "next/router";
import { useEffect } from "react";
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
        }
      })();
    }
  });
  return <div>{code}</div>;
};

export default OauthCallbackPage;
