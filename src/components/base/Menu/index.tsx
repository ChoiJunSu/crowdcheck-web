import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginAtom);

  const items = [
    {
      text: "의뢰 목록",
      onClick: () => {
        navigate("/request/list");
      },
    },
    {
      text: "의뢰 등록",
      onClick: () => {
        navigate("/request/register");
      },
    },
    {
      text: "로그아웃",
      onClick: () => {
        setLoginState({
          isLoggedIn: false,
          authToken: "",
          email: "",
        });
        localStorage.removeItem(LOCAL_AUTH_TOKEN);
        navigate("/");
      },
    },
  ];

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      {isOpen &&
        items.map((item, index) => (
          <div>
            <button key={index} onClick={item.onClick}>
              {item.text}
            </button>
          </div>
        ))}
      {isOpen ? (
        <button onClick={handleClose}>X</button>
      ) : (
        <button onClick={handleOpen}>메뉴</button>
      )}
    </div>
  );
};
export default Menu;
