import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  SubmitHandler,
  useForm,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { IRequestResumeRegisterRequest } from "@api/RequestApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/form/ErrorMessage";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { IRequestResumeRegisterFormData } from "@pages/request/resume/register/type";
import ExpertSpecialtyField from "@components/form/SpecialtyField";
import SelectBox from "@components/form/SelectBox";

const rewardNums = [...Array(10).keys()].map((num) => ({
  name: `${num + 1} 명`,
  value: num + 1,
}));

const rewardAmounts = [...Array(10).keys()].map((num) => ({
  name: `${((num + 1) * 10000).toLocaleString()} 원`,
  value: (num + 1) * 10000,
}));

const RequestResumeRegisterPage = () => {
  const navigate = useNavigate();
  const { type } = useRecoilValue(loginAtom);

  useEffect(() => {
    if (type !== "corporate") {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IRequestResumeRegisterFormData>({
    defaultValues: {
      rewardNum: rewardNums[0].value,
      rewardAmount: rewardAmounts[0].value,
    },
  });
  const {
    register,
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = methods;
  const rewardNum = useWatch({ control, name: "rewardNum" });
  const rewardAmount = useWatch({ control, name: "rewardAmount" });

  const handleUploadResume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files },
      } = event;
      if (!files || !files[0]) return;
      setValue("resume", files[0]);
    },
    []
  );

  const handleUploadPortfolio = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files },
      } = event;
      if (!files || !files[0]) return;
      setValue("portfolio", files[0]);
    },
    []
  );

  const handleRequestRegister: SubmitHandler<IRequestResumeRegisterFormData> =
    useCallback(async (data) => {
      if (!getValues("resume")) {
        setError("resume", {
          type: "required",
          message: "이력서를 업로드 해주세요.",
        });
        return;
      }
      if (
        !confirm("의뢰를 등록한 후에는 수정이 불가능합니다. 등록하시겠습니까?")
      )
        return;
      clearErrors();
      setIsLoading(true);
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === "number") formData.append(key, value.toString());
        else formData.append(key, value!);
      }
      const requestRegisterResponse = await RequestApi.resumeRegister({
        formData,
      } as IRequestResumeRegisterRequest);
      if (!requestRegisterResponse.ok) {
        alert(requestRegisterResponse.error);
        setIsLoading(false);
        return;
      }
      alert("의뢰가 등록되었습니다.");
      navigate("/request/resume/list");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRequestRegister)} className="form">
          <div>
            <div>
              <h3 className="h3">지원자 정보</h3>
            </div>

            <div className="mt-4">
              <label htmlFor="memo" className="label">
                메모
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("memo", { required: "메모를 입력하세요." })}
                  placeholder="지원자를 구분하기 위한 메모를 입력하세요."
                  className="input"
                />
                <ErrorMessage message={errors?.memo?.message} />
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="resume" className="label">
                이력서
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  onChange={handleUploadResume}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                />
                <ErrorMessage message={errors?.resume?.message} />
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="portfolio" className="label">
                포트폴리오 (선택)
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  onChange={handleUploadPortfolio}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                />
                <ErrorMessage message={errors?.portfolio?.message} />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="h3">의뢰 정보</h3>

            <div className="mt-4">
              <label className="label">직군</label>
              <div className="mt-1">
                <ExpertSpecialtyField />
              </div>
            </div>

            <div className="mt-4">
              <label className="label">참고사항</label>
              <div className="mt-1">
                <textarea
                  {...register("question", {
                    required: "참고사항을 입력해주세요.",
                  })}
                  rows={10}
                  placeholder="채용 포지션, 담당 업무 등 검토자가 참고할 만한 사항을 입력해주세요."
                  className="input"
                />
                <ErrorMessage message={errors?.question?.message} />
              </div>
            </div>

            <div className="mt-4">
              <label className="label">마감일 (선택)</label>
              <div className="mt-1">
                <input
                  type="date"
                  {...register("deadline")}
                  className="input"
                />
                <ErrorMessage message={errors?.deadline?.message} />
              </div>
            </div>

            <div className="mt-4">
              <label className="label">선정 답변 수</label>
              <div className="mt-1">
                <SelectBox name={"rewardNum"} options={rewardNums} />
                <ErrorMessage message={errors?.rewardNum?.message} />
              </div>
            </div>

            <div className="mt-4">
              <label className="label">선정 답변 당 보상금</label>
              <div className="mt-1">
                <SelectBox name={"rewardAmount"} options={rewardAmounts} />
                <ErrorMessage message={errors?.rewardAmount?.message} />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="h3">결제 금액</h3>

            <dl className="mt-4 p-4 bg-gray-100 rounded-lg divide-y divide-gray-300 font-medium text-sm sm:text-lg lg:mt-0 lg:col-span-5">
              <div className="pb-4 flex items-center justify-between">
                <dt className="text-gray-500">선정 답변에 대한 총 보상금</dt>
                <dd className="text-gray-900">{`${(
                  rewardNum * rewardAmount
                ).toLocaleString()} 원`}</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-500">답변 선정 보증금 (10%)</dt>
                <dd className="text-gray-900">{`${(
                  rewardNum *
                  rewardAmount *
                  0.1
                ).toLocaleString()} 원`}</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-500">부가가치세 (10%)</dt>
                <dd className="text-gray-900">{`${(
                  rewardNum *
                  rewardAmount *
                  0.1
                ).toLocaleString()} 원`}</dd>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <dt className="text-gray-900">총 결제금액</dt>
                <dd className="text-cc-green">{`${(
                  rewardNum *
                  rewardAmount *
                  1.2
                ).toLocaleString()} 원`}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              결제 및 등록하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestResumeRegisterPage;
