import { useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterPersonalRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";
import { IRegisterPersonalFormData } from "@pages/auth/register/personal/type";
import PhoneField from "@components/base/form/PhoneField";

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
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRegisterPersonal: SubmitHandler<IRegisterPersonalFormData> =
    useCallback(async (data) => {
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
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                기본 정보
              </h3>
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
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                로그인 정보
              </h3>
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
                    })}
                    className="input"
                  />
                  <ErrorMessage message={errors?.password?.message} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                경력 정보
              </h3>
            </div>
            <div className="mt-4">
              <CareerField />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cc-green hover:cc-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cc-green"
            >
              가입하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthRegisterPersonalPage;
