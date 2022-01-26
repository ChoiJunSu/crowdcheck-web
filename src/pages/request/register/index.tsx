import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { IRequestRegisterRequest } from "@api/RequestApi/type";
import { WEB_URL } from "@constants/url";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/base/form/ErrorMessage";
import CareerField from "@components/base/form/CareerField";
import { IRequestRegisterFormData } from "@pages/request/register/type";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";

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
  const methods = useForm<IRequestRegisterFormData>({
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
      console.log(
        `${WEB_URL}/auth/login/candidate?code=${requestRegisterResponse.code}`
      );
      navigate("/request/list");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRequestRegister)}>
          <label>이름</label>
          <input
            type="text"
            {...register("name", { required: "이름을 입력해주세요." })}
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
          />
          <br />
          <label>경력</label>
          <CareerField />
          <br />
          <label>질문</label>
          <input
            type="textarea"
            {...register("question", { required: "질문을 입력해주세요." })}
          />
          <br />
          <ErrorMessage message={errors?.question?.message} />
          <br />
          <label>마감일</label>
          <input type="date" {...register("deadline")} />
          <br />
          <button type="submit">등록하기</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestRegisterPage;
