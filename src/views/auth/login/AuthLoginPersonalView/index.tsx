import LoginForm from "@components/auth/login/LoginForm";
import { Link } from "react-router-dom";
import { OAUTH_CLIENT_ID, OAUTH_URL } from "@constants/oauth";
import { WEB_URL } from "@constants/url";

const AuthLoginPersonalView = () => {
  const oauthLoginButtons = [
    {
      text: "구글로 시작하기",
      link: `${OAUTH_URL.GOOGLE}?response_type=code&client_id=${OAUTH_CLIENT_ID.GOOGLE}&redirect_uri=${WEB_URL}/auth/login/oauth/callback/google&scope=https://www.googleapis.com/auth/userinfo.email`,
    },
    {
      text: "카카오로 시작하기",
      link: `${OAUTH_URL.KAKAO}?response_type=code&client_id=${OAUTH_CLIENT_ID.KAKAO}&redirect_uri=${WEB_URL}/auth/login/oauth/callback/kakao`,
    },
  ];

  return (
    <div>
      <LoginForm type={"personal"} />
      {oauthLoginButtons.map(({ text, link }, index) => (
        <div key={index}>
          <Link to={link}>{text}</Link>
        </div>
      ))}
      <Link to="/auth/register/personal">이메일로 가입하기</Link>
    </div>
  );
};

export default AuthLoginPersonalView;
