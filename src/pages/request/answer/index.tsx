import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";

const RequestAnswerPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
    return;
  }

  const { register, handleSubmit } = useForm();
  const [corporateName, setCorporateName] = useState<string>("");
  const [candidateName, setCandidateName] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    (async () => {
      const getReceiverResponse = await RequestApi.getReceiver({
        requestId,
      });
      if (!getReceiverResponse.ok) {
        alert(getReceiverResponse.error);
        return;
      }
      setCorporateName(getReceiverResponse.corporateName);
      setCandidateName(getReceiverResponse.candidateName);
      setQuestion(getReceiverResponse.question);
    })();
  }, []);

  const handleAnswer = useCallback(async (data) => {
    const answerResponse = await RequestApi.answer({ ...data, requestId });
    if (!answerResponse.ok) {
      alert(answerResponse.error);
      return;
    }
    alert("의뢰 답변이 완료되었습니다.");
    navigate("request/list/receiver");
  }, []);

  return (
    <div>
      <h1>의뢰 답변 페이지</h1>
      {corporateName && candidateName && (
        <h2>
          {corporateName}의 {candidateName}님에 대한 의뢰
        </h2>
      )}
      {question && (
        <div>
          <h3>질문</h3>
          <textarea>{question}</textarea>
        </div>
      )}
      <form onSubmit={handleSubmit(handleAnswer)}>
        <label>답변</label>
        <textarea {...register("answer", { required: "답변을 입력하세요." })} />
        <button type="submit">답변하기</button>
      </form>
    </div>
  );
};

export default RequestAnswerPage;
