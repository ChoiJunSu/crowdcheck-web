import { ChangeEvent, useCallback, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterCorporateRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { IRegisterCorporateFormData } from "@pages/auth/register/corporate/type";
import { useNavigate } from "react-router-dom";
import PhoneField from "@components/base/form/PhoneField";
import CareerField from "@components/base/form/CareerField";

const AuthRegisterCorporatePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IRegisterCorporateFormData>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const handleUploadCertificate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files },
      } = event;
      if (!files || !files[0]) return;
      setValue("certificate", files[0]);
    },
    []
  );

  const handleRegisterCorporate: SubmitHandler<IRegisterCorporateFormData> =
    useCallback(async (data) => {
      if (!getValues("certificate")) {
        setError("certificate", {
          type: "required",
          message: "사업자등록증을 업로드 해주세요.",
        });
        return;
      }
      clearErrors();
      setIsLoading(true);
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      const registerCorporateResponse = await AuthApi.registerCorporate({
        formData,
      } as IAuthRegisterCorporateRequest);
      setIsLoading(false);
      if (!registerCorporateResponse.ok) {
        alert(registerCorporateResponse.error);
        return;
      }
      alert(
        "회원가입 신청이 완료되었습니다. 사업자등록증 확인이 완료되면 서비스를 이용하실 수 있습니다. 최대 2 영업일이 소요되며 전화번호로 알려드립니다."
      );
      navigate("/");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegisterCorporate)} className="form">
          <div className="space-y-8 divide-y divide-gray-200">
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

                <div className="sm:w-1/2">
                  <label htmlFor="certificate" className="label">
                    사업자등록증
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      onChange={handleUploadCertificate}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                    />
                    <ErrorMessage message={errors?.certificate?.message} />
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

            <div className="mt-8 pt-8 border-t border-gray-300">
              <button type="submit" className="button">
                가입하기
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthRegisterCorporatePage;
