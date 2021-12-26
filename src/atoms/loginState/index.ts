import { atom } from "recoil";
import { IAuthTokenPayload, ILoginState } from "@atoms/loginState/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import jwtDecode from "jwt-decode";

const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);
const initialLoginState: ILoginState = {
  isLoggedIn: false,
  authToken: "",
  email: "",
};
if (authToken !== null) {
  try {
    const { email, exp } = jwtDecode<IAuthTokenPayload>(authToken);
    if (exp && Date.now() <= exp * 1000) {
      initialLoginState.isLoggedIn = true;
      initialLoginState.authToken = authToken;
      initialLoginState.email = email;
      // 만료 10분 이내일시 재발급
    }
  } catch (error) {
    console.error(error);
  }
}

const loginState = atom<ILoginState>({
  key: "loginState",
  default: initialLoginState,
});

export default loginState;
