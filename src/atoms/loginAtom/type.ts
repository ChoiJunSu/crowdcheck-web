import { JwtPayload } from "jwt-decode";
import { TUserType } from "@api/UserApi/type";

export interface ILoginState {
  isLoggedIn: boolean;
  authToken: string | null;
  name: string | null;
  type: TUserType | null;
}

export interface IAuthTokenPayload extends JwtPayload {
  name: string;
  type: TUserType;
}
