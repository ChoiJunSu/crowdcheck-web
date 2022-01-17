import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";

const IndexPage = () => {
  const { isLoggedIn, name } = useRecoilValue(loginAtom);

  return isLoggedIn ? (
    <div>
      <h1>어서오세요 {name}님</h1>
    </div>
  ) : (
    <div>
      <h1>로그인이 필요합니다</h1>
    </div>
  );
};

export default IndexPage;
