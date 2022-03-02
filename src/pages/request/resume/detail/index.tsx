import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestResumeDetailExpertView from "@views/request/resume/detail/RequestResumeDetailExpertView";
import RequestResumeDetailCorporateView from "@views/request/resume/detail/RequestResumeDetailCorporateView";

const RequestResumeDetailPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "expert" && <RequestResumeDetailExpertView />}
      {type === "corporate" && <RequestResumeDetailCorporateView />}
    </div>
  );
};

export default RequestResumeDetailPage;
