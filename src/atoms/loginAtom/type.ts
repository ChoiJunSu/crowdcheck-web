import { JwtPayload } from "jwt-decode";

export interface ILoginState {
  isLoggedIn: boolean;
  authToken: string;
  name: string;
}

export interface IAuthTokenPayload extends JwtPayload {
  name: string;
}
