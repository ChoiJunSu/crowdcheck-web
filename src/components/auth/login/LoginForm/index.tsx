import { SubmitHandler, useForm } from "react-hook-form";
import AuthApi from "@api/AuthApi";
import { ILoginRequest } from "@api/AuthApi/type";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import {
  ILoginFormData,
  ILoginFormProps,
} from "@components/auth/login/LoginForm/type";

const LoginForm = ({ type }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();
  const setLoginState = useSetRecoilState(loginAtom);
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<ILoginFormData> = async (data) => {
    const loginResponse = await AuthApi.login({
      ...data,
      type,
    } as ILoginRequest);
    if (loginResponse.ok) {
      const { authToken } = loginResponse;
      try {
        const { name } = jwtDecode(authToken) as IAuthTokenPayload;
        setLoginState({
          isLoggedIn: true,
          name,
          authToken,
        });
        localStorage.setItem(LOCAL_AUTH_TOKEN, authToken);
        navigate("/");
      } catch (e) {
        alert("로그인 오류입니다.");
      }
    } else {
      alert(loginResponse.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
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

export default LoginForm;
