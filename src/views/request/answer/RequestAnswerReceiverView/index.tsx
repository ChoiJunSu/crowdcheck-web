import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IRequestAnswerFormData } from "@views/request/answer/RequestAnswerReceiverView/type";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";

const RequestAnswerReceiverView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestAnswerFormData>();
  const [corporateName, setCorporateName] = useState<string>("");
  const [candidateName, setCandidateName] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    (async () => {
      const getReceiverResponse = await RequestApi.getReceiver({
        requestId: parseInt(requestId!),
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
    navigate("request/list");
  }, []);

  return (
    <form onSubmit={handleSubmit(handleAnswer)} className="form">
      {corporateName && candidateName && (
        <div className="my-4">
          {corporateName && (
            <h2 className="text-xl leading-6 font-medium text-gray-900">
              {corporateName}의 {candidateName}님에 대한 의뢰
            </h2>
          )}
        </div>
      )}
      {question && (
        <div className="pt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900">질문</h3>
          <div className="mt-4">
            <textarea value={question} readOnly={true} className="input" />
          </div>
        </div>
      )}
      <div className="pt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">답변</h3>
        <div className="mt-4">
          <textarea
            {...register("answer", { required: "답변을 입력하세요." })}
            rows={10}
            placeholder="답변을 입력하세요."
            className="input"
          />
          <ErrorMessage message={errors?.answer?.message} />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-300">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cc-green hover:cc-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cc-green"
        >
          답변하기
        </button>
      </div>
    </form>
  );
};

export default RequestAnswerReceiverView;
