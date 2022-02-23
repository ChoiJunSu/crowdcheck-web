import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestResumeListReceiverView from "@views/request/resume/list/RequestResumeListReceiverView";
import RequestResumeListCorporateView from "@views/request/resume/list/RequestResumeListCorporateView";

const RequestResumeListPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <RequestResumeListReceiverView />}
      {type === "corporate" && <RequestResumeListCorporateView />}
    </div>
  );
};

export default RequestResumeListPage;
