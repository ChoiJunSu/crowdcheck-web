import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import AuthApi from "@api/AuthApi";
import {
  IAuthLoginCandidateRequest,
  IAuthLoginCandidateResponse,
} from "@api/AuthApi/type";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";

const CandidatePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");
  if (!code) {
    alert("잘못된 접근입니다.");
    navigate(-1);
    return;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setLoginState = useSetRecoilState(loginAtom);

  const handleCandidateAuth = useCallback(async (data) => {
    const loginCandidateResponse: IAuthLoginCandidateResponse =
      await AuthApi.loginCandidate({
        ...data,
        code,
      } as IAuthLoginCandidateRequest);
    console.log(loginCandidateResponse);
    if (loginCandidateResponse.ok) {
      const { authToken } = loginCandidateResponse;
      try {
        const { name, type } = jwtDecode(authToken) as IAuthTokenPayload;
        setLoginState({
          isLoggedIn: true,
          authToken,
          name,
          type,
        });
        localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
        navigate("/request/list/candidate");
      } catch (e) {
        alert("지원자 인증 오류입니다.");
      }
    } else {
      alert(loginCandidateResponse.error);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(handleCandidateAuth)}>
        <label>이름</label>
        <input
          type="text"
          {...register("name", { required: "이름을 입력해주세요." })}
        />
        <br />
        <ErrorMessage message={errors?.name?.message} />
        <br />
        <label>전화번호</label>
        <input
          type="text"
          {...register("phone", {
            required: "전화번호를 입력해주세요.",
            pattern: { value: /^\d*$/, message: "숫자만 입력해주세요." },
          })}
          placeholder="'-'를 제외한 숫자만 입력하세요."
        />
        <br />
        <button type="submit">인증하기</button>
      </form>
    </div>
  );
};

export default CandidatePage;
