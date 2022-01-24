import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { IUserEditPersonalFormData } from "@views/user/edit/UserEditPersonalView/type";
import UserApi from "@api/UserApi";
import { IUserEditCorporateRequest } from "@api/UserApi/type";
import { IUserEditCorporateFormData } from "@views/user/edit/UserEditCorporateView/type";

const UserEditCorporateView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEditPersonalFormData>();

  useEffect(() => {
    (async () => {
      const getCorporateResponse = await UserApi.getCorporate({});
      if (!getCorporateResponse.ok) {
        alert(getCorporateResponse.error);
        return;
      }
      const {
        user: { email, name, phone },
      } = getCorporateResponse;
      setValue("email", email);
      setValue("name", name);
      setValue("phone", phone);
    })();
  }, []);

  const handleEditCorporate: SubmitHandler<IUserEditCorporateFormData> =
    useCallback(async (data) => {
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

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <form onSubmit={handleSubmit(handleEditCorporate)}>
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
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
};

export default UserEditCorporateView;
