import LoginOauthButton from "@components/auth/login/oauth/LoginOauthButton";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { TUserType } from "@api/UserApi/type";
import LoginForm from "@components/auth/login/LoginForm";

const LoginPage = () => {
  const [type, setType] = useState<TUserType>("personal");

  const handleChangeType = useCallback((to: TUserType) => {
    setType(to);
  }, []);

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button
        onClick={() => {
          handleChangeType("personal");
        }}
      >
        개인회원
      </button>
      <button
        onClick={() => {
          handleChangeType("corporate");
        }}
      >
        기업회원
      </button>
      {type === "personal" && (
        <div>
          <LoginForm type={"personal"} />
          <LoginOauthButton provider={"google"} />
          <LoginOauthButton provider={"kakao"} />
        </div>
      )}
      {type === "corporate" && (
        <div>
          <LoginForm type={"corporate"} />
          <Link to="/register/corporate">기업회원으로 가입하기</Link>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
