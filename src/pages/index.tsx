import React from "react";
import LogoutButton from "@components/login/LogoutButton";
import { Link } from "react-router-dom";
import useLogin from "@hooks/useLogin";

const IndexPage = () => {
  const { isLoggedIn, email } = useLogin();
  return isLoggedIn ? (
    <div>
      <h1>어서오세요 {email}님</h1>
      <LogoutButton />
    </div>
  ) : (
    <div>
      <h1>로그인이 필요합니다</h1>
      <Link to="/login">로그인 하러가기</Link>
    </div>
  );
};

export default IndexPage;
