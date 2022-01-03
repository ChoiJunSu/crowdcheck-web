import { atom } from "recoil";
import { ILoginState } from "@atoms/loginAtom/type";

const loginAtom = atom<ILoginState>({
  key: "loginAtom",
  default: {
    isLoggedIn: false,
    authToken: "",
    email: "",
  },
});

export default loginAtom;
