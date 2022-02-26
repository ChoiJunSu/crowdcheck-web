import { ChangeEvent, useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterExpertRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import PhoneField from "@components/base/form/PhoneField";
import { IRegisterExpertFormData } from "@pages/auth/register/expert/type";
import SpecialtyField from "@components/base/form/SpecialtyField";

const AuthRegisterOauthExpertPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const registerToken = searchParams.get("registerToken");
  if (!registerToken) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IRegisterExpertFormData>();
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

  const handleRegisterExpert: SubmitHandler<IRegisterExpertFormData> =
    useCallback(async (data) => {
      if (getValues("password") !== getValues("passwordConfirm")) {
        setError("passwordConfirm", {
          type: "validate",
          message: "비밀번호와 일치하지 않습니다.",
        });
        return;
      }
      if (!getValues("certificate")) {
        setError("certificate", {
          type: "required",
          message: "증빙서류를 업로드 해주세요.",
        });
        return;
      }
      clearErrors();
      setIsLoading(true);
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      const registerExpertResponse = await AuthApi.registerExpert({
        formData,
      } as IAuthRegisterExpertRequest);
      setIsLoading(false);
      if (!registerExpertResponse.ok) {
        alert(registerExpertResponse.error);
        return;
      }
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      navigate("/auth/login");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegisterExpert)} className="form">
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

              <div className="mt-4 flex flex-col gap-y-4 ">
                <div className="sm:w-1/2">
                  <label htmlFor="specialty" className="label">
                    직군
                  </label>
                  <div className="mt-1">
                    <SpecialtyField />
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <label htmlFor="certificate" className="label">
                    증빙서류
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

export default AuthRegisterOauthExpertPage;
