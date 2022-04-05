import { useForm, FormProvider } from "react-hook-form";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "@components/form/ErrorMessage";
import ReceiverApi from "@api/ReceiverApi";
import PageHeader from "@components/base/PageHeader";
import { ICareer } from "@api/UserApi/type";
import UserApi from "@api/UserApi";
import PolicyField from "@components/form/PolicyField";

const RequestVerifyPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const methods = useForm();
  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [candidateName, setCandidateName] = useState<string>("");
  const [career, setCareer] = useState<ICareer | null>(null);

  useEffect(() => {
    (async () => {
      const getVerifyResponse = await ReceiverApi.getVerify({
        requestId: parseInt(requestId!),
      });
      if (!getVerifyResponse.ok) {
        alert(getVerifyResponse.error);
        return;
      }
      setCandidateName(getVerifyResponse.candidateName);
      setCareer(getVerifyResponse.career);
    })();
  }, []);

  const handleUploadCertificate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files },
      } = event;
      if (!files || !files[0]) return;
      clearErrors("certificate");
      setValue("certificate", files[0]);
    },
    []
  );

  const handleVerify = useCallback(
    async (data) => {
      // verify career
      if (!career?.verifiedAt) {
        if (!getValues("certificate")) {
          setError("certificate", { message: "증빙자료를 업로드해주세요." });
          return;
        }
        const formData = new FormData();
        formData.append("careerId", career!.id!.toString());
        formData.append("certificate", getValues("certificate"));
        const careerVerifyResponse = await UserApi.careerVerify({
          formData,
        });
        if (!careerVerifyResponse.ok) {
          alert(careerVerifyResponse.error);
          return;
        }
      }
      // verify receiver
      clearErrors("candidatePhone");
      const verifyResponse = await ReceiverApi.verify({
        ...data,
        requestId,
      });
      if (!verifyResponse.ok) {
        alert(verifyResponse.error);
        if (verifyResponse.error === "경력 인증이 필요합니다.")
          navigate("/user/edit");
        return;
      }
      alert("검증에 성공했습니다. 답변 페이지로 이동합니다.");
      navigate(`/request/answer?requestId=${requestId}`);
    },
    [career]
  );

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white">
        <PageHeader title="지원자 정보 검증" />
        <h3 className="h3">답변 전 검증이 필요합니다.</h3>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleVerify)}
            noValidate={true}
            className="mt-10 space-y-6"
          >
            <div>
              <label htmlFor="name" className="label">
                {candidateName}님의 전화번호를 입력해주세요.
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("candidatePhone", {
                    required: "전화번호를 입력하세요.",
                  })}
                  className="input"
                />
                <ErrorMessage message={errors.candidatePhone?.message} />
              </div>
            </div>

            {!career?.verifiedAt && (
              <div>
                <label htmlFor="certificate" className="label">
                  {career?.corporateName} 재직을 증빙할 수 있는 자료를 업로드
                  해주세요. <br />
                  (명함, 경력증명서 등)
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    onChange={handleUploadCertificate}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                  />
                  <ErrorMessage message={errors?.certificate?.message} />
                </div>

                <div className="pt-8">
                  <div>
                    <h3 className="h3">정책 동의</h3>
                  </div>
                  <div className="mt-4">
                    <PolicyField mode="careerVerify" />
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="button">
              검증하기
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RequestVerifyPage;
