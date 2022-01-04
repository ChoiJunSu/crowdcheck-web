import CorporateLoginForm from "@components/login/corporate/CorporateLoginForm";
import { Link } from "react-router-dom";

const CorporateLoginPage = () => {
  return (
    <div>
      <h1>기업회원 로그인</h1>
      <CorporateLoginForm />
      <Link to="/register/corporate">기업회원 가입</Link>
    </div>
  );
};

export default CorporateLoginPage;
