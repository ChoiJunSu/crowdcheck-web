import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestAnswerReceiverView from "@views/request/answer/RequestAnswerReceiverView";
import RequestAnswerCorporateView from "@views/request/answer/RequestAnswerCorporateView";

const RequestAnswerPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <RequestAnswerReceiverView />}
      {type === "corporate" && <RequestAnswerCorporateView />}
    </div>
  );
};

export default RequestAnswerPage;
