import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { useCallback } from "react";
import {
  IAuthLoginCandidateRequest,
  IAuthLoginCandidateResponse,
} from "@api/AuthApi/type";
import AuthApi from "@api/AuthApi";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import ErrorMessage from "@components/base/form/ErrorMessage";

const AuthLoginCandidateView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");
  if (!code) {
    alert("잘못된 접근입니다.");
    navigate(-1);
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
        navigate("/request/list");
      } catch (e) {
        alert("지원자 인증 오류입니다.");
      }
    } else {
      alert(loginCandidateResponse.error);
    }
  }, []);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white">
      <form
        onSubmit={handleSubmit(handleCandidateAuth)}
        noValidate={true}
        className="mt-10 space-y-6"
      >
        <div>
          <label htmlFor="name" className="label">
            이름
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register("name", { required: "이름을 입력해주세요." })}
              className="input"
            />
            <ErrorMessage message={errors.name?.message} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="label">
            전화번호
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register("phone", {
                required: "전화번호를 입력해주세요.",
                pattern: { value: /^\d*$/, message: "숫자만 입력해주세요." },
              })}
              placeholder="'-'를 제외한 숫자만 입력하세요."
              className="input"
            />
            <ErrorMessage message={errors.password?.message} />
          </div>
        </div>

        <button type="submit" className="button">
          인증하기
        </button>
      </form>
    </div>
  );
};

export default AuthLoginCandidateView;
