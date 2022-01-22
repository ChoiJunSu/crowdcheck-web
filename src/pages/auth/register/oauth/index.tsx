import { useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterOauthRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";
import { IRegisterPersonalFormData } from "@pages/auth/register/personal/type";

const AuthRegisterOauthPage = () => {
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
        <form onSubmit={handleSubmit(handleRegisterOauth)}>
          <label>이름</label>
          <input
            type="text"
            {...register("name", { required: "이름을 입력해주세요." })}
          />
          <br />
          <ErrorMessage message={errors?.name?.message} />
          <br />
          <label>전화번호</label>
          <input
            type="text"
            {...register("phone", {
              required: "전화번호를 입력해주세요.",
              pattern: { value: /^\d*$/, message: "숫자만 입력해주세요." },
            })}
            placeholder="'-'를 제외한 숫자만 입력하세요."
          />
          <br />
          <ErrorMessage message={errors?.phone?.message} />
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

export default AuthRegisterOauthPage;
