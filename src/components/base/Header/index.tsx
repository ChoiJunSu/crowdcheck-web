import { useEffect } from "react";
import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import AuthApi from "@api/AuthApi";
import HeaderMenu from "@components/base/Header/menu";
import { ReactComponent as HeaderLogo } from "@assets/images/logo.svg";

const Header = () => {
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  const { isLoggedIn, type } = loginState;
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
    <Popover className="block bg-white">
      <div className="w-full">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <HeaderLogo className="h-6 w-auto sm:h-8" />
            </Link>
          </div>
          {isLoggedIn && type ? (
            <HeaderMenu type={type} />
          ) : (
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link
                to="/guide"
                className="text-sm sm:text-lg lg:text-xl font-medium text-gray-500 hover:text-cc-green"
              >
                가이드
              </Link>
              <Link
                to="/auth/login"
                className="whitespace-nowrap inline-flex items-center justify-center px-2 md:px-4 py-1 md:py-2 border border-transparent rounded-md shadow-sm text-sm sm:text-lg lg:text-xl font-medium text-white bg-cc-green hover:bg-cc-green-dark"
              >
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default Header;
