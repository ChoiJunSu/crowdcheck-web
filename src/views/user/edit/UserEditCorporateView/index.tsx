import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/form/ErrorMessage";
import { IUserEditPersonalFormData } from "@views/user/edit/UserEditPersonalView/type";
import UserApi from "@api/UserApi";
import { IUserEditCorporateRequest } from "@api/UserApi/type";
import { IUserEditCorporateFormData } from "@views/user/edit/UserEditCorporateView/type";
import AuthApi from "@api/AuthApi";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";

const UserEditCorporateView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEditPersonalFormData>();
  const setLoginState = useSetRecoilState(loginAtom);

  useEffect(() => {
    (async () => {
      const userGetEditCorporate = await UserApi.getEditCorporate();
      if (!userGetEditCorporate.ok) {
        alert(userGetEditCorporate.error);
        return;
      }
      const {
        user: { email, name, phone },
      } = userGetEditCorporate;
      setValue("email", email);
      setValue("name", name);
      setValue("phone", phone);
    })();
  }, []);

  const handleEditCorporate: SubmitHandler<IUserEditCorporateFormData> =
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
      const editCorporateResponse = await UserApi.editCorporate(
        data as IUserEditCorporateRequest
      );
      if (!editCorporateResponse.ok) {
        alert(editCorporateResponse.error);
        setIsLoading(false);
        return;
      }
      alert("정보가 수정되었습니다.");
      navigate(-1);
    }, []);

  const handleWithdraw = useCallback(async () => {
    if (!confirm("정말로 탈퇴하시겠습니까?")) return;
    const authWithdrawResponse = await UserApi.withdraw();
    if (!authWithdrawResponse.ok) {
      alert(authWithdrawResponse.error);
      return;
    }
    alert("탈퇴가 완료되었습니다.");
    setLoginState({
      isLoggedIn: false,
      authToken: null,
      name: null,
      type: null,
    });
    localStorage.removeItem(LOCAL_AUTH_TOKEN);
    navigate("/");
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <form onSubmit={handleSubmit(handleEditCorporate)} className="form">
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

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              저장하기
            </button>
            <button
              type="button"
              onClick={handleWithdraw}
              className="mt-4 w-full flex place-content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-lg font-medium text-white bg-red-500 hover:bg-red-800"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEditCorporateView;
