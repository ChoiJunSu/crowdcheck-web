import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestResumeDetailExpertView from "@views/request/resume/detail/RequestResumeDetailExpertView";

const RequestResumeDetailPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return <div>{type === "expert" && <RequestResumeDetailExpertView />}</div>;
};

export default RequestResumeDetailPage;
