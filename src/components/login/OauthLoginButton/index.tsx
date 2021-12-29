import React from "react";
import { IOauthLoginButtonProps } from "@components/login/OauthLoginButton/type";
import { WEB_URL } from "@constants/url";
import { OAUTH_CLIENT_ID, OAUTH_URL } from "@constants/oauth";

const OauthLoginButton = ({ provider }: IOauthLoginButtonProps) => {
  const buttonText = {
    google: "구글로 로그인",
    kakao: "카카오로 로그인",
  };

  const handleLogin = async () => {
    switch (provider) {
      case "google":
        window.location.href = `${OAUTH_URL.KAKAO}?response_type=code&client_id=${OAUTH_CLIENT_ID.KAKAO}&redirect_uri=${WEB_URL}/oauth/callback/kakao`;
        break;
      case "kakao":
        window.location.href = `${OAUTH_URL.GOOGLE}?response_type=code&client_id=${OAUTH_CLIENT_ID.GOOGLE}&redirect_uri=${WEB_URL}/oauth/callback/google&scope=https://www.googleapis.com/auth/userinfo.email`;
        break;
      default:
        throw new Error("Invalid provider");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>{buttonText[provider]}</button>
    </div>
  );
};

export default OauthLoginButton;