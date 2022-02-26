import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import UserEditCorporateView from "@views/user/edit/UserEditCorporateView";
import UserEditPersonalView from "@views/user/edit/UserEditPersonalView";
import UserEditExpertView from "@views/user/edit/UserEditExpertView";

const UserEditPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <UserEditPersonalView />}
      {type === "corporate" && <UserEditCorporateView />}
      {type === "expert" && <UserEditExpertView />}
    </div>
  );
};

export default UserEditPage;
