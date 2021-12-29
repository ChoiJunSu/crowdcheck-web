import { atom } from "recoil";
import { IAuthTokenPayload, ILoginState } from "@states/loginState/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import jwtDecode from "jwt-decode";
import AuthApi from "@api/AuthApi";

const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);
const initialLoginState: ILoginState = {
  isLoggedIn: false,
  authToken: "",
  email: "",
};
if (authToken !== null) {
  try {
    (async () => {
      const { email, exp } = await jwtDecode<IAuthTokenPayload>(authToken);
      console.log(exp);
      if (exp && Date.now() <= exp * 1000) {
        initialLoginState.isLoggedIn = true;
        initialLoginState.authToken = authToken;
        initialLoginState.email = email;
        console.log("is Logged IN");
        // 만료 10분 이내일시 재발급
        console.log(exp * 1000 - Date.now());
        if (exp * 1000 - Date.now() < 10 * 60 * 1000) {
          await AuthApi.renewAuthToken();
        }
      }
    })();
  } catch (error) {
    console.error(error);
  }
}

const loginState = atom<ILoginState>({
  key: "loginState",
  default: initialLoginState,
});

export default loginState;
