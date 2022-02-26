import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestResumeListCorporateView from "@views/request/resume/list/RequestResumeListCorporateView";
import RequestResumeListExpertView from "@views/request/resume/list/RequestResumeListExpertView";

const RequestResumeListPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <RequestResumeListExpertView />}
      {type === "corporate" && <RequestResumeListCorporateView />}
    </div>
  );
};

export default RequestResumeListPage;
