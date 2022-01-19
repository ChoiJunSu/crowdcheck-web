import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IAnswer } from "@api/RequestApi/type";

const RequestAnswerCorporateView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [candidateName, setCandidateName] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answerList, setAnswerList] = useState<Array<IAnswer>>([]);
  const receiverStatusMapper = {
    arrived: "답변을 기다리는 중",
    verified: "답변을 기다리는 중",
    rejected: "거절됨",
    answered: "답변 완료",
    closed: "종료됨",
  };

  useEffect(() => {
    (async () => {
      const getCorporateResponse = await RequestApi.getCorporate({
        requestId: parseInt(requestId!),
      });
      if (!getCorporateResponse.ok) {
        alert(getCorporateResponse.error);
        return;
      }
      setCandidateName(getCorporateResponse.candidateName);
      setQuestion(getCorporateResponse.question);
      setAnswerList(getCorporateResponse.answers);
    })();
  }, []);

  return (
    <div>
      <h2>{candidateName}님에 대한 의뢰</h2>
      <h3>질문: {question}</h3>
      {answerList.map(({ id, corporateName, status, answer }, index) => (
        <li key={index}>
          <details>
            <summary>
              {corporateName}에서 함께 일한 {id}님 |{" "}
              {receiverStatusMapper[status]}
            </summary>
            {answer && answer}
          </details>
        </li>
      ))}
    </div>
  );
};

export default RequestAnswerCorporateView;
