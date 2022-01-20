import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { useRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";

const Menu = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  const { isLoggedIn } = loginState;
  const [items, setItems] = useState<{ text: string; onClick: () => void }[]>(
    []
  );

  useEffect(() => {
    if (isLoggedIn) {
      setItems([
        { text: "의뢰 목록", onClick: () => navigate("/request/list") },
        { text: "의뢰 등록", onClick: () => navigate("/request/register") },
        { text: "정보 수정", onClick: () => navigate("/user/edit") },
        {
          text: "로그아웃",
          onClick: () => {
            setLoginState({
              isLoggedIn: false,
              authToken: null,
              name: null,
              type: null,
            });
            localStorage.removeItem(LOCAL_AUTH_TOKEN);
            navigate("/");
          },
        },
      ]);
    } else {
      setItems([
        {
          text: "로그인",
          onClick: () => navigate("/auth/login"),
        },
      ]);
    }
  }, [isLoggedIn]);

  return (
    <div>
      {items.map((item, index) => (
        <button key={index} onClick={item.onClick}>
          {item.text}
        </button>
      ))}
    </div>
  );
};
export default Menu;
