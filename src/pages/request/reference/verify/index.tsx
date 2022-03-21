import { useForm } from "react-hook-form";
import { useCallback } from "react";
import RequestApi from "@api/RequestApi";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "@components/form/ErrorMessage";

const RequestReferenceVerifyPage = () => {
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
  } = useForm();

  const handleVerify = useCallback(async (data) => {
    const verifyResponse = await RequestApi.referenceVerify({
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
    navigate(`/request/reference/answer?requestId=${requestId}`);
  }, []);

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white">
        <h2 className="text-xl sm:text-2xl leading-6 font-bold text-gray-900">
          지원자 정보 검증이 필요합니다.
        </h2>
        <form
          onSubmit={handleSubmit(handleVerify)}
          noValidate={true}
          className="mt-10 space-y-6"
        >
          <div>
            <label htmlFor="name" className="label">
              지원자 전화번호
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register("candidatePhone", {
                  required: "지원자 전화번호를 입력해주세요.",
                })}
                className="input"
              />
              <ErrorMessage message={errors.name?.message} />
            </div>
          </div>
          <button type="submit" className="button">
            검증하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestReferenceVerifyPage;
