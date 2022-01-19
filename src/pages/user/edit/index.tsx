import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import UserEditPersonalPage from "@views/user/edit/UserEditPersonalView";

const UserEditPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return <div>{type === "personal" && <UserEditPersonalPage />}</div>;
};

export default UserEditPage;
