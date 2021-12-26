import { useRecoilState } from "recoil";
import loginState from "@atoms/loginState";
import { ILoginState } from "@atoms/loginState/type";

const Home = () => {
  const [{ isLoggedIn, email }, setLoginState] =
    useRecoilState<ILoginState>(loginState);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginState({
      isLoggedIn: false,
      token: "",
      email: "",
    });
  };
  return isLoggedIn ? (
    <div>
      <h1>어서오세요 {email}님</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  ) : (
    <div>
      <h1>로그인이 필요합니다</h1>
      <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=752369a3217c1905b6ce8a71a15eaf8c&redirect_uri=http://localhost:3000/oauth/callback/kakao">
        카카오로 로그인
      </a>
      <br />
      <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=646489201957-l6859a2jp95c6fles5lcos3tmnlm8eab.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/callback/google&scope=https://www.googleapis.com/auth/userinfo.email">
        구글로 로그인
      </a>
    </div>
  );
};

export default Home;
