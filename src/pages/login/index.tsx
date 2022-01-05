import OauthLoginButton from "@components/login/OauthLoginButton";
import { Link } from "react-router-dom";
import CorporateLoginForm from "@components/login/corporate/CorporateLoginForm";

const LoginPage = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <h2>개인회원</h2>
      <OauthLoginButton provider={"google"} />
      <OauthLoginButton provider={"kakao"} />
      <h2>기업회원</h2>
      <CorporateLoginForm />
      <Link to="/register/corporate">기업회원으로 가입하기</Link>
    </div>
  );
};

export default LoginPage;
