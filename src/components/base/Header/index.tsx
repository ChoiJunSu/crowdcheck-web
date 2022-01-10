import { Link } from "react-router-dom";
import Menu from "@components/base/Menu";

const Header = () => {
  return (
    <div className="flex">
      <div className="flex-none">
        <Link to="/">CrowdCheck</Link>
      </div>
      <div className="flex-none">
        <Menu />
      </div>
    </div>
  );
};

export default Header;
