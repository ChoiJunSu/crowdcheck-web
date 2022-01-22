import { useCallback, useState } from "react";
import { TUserType } from "@api/UserApi/type";
import AuthLoginPersonalView from "@views/auth/login/AuthLoginPersonalView";
import AuthLoginCorporateView from "@views/auth/login/AuthLoginCorporateView";

const LoginPage = () => {
  const [type, setType] = useState<TUserType>("personal");

  const handleChangeType = useCallback((to: TUserType) => {
    setType(to);
  }, []);

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={() => handleChangeType("personal")}>개인회원</button>
      <button onClick={() => handleChangeType("corporate")}>기업회원</button>
      {type === "personal" && <AuthLoginPersonalView />}
      {type === "corporate" && <AuthLoginCorporateView />}
    </div>
  );
};

export default LoginPage;
