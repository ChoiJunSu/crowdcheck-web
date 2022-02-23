import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { IUserEditPersonalFormData } from "@views/user/edit/UserEditPersonalView/type";
import UserApi from "@api/UserApi";
import { IUserEditPersonalRequest } from "@api/UserApi/type";
import CareerField from "@components/base/form/CareerField";
import { ICareer } from "@api/AuthApi/type";
import PhoneField from "@components/base/form/PhoneField";

const UserEditPersonalView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [careers, setCareers] = useState<Array<ICareer>>([]);
  const methods = useForm<IUserEditPersonalFormData>({
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
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    (async () => {
      const getPersonalResponse = await UserApi.getPersonal({});
      if (!getPersonalResponse.ok) {
        alert(getPersonalResponse.error);
        return;
      }
      const {
        user: { email, name, phone },
        careers,
      } = getPersonalResponse;
      setValue("email", email);
      setValue("name", name);
      setValue("phone", phone);
      setCareers(careers);
    })();
  }, []);

  const handleEditPersonal: SubmitHandler<IUserEditPersonalFormData> =
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
      const editPersonalResponse = await UserApi.editPersonal(
        data as IUserEditPersonalRequest
      );
      if (!editPersonalResponse.ok) {
        alert(editPersonalResponse.error);
        setIsLoading(false);
        return;
      }
      alert("정보가 수정되었습니다.");
      navigate(-1);
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleEditPersonal)} className="form">
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
                      disabled={true}
                      className="input"
                    />
                    <ErrorMessage message={errors?.name?.message} />
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <label htmlFor="name" className="label">
                    전화번호
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("phone", {
                        required: "전화번호를 입력해주세요.",
                        pattern: {
                          value: /^\d+$/,
                          message: "형식이 올바르지 않습니다.",
                        },
                      })}
                      disabled={true}
                      className="input"
                    />
                    <ErrorMessage message={errors?.phone?.message} />
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
                      disabled={true}
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
                      placeholder="변경하실 비밀번호를 입력하세요."
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
              </div>
              <div className="mt-4">
                <CareerField mode="edit" careers={careers} />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              저장하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserEditPersonalView;
