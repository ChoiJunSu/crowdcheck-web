import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import RequestResumeAnswerExpertView from "@views/request/resume/answer/RequestResumeAnswerExpertView";

const RequestResumeAnswerPage = () => {
  const { type } = useRecoilValue(loginAtom);

  return <div>{type === "expert" && <RequestResumeAnswerExpertView />}</div>;
};

export default RequestResumeAnswerPage;
