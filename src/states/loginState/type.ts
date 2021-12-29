import { JwtPayload } from "jwt-decode";

export interface ILoginState {
  isLoggedIn: boolean;
  authToken: string;
  email: string;
}

export interface IAuthTokenPayload extends JwtPayload {
  email: string;
}
