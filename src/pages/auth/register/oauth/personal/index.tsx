import { useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterOauthRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";
import { IRegisterPersonalFormData } from "@pages/auth/register/personal/type";
import PhoneField from "@components/base/form/PhoneField";

const AuthRegisterOauthPersonalPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const registerToken = searchParams.get("registerToken");
  if (!registerToken) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

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

  const handleRegisterOauth: SubmitHandler<IRegisterPersonalFormData> =
    useCallback(async (data) => {
      setIsLoading(true);
      const registerOauthResponse = await AuthApi.registerOauth({
        ...data,
        registerToken,
      } as IAuthRegisterOauthRequest);
      if (registerOauthResponse.ok) {
        alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        navigate("/auth/login");
      } else {
        alert(registerOauthResponse.error);
        setIsLoading(false);
      }
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegisterOauth)} className="form">
          <div className="space-y-8 divide-y divide-gray-200">
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
                <h3 className="h3">경력 정보</h3>
              </div>
              <div className="mt-4">
                <CareerField />
              </div>
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

export default AuthRegisterOauthPersonalPage;
