import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestReferenceDetailCorporateView from "@views/request/reference/detail/RequestReferenceDetailCorporateView";
import RequestReferenceDetailReceiverView from "@views/request/reference/detail/RequestReferenceDetailReceiverView";

const RequestReferenceDetailPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return (
    <div>
      {type === "corporate" && <RequestReferenceDetailCorporateView />}
      {type === "personal" && <RequestReferenceDetailReceiverView />}
    </div>
  );
};

export default RequestReferenceDetailPage;
