import { SubmitHandler, useForm } from "react-hook-form";
import { ICorporateLoginFormData } from "@components/login/corporate/CorporateLoginForm/type";
import AuthApi from "@api/AuthApi";
import { ICorporateLoginRequest } from "@api/AuthApi/type";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

const CorporateLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICorporateLoginFormData>();
  const setLoginState = useSetRecoilState(loginAtom);
  const navigate = useNavigate();

  const handleCorporateLogin: SubmitHandler<ICorporateLoginFormData> = async (
    data
  ) => {
    const corporateLoginResponse = await AuthApi.corporateLogin(
      data as ICorporateLoginRequest
    );
    if (corporateLoginResponse.ok) {
      const { authToken } = corporateLoginResponse.data;
      try {
        const { email } = jwtDecode(authToken) as IAuthTokenPayload;
        setLoginState({
          isLoggedIn: true,
          email,
          authToken,
        });
        localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
        navigate("/");
      } catch (e) {
        alert("로그인 오류입니다.");
      }
    } else {
      alert(corporateLoginResponse.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCorporateLogin)}>
        <label>이메일</label>
        <input type="email" {...register("email", { required: true })} />
        <br />
        {errors.email && <span>이메일을 입력해주세요.</span>}
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          {...register("password", { required: true })}
        />{" "}
        <br />
        {errors.password && <span>비밀번호를 입력해주세요.</span>}
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default CorporateLoginForm;
