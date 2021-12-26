import { useRecoilValue } from "recoil";
import loginState from "@atoms/loginState";
import LogoutButton from "@components/login/LogoutButton";
import Link from "next/link";

const Home = () => {
  const { isLoggedIn, email } = useRecoilValue(loginState);
  return isLoggedIn ? (
    <div>
      <h1>어서오세요 {email}님</h1>
      <LogoutButton />
    </div>
  ) : (
    <div>
      <h1>로그인이 필요합니다</h1>
      <Link href="/login">
        <a>로그인 하러가기</a>
      </Link>
    </div>
  );
};

export default Home;
