import { Link } from "react-router-dom";
import Menu from "@components/base/Menu";
import { useRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import AuthApi from "@api/AuthApi";

const Header = () => {
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  const { isLoggedIn } = loginState;
  const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);

  useEffect(() => {
    if (isLoggedIn || authToken === null || authToken === "undefined") return;
    try {
      (async () => {
        const { name, type, exp } = await jwtDecode<IAuthTokenPayload>(
          authToken
        );
        if (exp && Date.now() <= exp * 1000) {
          setLoginState({
            isLoggedIn: true,
            authToken,
            name,
            type,
          });
          if (exp * 1000 - Date.now() < 100000 * 60 * 1000) {
            const tokenRenewResponse = await AuthApi.tokenRenew();
            if (!tokenRenewResponse.ok) return;
            const { authToken } = tokenRenewResponse;
            setLoginState({
              isLoggedIn: true,
              authToken,
              name,
              type,
            });
            localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
          }
        }
      })();
    } catch (e) {}
  }, []);

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
