import { useEffect } from "react";
import { useRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import AuthApi from "@api/AuthApi";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const IndexPage = () => {
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  const { isLoggedIn, name } = loginState;
  const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);

  useEffect(() => {
    if (!isLoggedIn && authToken !== null) {
      try {
        (async () => {
          const { name, exp } = await jwtDecode<IAuthTokenPayload>(authToken);
          if (exp && Date.now() <= exp * 1000) {
            setLoginState({
              isLoggedIn: true,
              authToken,
              name,
            });
            if (exp * 1000 - Date.now() < 10 * 60 * 1000) {
              const tokenRenewResponse = await AuthApi.tokenRenew();
              if (tokenRenewResponse.ok) {
                setLoginState({
                  isLoggedIn: true,
                  authToken: tokenRenewResponse.authToken,
                  name,
                });
                localStorage.setItem(
                  LOCAL_AUTH_TOKEN,
                  tokenRenewResponse.authToken
                );
              }
            }
          }
        })();
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return isLoggedIn ? (
    <div>
      <h1>어서오세요 {name}님</h1>
    </div>
  ) : (
    <div>
      <h1>로그인이 필요합니다</h1>
    </div>
  );
};

export default IndexPage;
