import { atom } from "recoil";
import { ILoginState } from "@atoms/loginState/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);

const loginState = atom<ILoginState>({
  key: "loginState",
  default: {
    isLoggedIn: false,
    authToken: "",
    email: "",
  },
});

export default loginState;
