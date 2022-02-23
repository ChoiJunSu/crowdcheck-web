import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestReferenceAnswerReceiverView from "@views/request/reference/answer/RequestReferenceAnswerReceiverView";
import RequestReferenceAnswerCorporateView from "@views/request/reference/answer/RequestReferenceAnswerCorporateView";

const RequestReferenceAnswerPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <RequestReferenceAnswerReceiverView />}
      {type === "corporate" && <RequestReferenceAnswerCorporateView />}
    </div>
  );
};

export default RequestReferenceAnswerPage;
