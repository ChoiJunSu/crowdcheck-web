import { IOauthLoginButtonProps } from "@components/login/OauthLoginButton/type";
import { WEB_URL } from "@constants/url";
import { OAUTH_CLIENT_ID, OAUTH_URL } from "@constants/oauth";
import { Link } from "react-router-dom";

const OauthLoginButton = ({ provider }: IOauthLoginButtonProps) => {
  const oauthLoginButtonProps = {
    google: {
      text: "구글로 시작하기",
      link: `${OAUTH_URL.KAKAO}?response_type=code&client_id=${OAUTH_CLIENT_ID.KAKAO}&redirect_uri=${WEB_URL}/oauth/callback/kakao`,
    },
    kakao: {
      text: "카카오로 시작하기",
      link: `${OAUTH_URL.GOOGLE}?response_type=code&client_id=${OAUTH_CLIENT_ID.GOOGLE}&redirect_uri=${WEB_URL}/oauth/callback/google&scope=https://www.googleapis.com/auth/userinfo.email`,
    },
  };

  return (
    <div>
      <Link to={oauthLoginButtonProps[provider].link}>
        {oauthLoginButtonProps[provider].text}
      </Link>
    </div>
  );
};

export default OauthLoginButton;
