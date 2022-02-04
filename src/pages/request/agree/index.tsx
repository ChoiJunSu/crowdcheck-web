import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestAgreeCandidateView from "@views/request/agree/RequestAgreeCandidateView";
import RequestAgreeCorporateView from "@views/request/agree/RequestAgreeCorporateView";

const RequestAgreePage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "candidate" && <RequestAgreeCandidateView />}
      {type === "corporate" && <RequestAgreeCorporateView />}
    </div>
  );
};

export default RequestAgreePage;
