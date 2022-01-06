import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { Link } from "react-router-dom";
import Menu from "@components/base/Menu";

const Header = () => {
  const { isLoggedIn } = useRecoilValue(loginAtom);

  return (
    <div>
      <Link to="/">CrowdCheck</Link>
      {isLoggedIn ? <Menu /> : <Link to="/login">로그인</Link>}
    </div>
  );
};

export default Header;
