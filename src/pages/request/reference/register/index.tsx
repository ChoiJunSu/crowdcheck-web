import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { IRequestReferenceRegisterRequest } from "@api/RequestApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { IRequestReferenceRegisterFormData } from "@pages/request/reference/register/type";

const RequestReferenceRegisterPage = () => {
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
  const methods = useForm<IRequestReferenceRegisterFormData>({
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

  const handleRequestRegister: SubmitHandler<IRequestReferenceRegisterFormData> =
    useCallback(async (data) => {
      setIsLoading(true);
      const requestRegisterResponse = await RequestApi.referenceRegister(
        data as IRequestReferenceRegisterRequest
      );
      if (!requestRegisterResponse.ok) {
        alert(requestRegisterResponse.error);
        setIsLoading(false);
        return;
      }
      alert("의뢰가 등록되었습니다. 지원자에게 동의 링크가 발송됩니다.");
      navigate("/request/reference/list");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRequestRegister)} className="form">
          <div>
            <div>
              <h3 className="h3">지원자 기본 정보</h3>
            </div>

            <div className="my-4 flex flex-col gap-y-4">
              <div className="sm:w-1/2">
                <label htmlFor="name" className="label">
                  이름
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register("name", {
                      required: "이름을 입력해주세요.",
                    })}
                    className="input"
                  />
                  <ErrorMessage message={errors?.name?.message} />
                </div>
              </div>

              <div className="sm:w-1/2">
                <label htmlFor="phone" className="label">
                  전화번호
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "전화번호를 입력해주세요.",
                    pattern: {
                      value: /^\d*$/,
                      message: "숫자만 입력해주세요.",
                    },
                  })}
                  className="input"
                  placeholder="'-'를 제외한 숫자만 입력하세요."
                />
                <ErrorMessage message={errors.phone?.message} />
              </div>
            </div>
          </div>

          <div className="my-8 pt-8">
            <h3 className="h3">지원자 경력 정보</h3>
            <div className="mt-4">
              <CareerField />
            </div>
          </div>

          <div className="pt-8">
            <h3 className="h3">의뢰 정보</h3>
            <div className="mt-4">
              <label className="label">질문</label>
              <textarea
                {...register("question", { required: "질문을 입력해주세요." })}
                rows={10}
                className="input"
              />
              <ErrorMessage message={errors?.question?.message} />
            </div>
            <div className="mt-4">
              <label className="label">마감일</label>
              <input type="date" {...register("deadline")} className="input" />
              <ErrorMessage message={errors?.deadline?.message} />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <button type="submit" className="button">
              등록하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestReferenceRegisterPage;
