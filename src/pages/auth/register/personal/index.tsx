import { useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterPersonalRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/form/ErrorMessage";
import CareerField from "@components/form/CareerField";
import { IRegisterPersonalFormData } from "@pages/auth/register/personal/type";
import PhoneField from "@components/form/PhoneField";
import PolicyField from "@components/form/PolicyField";

const AuthRegisterPersonalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IRegisterPersonalFormData>({
    defaultValues: {
      careers: [
        {
          corporateName: "",
          startAt: new Date().toISOString().substring(0, 10),
          endAt: null,
        },
      ],
    },
  });
  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRegisterPersonal: SubmitHandler<IRegisterPersonalFormData> =
    useCallback(async (data) => {
      if (getValues("password") !== getValues("passwordConfirm")) {
        setError("passwordConfirm", {
          type: "validate",
          message: "비밀번호와 일치하지 않습니다.",
        });
        return;
      }
      clearErrors();
      setIsLoading(true);
      const registerPersonalResponse = await AuthApi.registerPersonal(
        data as IAuthRegisterPersonalRequest
      );
      if (registerPersonalResponse.ok) {
        alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        navigate("/auth/login");
      } else {
        alert(registerPersonalResponse.error);
        setIsLoading(false);
      }
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegisterPersonal)} className="form">
          <div>
            <div>
              <h3 className="h3">기본 정보</h3>
            </div>

            <div className="mt-4 flex flex-col gap-y-4 ">
              <div className="sm:w-1/2">
                <label htmlFor="name" className="label">
                  이름
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register("name", {
                      required: "이름을 입력해주세요.",
                    })}
                    className="input"
                  />
                  <ErrorMessage message={errors?.name?.message} />
                </div>
              </div>

              <div className="sm:w-3/4">
                <label htmlFor="phone" className="label">
                  전화번호
                </label>
                <div className="mt-1">
                  <PhoneField />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="h3">로그인 정보</h3>
            </div>

            <div className="mt-4 flex flex-col gap-y-4 ">
              <div className="sm:w-1/2">
                <label htmlFor="email" className="label">
                  이메일
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    {...register("email", {
                      required: "이메일을 입력하세요.",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "이메일 형식이 올바르지 않습니다.",
                      },
                    })}
                    className="input"
                  />
                  <ErrorMessage message={errors.email?.message} />
                </div>
              </div>

              <div className="sm:w-1/2">
                <label htmlFor="password" className="label">
                  비밀번호
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                      minLength: {
                        value: 8,
                        message: "8자 이상 입력해주세요.",
                      },
                    })}
                    placeholder="8자 이상 입력하세요."
                    className="input"
                  />
                  <ErrorMessage message={errors?.password?.message} />
                </div>
              </div>

              <div className="sm:w-1/2">
                <label htmlFor="passwordConfirm" className="label">
                  비밀번호 확인
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("passwordConfirm", {
                      required: "비밀번호 확인을 입력해주세요.",
                      minLength: {
                        value: 8,
                        message: "8자 이상 입력해주세요.",
                      },
                    })}
                    className="input"
                  />
                  <ErrorMessage message={errors?.passwordConfirm?.message} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="h3">경력 정보</h3>
              <label className="label">
                지원자의 평판 작성 요청을 받아 가입하시는 경우
                <br />
                해당 지원자와 함께 일했던 경력은 필수적으로 입력해주세요.
              </label>
            </div>

            <div className="my-4 sm:my-8">
              <CareerField />
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="h3">추천인 정보 (선택)</h3>
            </div>

            <div className="my-4">
              <label htmlFor="passwordConfirm" className="label">
                추천인이 계시다면 해당 사용자의 추천인 코드를 입력해주세요.
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("recommenderCode")}
                  className="input"
                />
                <ErrorMessage message={errors?.recommenderCode?.message} />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="h3">정책 동의</h3>
            </div>
            <div className="mt-4">
              <PolicyField mode="authRegister" />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              가입하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthRegisterPersonalPage;
