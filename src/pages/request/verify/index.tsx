import { useForm } from "react-hook-form";
import { useCallback } from "react";
import RequestApi from "@api/RequestApi";
import { useLocation, useNavigate } from "react-router-dom";

const RequestVerifyPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const { register, handleSubmit } = useForm();

  const handleVerify = useCallback(async (data) => {
    const verifyResponse = await RequestApi.verify({ ...data, requestId });
    if (!verifyResponse.ok) {
      alert(verifyResponse.error);
      return;
    }
    alert("검증에 성공했습니다. 답변 페이지로 이동합니다.");
    navigate(`/request/answer?requestId=${requestId}`);
  }, []);

  return (
    <div>
      <h1>의뢰 답변 검증 페이지</h1>
      <form onSubmit={handleSubmit(handleVerify)}>
        <label>지원자 전화번호</label>
        <input
          type="text"
          {...register("candidatePhone", {
            required: "지원자 전화번호를 입력해주세요.",
          })}
        />
        <button type="submit">검증하기</button>
      </form>
    </div>
  );
};

export default RequestVerifyPage;
