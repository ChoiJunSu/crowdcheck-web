import OauthLoginButton from "@components/login/OauthLoginButton";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <OauthLoginButton provider={"google"} />
      <OauthLoginButton provider={"kakao"} />
      <Link to="/login/corporate">기업회원</Link>
    </div>
  );
};

export default LoginPage;
