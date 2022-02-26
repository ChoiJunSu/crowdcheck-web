import { SubmitHandler, useForm } from "react-hook-form";
import AuthApi from "@api/AuthApi";
import { IAuthLoginRequest } from "@api/AuthApi/type";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import jwtDecode from "jwt-decode";
import { IAuthTokenPayload } from "@atoms/loginAtom/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import ErrorMessage from "@components/base/form/ErrorMessage";
import { ReactComponent as GoogleLogo } from "@assets/images/google.svg";
import { ReactComponent as KakaoLogo } from "@assets/images/kakao.svg";
import { OAUTH_CLIENT_ID, OAUTH_URL } from "@constants/oauth";
import { useState } from "react";
import { TUserType } from "@api/UserApi/type";
import { IAuthLoginFormData } from "@pages/auth/login/type";

const tabs = [
  // { name: "개인 회원", type: "personal" },
  { name: "전문가 회원", type: "expert" },
  { name: "기업 회원", type: "corporate" },
];

const AuthLoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthLoginFormData>();
  const setLoginState = useSetRecoilState(loginAtom);
  const [type, setType] = useState<TUserType>("expert");

  const oauthLoginButtons = [
    {
      icon: GoogleLogo,
      text: "구글로 시작하기",
      style: "bg-[#ffffff] hover:bg-gray-100 text-[#000000]",
      href: `${OAUTH_URL.GOOGLE}?response_type=code&client_id=${OAUTH_CLIENT_ID.GOOGLE}&redirect_uri=${process.env.REACT_APP_WEB_URL}/auth/login/oauth/${type}/callback/google&scope=https://www.googleapis.com/auth/userinfo.email`,
    },
    {
      icon: KakaoLogo,
      text: "카카오로 시작하기",
      style: "bg-[#fee500] hover:bg-[#e5cf00] text-[#000000]/15",
      href: `${OAUTH_URL.KAKAO}?response_type=code&client_id=${OAUTH_CLIENT_ID.KAKAO}&redirect_uri=${process.env.REACT_APP_WEB_URL}/auth/login/oauth/${type}/callback/kakao`,
    },
  ];

  const handleLogin: SubmitHandler<IAuthLoginFormData> = async (data) => {
    const loginResponse = await AuthApi.login({
      ...data,
      type,
    } as IAuthLoginRequest);
    if (loginResponse.ok) {
      const { authToken } = loginResponse;
      try {
        const { name, type } = jwtDecode(authToken) as IAuthTokenPayload;
        setLoginState({
          isLoggedIn: true,
          authToken,
          name,
          type,
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
    <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white">
      <nav className="block-mb-px flex" aria-label="Tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              tab.type === type
                ? "border-cc-green text-cc-green"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } w-2/4 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-lg`}
            aria-current={tab.type === type ? "page" : undefined}
            onClick={() => setType(tab.type as TUserType)}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      <form
        onSubmit={handleSubmit(handleLogin)}
        noValidate={true}
        className="mt-10 space-y-6"
      >
        <div>
          <label htmlFor="email" className="label">
            이메일
          </label>
          <div className="mt-1">
            <input
              type="email"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
              className="input"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="label">
            비밀번호
          </label>
          <div className="mt-1">
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
              })}
              className="input"
            />
            <ErrorMessage message={errors.password?.message} />
          </div>
        </div>

        <div className="flex justify-end">
          {type === "personal" && (
            <div>
              <Link
                to="/auth/register/personal"
                className="block font-medium text-md sm:text-lg text-gray-400 hover:text-gray-500 underline"
              >
                이메일로 가입하기
              </Link>
              <Link
                to="/auth/login/candidate"
                className="flex justify-end font-medium text-md sm:text-lg text-gray-400 hover:text-gray-500 underline"
              >
                지원자로 로그인하기
              </Link>
            </div>
          )}

          {type === "corporate" && (
            <Link
              to="/auth/register/corporate"
              className="font-medium text-sm sm:text-lg text-gray-400 hover:text-gray-500 underline"
            >
              기업 회원으로 가입하기
            </Link>
          )}

          {type === "expert" && (
            <Link
              to="/auth/register/expert"
              className="font-medium text-sm sm:text-lg text-gray-400 hover:text-gray-500 underline"
            >
              전문가 회원으로 가입하기
            </Link>
          )}
        </div>

        <button type="submit" className="button">
          로그인
        </button>
      </form>

      {(type === "personal" || type === "expert") && (
        <div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm sm:text-lg">
                <span className="px-2 bg-white text-gray-500 font-medium">
                  또는
                </span>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {oauthLoginButtons.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    location.href = item.href;
                  }}
                  className={`${item.style} w-full inline-flex justify-evenly py-2 px-8 border border-gray-200 rounded-md shadow-sm text-sm sm:text-lg font-medium`}
                >
                  <item.icon className="h-6 w-auto self-center" />
                  <p className="w-2/3 self-center">{item.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLoginPage;
