import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { IRequestAnswerFormData } from "@pages/request/answer/type";
import { useCallback, useEffect, useState } from "react";
import { IRequestReceiver } from "@api/RequestApi/type";
import ReceiverApi from "@api/ReceiverApi";
import PageHeader from "@components/base/PageHeader";
import RangeSlider from "@components/form/RangeSlider";
import ErrorMessage from "@components/form/ErrorMessage";
import { TReferenceType } from "@api/ReferenceApi/type";
import PolicyField from "@components/form/PolicyField";

const questions: Array<{ question: string; isNumeric: boolean }> = [
  {
    question: "주로 어떤 역할과 업무를 수행했나요?",
    isNumeric: false,
  },
  {
    question: "업무 능력은 어떤가요?",
    isNumeric: true,
  },
  {
    question: "구성원들과의 대인관계는 어땠나요?",
    isNumeric: true,
  },
  {
    question: "성격 또는 인성에 있어서 어떤 부분이 강점인가요?",
    isNumeric: false,
  },
  {
    question: "성격 또는 인성에 있어서 어떤 부분이 약점인가요?",
    isNumeric: false,
  },
  { question: "이직 사유를 아시나요?", isNumeric: false },
  { question: "추가적으로 알려주실 부분이 있나요?", isNumeric: false },
];

const RequestAnswerPage = () => {
  const { type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (type !== "personal" || !requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const methods = useForm<IRequestAnswerFormData>();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [request, setRequest] = useState<IRequestReceiver | null>(null);
  const [referenceType, setReferenceType] =
    useState<TReferenceType>("nomination");

  useEffect(() => {
    (async () => {
      const getAnswerResponse = await ReceiverApi.getAnswer({
        requestId: parseInt(requestId!),
      });
      if (!getAnswerResponse.ok) {
        alert(getAnswerResponse.error);
        return;
      }
      setRequest(getAnswerResponse.request);
    })();
  }, []);

  useEffect(() => {
    setValue("type", referenceType);
  }, [referenceType]);

  const handleAnswer = useCallback(async (data) => {
    if (!confirm("평판을 작성하시면 수정할 수 없습니다. 답변하시겠습니까?"))
      return;
    const answerResponse = await ReceiverApi.answer({
      ...data,
      requestId,
    });
    if (!answerResponse.ok) {
      alert(answerResponse.error);
      return;
    }
    alert("의뢰 답변이 완료되었습니다. 소중한 평판 감사합니다.");
    navigate("/request/list?mode=receiver");
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleAnswer)} className="form">
        {request?.candidateName && (
          <PageHeader title={`${request.candidateName}님에 대한 평판 작성`} />
        )}

        <div className="mt-4">
          <h3 className="h3 my-4">
            {request?.candidateName}님께 직접 평판 작성 요청을 받으셨나요?
          </h3>
          <input {...register("type")} hidden />
          <div className="mt-1">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                onClick={() => setReferenceType("nomination")}
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none ${
                  referenceType === "nomination"
                    ? "bg-cc-green text-white"
                    : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                직접 요청을 받아 작성합니다
              </button>
              <button
                type="button"
                onClick={() => setReferenceType("blind")}
                className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none ${
                  referenceType === "blind"
                    ? "bg-cc-green text-white"
                    : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                요청을 받지 않고 작성합니다
              </button>
            </span>
            <ErrorMessage message={errors?.type?.message} />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="h3 my-4">
            {request?.candidateName}님과 어떤 관계로 일하셨나요?
          </h3>
          <div className="mt-1">
            <input
              type="text"
              {...register("relationship", {
                required: "지원자와의 관계를 입력해주세요.",
              })}
              placeholder="예시: 사수, 동료"
              className="input"
            />
            <ErrorMessage message={errors?.relationship?.message} />
          </div>
        </div>

        {questions.map(({ question, isNumeric }, index) => (
          <div key={index} className="mt-4">
            <h3 className="h3 my-4">{question}</h3>
            <input
              {...register(`details.${index}.question`, { value: question })}
              hidden
            />
            {isNumeric && (
              <div className="mt-2">
                <label className="label">점수로 표현해주세요.</label>
                <RangeSlider
                  name={`details.${index}.score`}
                  min={1}
                  max={10}
                  step={1}
                />
                <ErrorMessage
                  message={errors?.details?.[index].score?.message}
                />
              </div>
            )}
            <div>
              <label className="label">답변을 입력해주세요.</label>
              <textarea
                {...register(`details.${index}.answer`, {
                  required: "답변을 입력해주세요.",
                })}
                rows={5}
                className="input"
              />
              <ErrorMessage
                message={errors?.details?.[index].answer?.message}
              />
            </div>
          </div>
        ))}

        <div className="pt-8">
          <div>
            <h3 className="h3">정책 동의</h3>
          </div>
          <div className="mt-4">
            <PolicyField mode="answer" />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300">
          <button type="submit" className="button">
            답변하기
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RequestAnswerPage;
