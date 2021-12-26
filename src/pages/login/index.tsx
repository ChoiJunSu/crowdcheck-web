import React from "react";
import OauthLoginButton from "@components/login/OauthLoginButton";

const LoginPage = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <OauthLoginButton provider={"google"} />
      <OauthLoginButton provider={"kakao"} />
    </div>
  );
};

export default LoginPage;
