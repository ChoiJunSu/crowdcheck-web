import { ILoginOauthButtonProps } from "@components/auth/login/oauth/LoginOauthButton/type";
import { WEB_URL } from "@constants/url";
import { OAUTH_CLIENT_ID, OAUTH_URL } from "@constants/oauth";

const LoginOauthButton = ({ provider }: ILoginOauthButtonProps) => {
  const loginOauthButtonProps = {
    google: {
      text: "구글로 시작하기",
      link: `${OAUTH_URL.GOOGLE}?response_type=code&client_id=${OAUTH_CLIENT_ID.GOOGLE}&redirect_uri=${WEB_URL}/auth/login/oauth/callback/google&scope=https://www.googleapis.com/auth/userinfo.email`,
    },
    kakao: {
      text: "카카오로 시작하기",
      link: `${OAUTH_URL.KAKAO}?response_type=code&client_id=${OAUTH_CLIENT_ID.KAKAO}&redirect_uri=${WEB_URL}/auth/login/oauth/callback/kakao`,
    },
  };

  return (
    <div>
      <a href={loginOauthButtonProps[provider].link}>
        {loginOauthButtonProps[provider].text}
      </a>
    </div>
  );
};

export default LoginOauthButton;
