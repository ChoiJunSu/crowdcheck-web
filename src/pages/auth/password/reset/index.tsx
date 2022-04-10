import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@components/form/ErrorMessage";
import { useCallback } from "react";
import PageHeader from "@components/base/PageHeader";
import AuthApi from "@api/AuthApi";
import {
  IEmailSendFormData,
  IPasswordResetFormData,
} from "@pages/auth/password/reset/type";
import {
  IAuthEmailSendRequest,
  IAuthPasswordResetRequest,
} from "@api/AuthApi/type";

const AuthPasswordResetPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const resetToken = params.get("resetToken");
  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmailSend = useCallback(async (data: IEmailSendFormData) => {
    const emailSendResponse = await AuthApi.emailSend(
      data as IAuthEmailSendRequest
    );
    if (!emailSendResponse.ok) {
      alert(emailSendResponse.error);
      return;
    }
    alert("해당 이메일로 비밀번호 재설정 링크를 발송하였습니다.");
    navigate(-1);
  }, []);

  const handlePasswordReset = useCallback(
    async (data: IPasswordResetFormData) => {
      if (getValues("password") !== getValues("passwordConfirm")) {
        setError("passwordConfirm", {
          message: "비밀번호와 일치하지 않습니다.",
        });
        return;
      }
      clearErrors();
      const passwordResetResponse = await AuthApi.passwordReset({
        ...data,
        resetToken,
      } as IAuthPasswordResetRequest);
      if (!passwordResetResponse.ok) {
        alert(passwordResetResponse.error);
        return;
      }
      alert("비밀번호가 재설정되었습니다.");
      navigate("/auth/login");
    },
    [resetToken]
  );

  return (
    <div className="sm:max-w-lg mx-auto">
      <PageHeader title="비밀번호 재설정" />

      {!resetToken && (
        <form onSubmit={handleSubmit(handleEmailSend)} className="form">
          <div className="mt-4">
            <label htmlFor="name" className="label">
              가입하신 이메일을 입력하세요.
            </label>
            <input
              type="email"
              {...register("email", {
                required: "이메일을 입력해주세요.",
              })}
              className="input"
            />
            <ErrorMessage message={errors?.email?.message} />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              비밀번호 재설정하기
            </button>
          </div>
        </form>
      )}

      {resetToken && (
        <form onSubmit={handleSubmit(handlePasswordReset)} className="form">
          <div>
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

          <div className="mt-4 pt-4">
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

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              비밀번호 재설정하기
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthPasswordResetPage;
