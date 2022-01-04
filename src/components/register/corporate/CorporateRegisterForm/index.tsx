import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { ICorporateRegisterRequest } from "@api/AuthApi/type";
import { ICorporateRegisterFormData } from "@components/register/corporate/CorporateRegisterForm/type";
import { useState } from "react";
import Loading from "@components/base/Loading";

const CorporateRegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICorporateRegisterFormData>();
  const navigate = useNavigate();

  const handleCorporateRegister: SubmitHandler<
    ICorporateRegisterFormData
  > = async (data) => {
    setIsLoading(true);
    const corporateRegisterResponse = await AuthApi.corporateRegister(
      data as ICorporateRegisterRequest
    );
    if (corporateRegisterResponse.ok) {
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      navigate("/login/corporate");
    } else {
      alert(corporateRegisterResponse.error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <form onSubmit={handleSubmit(handleCorporateRegister)}>
        <label>기업이름</label>
        <input type="name" {...register("name", { required: true })} />
        <br />
        {errors.name && <span>기업이름을 입력해주세요.</span>}
        <br />
        <label>전화번호</label>
        <input type="phone" {...register("phone", { required: true })} />
        <br />
        {errors.email && <span>전화번호를 입력해주세요.</span>}
        <br />
        <label>이메일</label>
        <input type="email" {...register("email", { required: true })} />
        <br />
        {errors.email && <span>이메일을 입력해주세요.</span>}
        <br />
        <label>비밀번호</label>
        <input type="password" {...register("password", { required: true })} />
        <br />
        {errors.password && <span>비밀번호를 입력해주세요.</span>}
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default CorporateRegisterForm;
