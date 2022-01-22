import { ChangeEvent, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterCorporateRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { IRegisterCorporateFormData } from "@pages/auth/register/corporate/type";

const AuthRegisterCorporatePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registration, setRegistration] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterCorporateFormData>();

  const handleUploadRegistration = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files },
      } = event;
      if (!files || !files[0]) return;
      setRegistration(files[0]);
    },
    []
  );

  const handleRegisterCorporate: SubmitHandler<IRegisterCorporateFormData> =
    useCallback(
      async (data) => {
        if (!registration) {
          alert("사업자등록증을 업로드 해주세요.");
          return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("registration", registration);
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
      },
      [registration]
    );

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <form onSubmit={handleSubmit(handleRegisterCorporate)}>
        <label>기업이름</label>
        <input
          type="text"
          {...register("name", {
            required: "기업이름을 입력해주세요.",
          })}
        />
        <br />
        <ErrorMessage message={errors?.name?.message} />
        <br />
        <label>사업자등록증</label>
        <input type="file" onChange={handleUploadRegistration} />
        <br />
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default AuthRegisterCorporatePage;
