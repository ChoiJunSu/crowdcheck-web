import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import {
  ICorporate,
  ICorporateSearchRequest,
  ICorporateSearchResponse,
} from "@api/CorporateApi/type";
import { useNavigate } from "react-router-dom";
import CorporateApi from "@api/CorporateApi";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { IUserEditPersonalFormData } from "@views/user/edit/UserEditPersonalView/type";
import UserApi from "@api/UserApi";
import { IUserEditPersonalRequest } from "@api/UserApi/type";
import CareerField from "@components/base/form/CareerField";
import { ICareer } from "@api/AuthApi/type";

const UserEditPersonalPage = () => {
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
    control,
    watch,
    setValue,
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
        <form onSubmit={handleSubmit(handleEditPersonal)}>
          <label>이름</label>
          <input
            type="text"
            {...register("name", { required: "이름을 입력해주세요." })}
            disabled={true}
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
            disabled={true}
          />
          <br />
          <ErrorMessage message={errors?.phone?.message} />
          <br />
          <label>이메일</label>
          <input
            type="email"
            {...register("email", { required: "이메일을 입력해주세요." })}
            disabled={true}
          />
          <br />
          <ErrorMessage message={errors?.email?.message} />
          <br />
          <label>비밀번호</label>
          <input type="password" {...register("password")} />
          <br />
          <ErrorMessage message={errors?.password?.message} />
          <br />
          <label>경력</label>
          <CareerField careers={careers} />
          <br />
          <button type="submit">저장하기</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserEditPersonalPage;
