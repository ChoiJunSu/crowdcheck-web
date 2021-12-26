import { IOauthLoginButtonProps } from "@components/login/OauthLoginButton/type";
import { WEB_URL } from "@constants/url";
import { OAUTH_CLIENT_ID, OAUTH_URL } from "@constants/oauth";
import { useRouter } from "next/router";

const OauthLoginButton = ({ provider }: IOauthLoginButtonProps) => {
  const router = useRouter();

  const buttonText = {
    google: "구글로 로그인",
    kakao: "카카오로 로그인",
  };

  const handleLogin = async () => {
    switch (provider) {
      case "google":
        await router.push(
          `${OAUTH_URL.KAKAO}?response_type=code&client_id=${OAUTH_CLIENT_ID.KAKAO}&redirect_uri=${WEB_URL}/oauth/callback/kakao`
        );
        break;
      case "kakao":
        await router.push(
          `${OAUTH_URL.GOOGLE}?response_type=code&client_id=${OAUTH_CLIENT_ID.GOOGLE}&redirect_uri=${WEB_URL}/oauth/callback/google&scope=https://www.googleapis.com/auth/userinfo.email`
        );
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
