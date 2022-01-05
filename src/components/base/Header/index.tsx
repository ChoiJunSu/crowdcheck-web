import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { Link } from "react-router-dom";
import LogoutButton from "@components/login/LogoutButton";

const Header = () => {
  const { isLoggedIn } = useRecoilValue(loginAtom);

  return (
    <div>
      <Link to="/">
        <h1>CrowdCheck</h1>
      </Link>
      {isLoggedIn ? <LogoutButton /> : <Link to="/login">로그인</Link>}
    </div>
  );
};

export default Header;
