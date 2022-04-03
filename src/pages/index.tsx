import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import IndexPublicView from "@views/index/IndexPublicView";
import { useNavigate } from "react-router-dom";
import { menuItems } from "@components/base/Header/menu";
import { useEffect } from "react";

const IndexPage = () => {
  const { isLoggedIn, type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && type) {
      navigate(menuItems[type][0].to);
    }
  }, []);

  return <IndexPublicView />;
};

export default IndexPage;
