import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import IndexPublicView from "@views/index/IndexPublicView";
import IndexView from "@views/index/IndexView";

const IndexPage = () => {
  const { isLoggedIn } = useRecoilValue(loginAtom);

  return isLoggedIn ? <IndexView /> : <IndexPublicView />;
};

export default IndexPage;
