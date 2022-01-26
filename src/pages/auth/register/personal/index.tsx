import { useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterPersonalRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";
import { IRegisterPersonalFormData } from "@pages/auth/register/personal/type";
import PhoneField from "@components/auth/register/PhoneField";

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
        <form onSubmit={handleSubmit(handleRegisterPersonal)}>
          <label>이름</label>
          <input
            type="text"
            {...register("name", { required: "이름을 입력해주세요." })}
          />
          <br />
          <ErrorMessage message={errors?.name?.message} />
          <br />
          <label>전화번호</label>
          <PhoneField />
          <label>이메일</label>
          <input
            type="email"
            {...register("email", { required: "이메일을 입력해주세요." })}
          />
          <br />
          <ErrorMessage message={errors?.email?.message} />
          <br />
          <label>비밀번호</label>
          <input
            type="password"
            {...register("password", { required: "비밀번호를 입력해주세요." })}
          />
          <br />
          <ErrorMessage message={errors?.password?.message} />
          <br />
          <label>경력</label>
          <CareerField />
          <br />
          <button type="submit">회원가입</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthRegisterPersonalPage;
