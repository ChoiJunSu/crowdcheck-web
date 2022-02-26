import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { IRequestResumeRegisterRequest } from "@api/RequestApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { IRequestResumeRegisterFormData } from "@views/request/resume/register/RequestResumeRegisterView/type";
import ExpertSpecialtyField from "@components/base/form/SpecialtyField";

const RequestResumeRegisterView = () => {
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
  const methods = useForm<IRequestResumeRegisterFormData>();
  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = methods;

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

  const handleRequestRegister: SubmitHandler<IRequestResumeRegisterFormData> =
    useCallback(async (data) => {
      if (!getValues("resume")) {
        setError("resume", {
          type: "required",
          message: "이력서를 업로드 해주세요.",
        });
        return;
      }
      if (!getValues("specialty")) {
        setError("specialty", {
          type: "required",
          message: "직군을 선택해주세요.",
        });
        return;
      }
      clearErrors();
      setIsLoading(true);
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value!);
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
                  {...register("memo")}
                  placeholder="지원자를 구분하기 위한 메모를 입력하세요."
                  className="input"
                />
                <ErrorMessage message={errors?.memo?.message} />
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="memo" className="label">
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
          </div>

          <div className="pt-8">
            <h3 className="h3">의뢰 정보</h3>
            <div className="mt-4">
              <label className="label">직군</label>
              <ExpertSpecialtyField />
            </div>
            <div className="mt-4">
              <label className="label">질문</label>
              <textarea
                {...register("question", { required: "질문을 입력해주세요." })}
                rows={10}
                placeholder="채용 포지션, 담당 업무 등 검토자가 참고할 만한 사항을 입력해주세요."
                className="input"
              />
              <ErrorMessage message={errors?.question?.message} />
            </div>
            <div className="mt-4">
              <label className="label">마감일</label>
              <input type="date" {...register("deadline")} className="input" />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              등록하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestResumeRegisterView;
