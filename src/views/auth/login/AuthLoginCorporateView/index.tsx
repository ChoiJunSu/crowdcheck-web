import LoginForm from "@components/auth/login/LoginForm";
import { Link } from "react-router-dom";

const AuthLoginCorporateView = () => {
  return (
    <div>
      <LoginForm type={"corporate"} />
      <Link to="/auth/register/corporate">기업회원으로 가입하기</Link>
    </div>
  );
};

export default AuthLoginCorporateView;
