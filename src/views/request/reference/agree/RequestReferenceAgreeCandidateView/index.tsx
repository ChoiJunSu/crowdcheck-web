import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  IRequestReferenceGetCandidateRequest,
  IRequestReferenceGetCandidateResponse,
} from "@api/RequestApi/type";
import { ICareer } from "@api/AuthApi/type";
import { useForm, FormProvider } from "react-hook-form";
import RequestApi from "@api/RequestApi";
import { IRequestReferenceAgreeFormDate } from "@views/request/reference/agree/RequestReferenceAgreeCandidateView/type";
import CareerField from "@components/form/CareerField";

const RequestReferenceAgreeCandidateView = () => {
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
      const getRequestResponse: IRequestReferenceGetCandidateResponse =
        await RequestApi.referenceGetCandidate({
          requestId: parseInt(requestId as string),
        } as IRequestReferenceGetCandidateRequest);
      if (!getRequestResponse.ok) {
        alert("의뢰 정보가 없습니다.");
        navigate(-1);
      }
      setCorporateName(getRequestResponse.corporateName);
      setCareers(getRequestResponse.careers);
    })();
  }, []);

  const methods = useForm<IRequestReferenceAgreeFormDate>();
  const { register, handleSubmit } = methods;

  const handleAgree = useCallback(async (data) => {
    const agreeResponse = await RequestApi.referenceAgree({
      ...data,
      requestId,
    });
    if (!agreeResponse.ok) {
      alert(agreeResponse.error);
      return;
    }
    alert(
      "평판 조회 동의가 완료되었습니다. 평판 제공자에게 평판 요청 링크를 전달해주세요."
    );
    navigate("/request/reference/list");
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
              <h3 className="h3">경력 정보</h3>
              <label htmlFor="name" className="label">
                평판 조회에 동의하는 경력을 모두 선택해주세요.
              </label>
            </div>
            <div className="mt-4">
              <CareerField mode="candidate" careers={careers} />
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="h3">비동의 사유 (선택)</h3>
              <label htmlFor="name" className="label">
                평판 조회에 동의하지 않는 경력이 있는 경우 사유를 입력해주세요.
              </label>
            </div>
            <div className="mt-4">
              <textarea
                {...register("agreeDescription")}
                rows={2}
                placeholder="예시: 재직 중인 회사입니다."
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

export default RequestReferenceAgreeCandidateView;
