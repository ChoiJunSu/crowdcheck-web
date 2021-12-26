import { atom } from "recoil";
import { ILoginState } from "@atoms/loginState/type";

const loginState = atom<ILoginState>({
  key: "loginState",
  default: {
    isLoggedIn: false,
    token: "",
    email: "",
  },
});

export default loginState;
