import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import UserEditCorporateView from "@views/user/edit/UserEditCorporateView";
import UserEditPersonalView from "@views/user/edit/UserEditPersonalView";

const UserEditPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <UserEditPersonalView />}
      {type === "corporate" && <UserEditCorporateView />}
    </div>
  );
};

export default UserEditPage;
