import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestReferenceAnswerReceiverView from "@views/request/reference/answer/RequestReferenceAnswerReceiverView";

const RequestReferenceAnswerPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>{type === "personal" && <RequestReferenceAnswerReceiverView />}</div>
  );
};

export default RequestReferenceAnswerPage;
