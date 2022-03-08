import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IRequestResumeGetAnswerExpert } from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import { PaperClipIcon } from "@heroicons/react/outline";
import ErrorMessage from "@components/form/ErrorMessage";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import RangeSlider from "@components/form/RangeSlider";
import { IRequestResumeAnswerFormData } from "@pages/request/resume/answer/type";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";

const RequestResumeAnswerPage = () => {
  const { type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [request, setRequest] = useState<IRequestResumeGetAnswerExpert | null>(
    null
  );
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!requestId || type !== "expert") {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
    (async () => {
      const requestResumeGetAnswerResponse =
        await RequestApi.resumeGetAnswerExpert({
          requestId: parseInt(requestId!),
        });
      if (!requestResumeGetAnswerResponse.ok) {
        alert(requestResumeGetAnswerResponse.error);
        navigate(-1);
      }
      setRequest(requestResumeGetAnswerResponse.request);
    })();
  }, [requestId]);

  const handleRequestResumeAnswer: SubmitHandler<IRequestResumeAnswerFormData> =
    useCallback(async (data: IRequestResumeAnswerFormData) => {
      if (
        !confirm("의뢰에 답변하신 후에는 수정할 수 없습니다. 답변하시겠습니까?")
      )
        return;
      const answerResponse = await RequestApi.resumeAnswer({
        ...data,
        requestId: parseInt(requestId as string),
      });
      if (!answerResponse.ok) {
        alert(answerResponse.error);
        return;
      }
      alert("의뢰 답변이 완료되었습니다.");
      navigate("/");
    }, []);

  return (
    <div className="p-1 mx-auto sm:max-w-4xl bg-white overflow-hidden">
      <dl className="divide-y divide-gray-200">
        <h3 className="my-4 sm:my-6 text-xl sm:text-3xl leading-6 font-semibold text-gray-900">
          {request?.corporateName}의 의뢰
        </h3>

        <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 text-md sm:text-lg font-medium">
          <dt className="text-gray-500">참고사항</dt>
          <dd className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3 border border-gray-200 rounded-md">
            {request?.question.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </dd>
        </div>

        <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 text-md sm:text-lg font-medium">
          <dt className="text-gray-500">첨부파일</dt>
          <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-3">
            <ul
              role="list"
              className="border border-gray-200 rounded-md divide-y divide-gray-200"
            >
              <li className="pl-3 pr-4 py-3 flex items-center justify-between">
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className="ml-2 flex-1 w-0 truncate">
                    지원자 이력서
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href={request?.resumeUrl}
                    target="_blank"
                    className="hover:text-cc-green"
                  >
                    다운로드
                  </a>
                </div>
              </li>
              {request?.portfolioUrl && (
                <li className="pl-3 pr-4 py-3 flex items-center justify-between">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">
                      지원자 포트폴리오
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href={request.portfolioUrl}
                      target="_blank"
                      className="hover:text-cc-green"
                    >
                      다운로드
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </dd>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleRequestResumeAnswer)}
            className="py-4 sm:py-6"
          >
            <div>
              <h3 className="text-lg sm:text-2xl leading-6 font-medium text-gray-900">
                답변 정보
              </h3>
            </div>

            <div className="mt-4">
              <label htmlFor="workExperience" className="label">
                직무 경험
              </label>
              <div className="mt-1">
                <RangeSlider name="workExperience" min={1} max={10} step={1} />
                <ErrorMessage message={errors?.workExperience?.message} />
              </div>
              <div className="mt-1">
                <textarea
                  {...register("workExperienceDescription", {
                    required: "직무 경험에 대한 설명을 입력하세요.",
                  })}
                  rows={5}
                  placeholder="직무 경험에 대한 설명을 입력하세요."
                  className="input"
                />
                <ErrorMessage
                  message={errors?.workExperienceDescription?.message}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="roleFit" className="label">
                업무 적합성
              </label>
              <div className="mt-1">
                <RangeSlider name="roleFit" min={1} max={10} step={1} />
                <ErrorMessage message={errors?.roleFit?.message} />
              </div>
              <div className="mt-1">
                <textarea
                  {...register("roleFitDescription", {
                    required: "업무 적합성에 대한 설명을 입력하세요.",
                  })}
                  rows={5}
                  placeholder="업무 적합성에 대한 설명을 입력하세요."
                  className="input"
                />
                <ErrorMessage message={errors?.roleFitDescription?.message} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="collaborationAbility" className="label">
                협업 능력
              </label>
              <div className="mt-1">
                <RangeSlider
                  name="collaborationAbility"
                  min={1}
                  max={10}
                  step={1}
                />
                <ErrorMessage message={errors?.collaborationAbility?.message} />
              </div>
              <div className="mt-1">
                <textarea
                  {...register("collaborationAbilityDescription", {
                    required: "협업 능력에 대한 설명을 입력하세요.",
                  })}
                  rows={5}
                  placeholder="협업 능력에 대한 설명을 입력하세요."
                  className="input"
                />
                <ErrorMessage
                  message={errors?.collaborationAbilityDescription?.message}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="hardWorking" className="label">
                성실성
              </label>
              <div className="mt-1">
                <RangeSlider name="hardWorking" min={1} max={10} step={1} />
                <ErrorMessage message={errors?.hardWorking?.message} />
              </div>
              <div className="mt-1">
                <textarea
                  {...register("hardWorkingDescription", {
                    required: "성실성에 대한 설명을 입력하세요.",
                  })}
                  rows={5}
                  placeholder="성실성에 대한 설명을 입력하세요."
                  className="input"
                />
                <ErrorMessage
                  message={errors?.hardWorkingDescription?.message}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="hardWorking" className="label">
                적정 연봉
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("recommendedSalary", {
                    required: "적정 연봉을 입력하세요.",
                  })}
                  className="input"
                />
                <ErrorMessage message={errors?.recommendedSalary?.message} />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-300">
              <button type="submit" className="button">
                답변 등록하기
              </button>
            </div>
          </form>
        </FormProvider>
      </dl>
    </div>
  );
};

export default RequestResumeAnswerPage;
