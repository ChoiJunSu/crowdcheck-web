import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestReferenceListReceiverView from "@views/request/reference/list/RequestReferenceListReceiverView";
import RequestReferenceListCandidateView from "@views/request/reference/list/RequestReferenceListCandidateView";
import RequestReferenceListCorporateView from "@views/request/reference/list/RequestReferenceListCorporateView";

const RequestReferenceListPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <RequestReferenceListReceiverView />}
      {type === "corporate" && <RequestReferenceListCorporateView />}
      {type === "candidate" && <RequestReferenceListCandidateView />}
    </div>
  );
};

export default RequestReferenceListPage;
