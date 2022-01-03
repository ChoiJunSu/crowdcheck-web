import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const LogoutButton = () => {
  const setLoginState = useSetRecoilState(loginAtom);

  const handleLogout = useCallback(() => {
    setLoginState({
      isLoggedIn: false,
      authToken: "",
      email: "",
    });
    localStorage.removeItem(LOCAL_AUTH_TOKEN);
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LogoutButton;
