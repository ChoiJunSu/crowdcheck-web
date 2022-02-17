import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  IRequestGetCandidateRequest,
  IRequestGetCandidateResponse,
} from "@api/RequestApi/type";
import { ICareer } from "@api/AuthApi/type";
import { useForm, FormProvider } from "react-hook-form";
import RequestApi from "@api/RequestApi";
import { IRequestAgreeFormDate } from "@views/request/agree/RequestAgreeCandidateView/type";
import CareerField from "@components/base/form/CareerField";

const RequestAgreeCandidateView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [corporateName, setCorporateName] = useState<string>("");
  const [careers, setCareers] = useState<Array<ICareer>>([]);

  useEffect(() => {
    (async () => {
      const getRequestResponse: IRequestGetCandidateResponse =
        await RequestApi.getCandidate({
          requestId: parseInt(requestId as string),
        } as IRequestGetCandidateRequest);
      if (!getRequestResponse.ok) {
        alert("의뢰 정보가 없습니다.");
        navigate(-1);
      }
      setCorporateName(getRequestResponse.corporateName);
      setCareers(getRequestResponse.careers);
    })();
  }, []);

  const methods = useForm<IRequestAgreeFormDate>();
  const { register, handleSubmit } = methods;

  const handleAgree = useCallback(async (data) => {
    const agreeResponse = await RequestApi.agree({
      ...data,
      requestId,
    });
    if (!agreeResponse.ok) {
      alert(agreeResponse.error);
      return;
    }
    alert("의뢰 동의가 완료되었습니다.");
    navigate("/request/list");
  }, []);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAgree)} className="form">
          <div className="my-4">
            {corporateName && (
              <h2 className="text-xl sm:text-2xl leading-6 font-bold text-gray-900">
                {corporateName}의 의뢰
              </h2>
            )}
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                경력 정보
              </h3>
            </div>
            <div className="mt-4">
              <CareerField mode="candidate" careers={careers} />
            </div>
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                비동의 사유
              </h3>
            </div>
            <div className="mt-4">
              <textarea
                {...register("agreeDescription")}
                rows={10}
                placeholder="비동의 사유를 입력하세요."
                className="input"
              />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              동의하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestAgreeCandidateView;
