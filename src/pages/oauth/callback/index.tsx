import React from "react";
import { useEffect } from "react";
import OauthApi from "@api/OauthApi";
import { IOauthLoginRequest } from "@api/OauthApi/type";
import { WEB_URL } from "@constants/url";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IOauthCallbackPageProps } from "@pages/oauth/callback/type";
import useLogin from "@hooks/useLogin";

const OauthCallbackPage = ({ provider }: IOauthCallbackPageProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = `${WEB_URL}/oauth/callback/${provider}`;
  const { onLogin } = useLogin();

  useEffect(() => {
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
          const { authToken } = oauthLoginResponse;
          onLogin({ authToken });
          navigate("/");
        }
      }
    })();
  }, []);

  return <div>로그인중...</div>;
};

export default OauthCallbackPage;
