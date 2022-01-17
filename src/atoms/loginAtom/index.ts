import { atom } from "recoil";
import { ILoginState } from "@atoms/loginAtom/type";

const loginAtom = atom<ILoginState>({
  key: "loginAtom",
  default: {
    isLoggedIn: false,
    authToken: null,
    name: null,
    type: null,
  },
});

export default loginAtom;
