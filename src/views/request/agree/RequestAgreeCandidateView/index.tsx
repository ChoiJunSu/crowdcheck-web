import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import RequestApi from "@api/RequestApi";
import { IRequestAgreeFormDate } from "@views/request/agree/RequestAgreeCandidateView/type";
import CareerField from "@components/form/CareerField";
import {
  IRequestGetAgreeCandidateRequest,
  IRequestGetAgreeCandidateResponse,
} from "@api/RequestApi/type";
import { ICareer } from "@api/UserApi/type";
import PolicyField from "@components/form/PolicyField";

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
      const getAgreeCandidateResponse: IRequestGetAgreeCandidateResponse =
        await RequestApi.getAgreeCandidate({
          requestId: parseInt(requestId as string),
        } as IRequestGetAgreeCandidateRequest);
      if (!getAgreeCandidateResponse.ok) {
        alert("의뢰 정보가 없습니다.");
        navigate(-1);
      }
      setCorporateName(getAgreeCandidateResponse.corporateName);
      setCareers(getAgreeCandidateResponse.careers);
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
    alert(
      "평판 조회 동의가 완료되었습니다. 평판 작성자에게 평판 요청 링크를 전달해주세요."
    );
    navigate("/request/list?mode=candidate");
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
              <h3 className="h3">정책 동의</h3>
            </div>
            <div className="mt-4">
              <PolicyField mode="agree" />
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
