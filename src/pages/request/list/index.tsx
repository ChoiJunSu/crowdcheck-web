import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestListCorporateView from "@views/request/list/RequestListCorporateView";
import { useNavigate, useSearchParams } from "react-router-dom";
import RequestListReceiverView from "@views/request/list/RequestListReceiverView";
import RequestListCandidateView from "@views/request/list/RequestListCandidateView";

const RequestListPage = () => {
  const { type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  if (type === "personal" && !mode) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  return (
    <div>
      {type === "corporate" && <RequestListCorporateView />}
      {type === "personal" && mode === "receiver" && (
        <RequestListReceiverView />
      )}
      {type === "personal" && mode === "candidate" && (
        <RequestListCandidateView />
      )}
    </div>
  );
};

export default RequestListPage;
