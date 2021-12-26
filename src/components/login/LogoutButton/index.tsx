import React from "react";
import useLogin from "@hooks/useLogin";

const LogoutButton = () => {
  const { onLogout } = useLogin();

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
};

export default LogoutButton;
