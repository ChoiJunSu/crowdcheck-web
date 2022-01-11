import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IRegisterCorporateRequest } from "@api/AuthApi/type";
import { IRegisterCorporateFormData } from "@components/auth/register/corporate/RegisterCorporateForm/type";
import { useCallback, useEffect, useState } from "react";
import Loading from "@components/base/Loading";
import CorporateApi from "@api/CorporateApi";
import {
  ICorporate,
  ISearchRequest,
  ISearchResponse,
} from "@api/CorporateApi/type";
import ErrorMessage from "@components/base/form/ErrorMessage";

const RegisterCorporateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterCorporateFormData>();
  const watchName = watch("name");
  const [corporates, setCorporates] = useState<Array<ICorporate>>([]);
  const [isNameDisabled, setIsNameDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNameDisabled || !watchName) {
      setCorporates([]);
      return;
    }
    (async () => {
      const searchResult: ISearchResponse = await CorporateApi.search({
        word: watchName,
      } as ISearchRequest);
      if (!searchResult.ok) alert(searchResult.error);
      setCorporates(searchResult.corporates);
    })();
  }, [watchName]);

  const handleSelectName = useCallback(({ id, name }: ICorporate) => {
    setCorporates([]);
    setIsNameDisabled(true);
    setValue("name", name);
  }, []);

  const handleAddCorporate = useCallback(() => {}, []);

  const handleRegisterCorporate: SubmitHandler<IRegisterCorporateFormData> =
    useCallback(async (data) => {
      setIsLoading(true);
      const registerCorporateResponse = await AuthApi.registerCorporate(
        data as IRegisterCorporateRequest
      );
      if (registerCorporateResponse.ok) {
        alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        navigate("/auth/login");
      } else {
        alert(registerCorporateResponse.error);
        setIsLoading(false);
      }
    }, []);

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
          disabled={isNameDisabled}
        />
        <ul>
          {corporates?.map((corporate, index) => {
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSelectName(corporate)}
                >
                  {corporate.name}
                </button>
              </li>
            );
          })}
          {corporates?.length > 0 && corporates?.length < 10 && (
            <button type="button" onClick={handleAddCorporate}>
              새 기업 등록하기
            </button>
          )}
        </ul>
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

export default RegisterCorporateForm;
