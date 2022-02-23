import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestReferenceAgreeCandidateView from "@views/request/reference/agree/RequestReferenceAgreeCandidateView";
import RequestReferenceAgreeCorporateView from "@views/request/reference/agree/RequestReferenceAgreeCorporateView";

const RequestReferenceAgreePage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "candidate" && <RequestReferenceAgreeCandidateView />}
      {type === "corporate" && <RequestReferenceAgreeCorporateView />}
    </div>
  );
};

export default RequestReferenceAgreePage;
