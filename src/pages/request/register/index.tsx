import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { IRequestRegisterRequest } from "@api/RequestApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/form/ErrorMessage";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { IRequestRegisterFormData } from "@pages/request/register/type";

const RequestRegisterPage = () => {
  const navigate = useNavigate();
  const { type } = useRecoilValue(loginAtom);

  useEffect(() => {
    if (type !== "corporate") {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IRequestRegisterFormData>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleRequestRegister: SubmitHandler<IRequestRegisterFormData> =
    useCallback(async (data) => {
      setIsLoading(true);
      const requestRegisterResponse = await RequestApi.register(
        data as IRequestRegisterRequest
      );
      if (!requestRegisterResponse.ok) {
        alert(requestRegisterResponse.error);
        setIsLoading(false);
        return;
      }
      alert("의뢰가 등록되었습니다. 지원자에게 동의 링크가 발송됩니다.");
      navigate("/request/list");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="sm:max-w-lg mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRequestRegister)} className="form">
          <div>
            <div>
              <h3 className="h3">지원자 정보</h3>
            </div>

            <div className="my-4 flex flex-col gap-y-4">
              <div>
                <label htmlFor="name" className="label">
                  지원자 이름
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register("candidateName", {
                      required: "지원자 이름을 입력해주세요.",
                    })}
                    className="input"
                  />
                  <ErrorMessage message={errors?.candidateName?.message} />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="label">
                  지원자 전화번호
                </label>
                <input
                  type="text"
                  {...register("candidatePhone", {
                    required: "지원자 전화번호를 입력해주세요.",
                    pattern: {
                      value: /^\d*$/,
                      message: "숫자만 입력해주세요.",
                    },
                  })}
                  className="input"
                  placeholder="'-'를 제외한 숫자만 입력하세요."
                />
                <ErrorMessage message={errors.candidatePhone?.message} />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              조회 요청하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestRegisterPage;
