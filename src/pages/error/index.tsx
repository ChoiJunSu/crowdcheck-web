import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>잘못된 접근입니다</h1>
      <Link to={"/"}>홈으로 돌아가기</Link>
    </div>
  );
};

export default ErrorPage;
