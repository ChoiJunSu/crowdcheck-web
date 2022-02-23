import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
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
import PhoneField from "@components/base/form/PhoneField";

const AuthLoginCandidateView = () => {
  const navigate = useNavigate();

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const setLoginState = useSetRecoilState(loginAtom);

  const handleCandidateAuth = useCallback(async (data) => {
    const loginCandidateResponse: IAuthLoginCandidateResponse =
      await AuthApi.loginCandidate({
        ...data,
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
        navigate("/request/reference/list");
      } catch (e) {
        alert("지원자 인증 오류입니다.");
      }
    } else {
      alert(loginCandidateResponse.error);
    }
  }, []);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white">
      <h2 className="text-xl sm:text-2xl leading-6 font-bold text-gray-900">
        지원자 로그인
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleCandidateAuth)}
          noValidate={true}
          className="mt-10 space-y-6 mx-auto"
        >
          <div className="sm:w-2/3">
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
            <label htmlFor="phone" className="label">
              전화번호
            </label>
            <PhoneField />
          </div>

          <button type="submit" className="button sm:w-2/3">
            로그인
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthLoginCandidateView;
