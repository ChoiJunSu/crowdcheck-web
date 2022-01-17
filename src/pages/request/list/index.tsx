import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestListReceiverView from "@views/request/list/RequestListReceiverView";
import RequestListCandidateView from "@views/request/list/RequestListCandidateView";

const RequestListPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "personal" && <RequestListReceiverView />}
      {type === "candidate" && <RequestListCandidateView />}
    </div>
  );
};

export default RequestListPage;
