import { useCallback, useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { IRequestReferenceRegisterRequest } from "@api/RequestApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/form/ErrorMessage";
import CareerField from "@components/form/CareerField";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { IRequestReferenceRegisterFormData } from "@pages/request/reference/register/type";
import SelectBox from "@components/form/SelectBox";

const rewardNums = [...Array(10).keys()].map((num) => ({
  name: `${num + 1} 명`,
  value: num + 1,
}));

const rewardAmounts = [...Array(10).keys()].map((num) => ({
  name: `${((num + 1) * 10000).toLocaleString()} 원`,
  value: (num + 1) * 10000,
}));

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
      rewardNum: rewardNums[0].value,
      rewardAmount: rewardAmounts[0].value,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const rewardNum = useWatch({ control, name: "rewardNum" });
  const rewardAmount = useWatch({ control, name: "rewardAmount" });

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
      <h1 className="text-gray-500 font-medium sm:text-xl text-center">
        준비 중입니다. 조금만 기다려주세요.
      </h1>
      {/*<FormProvider {...methods}>*/}
      {/*  <form onSubmit={handleSubmit(handleRequestRegister)} className="form">*/}
      {/*    <div>*/}
      {/*      <div>*/}
      {/*        <h3 className="h3">지원자 기본 정보</h3>*/}
      {/*      </div>*/}

      {/*      <div className="my-4 flex flex-col gap-y-4">*/}
      {/*        <div className="sm:w-1/2">*/}
      {/*          <label htmlFor="name" className="label">*/}
      {/*            이름*/}
      {/*          </label>*/}
      {/*          <div className="mt-1">*/}
      {/*            <input*/}
      {/*              type="text"*/}
      {/*              {...register("name", {*/}
      {/*                required: "이름을 입력해주세요.",*/}
      {/*              })}*/}
      {/*              className="input"*/}
      {/*            />*/}
      {/*            <ErrorMessage message={errors?.name?.message} />*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*        <div className="sm:w-1/2">*/}
      {/*          <label htmlFor="phone" className="label">*/}
      {/*            전화번호*/}
      {/*          </label>*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            {...register("phone", {*/}
      {/*              required: "전화번호를 입력해주세요.",*/}
      {/*              pattern: {*/}
      {/*                value: /^\d*$/,*/}
      {/*                message: "숫자만 입력해주세요.",*/}
      {/*              },*/}
      {/*            })}*/}
      {/*            className="input"*/}
      {/*            placeholder="'-'를 제외한 숫자만 입력하세요."*/}
      {/*          />*/}
      {/*          <ErrorMessage message={errors.phone?.message} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="my-8 pt-8">*/}
      {/*      <h3 className="h3">지원자 경력 정보</h3>*/}
      {/*      <div className="mt-4">*/}
      {/*        <CareerField />*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="pt-8">*/}
      {/*      <h3 className="h3">의뢰 정보</h3>*/}

      {/*      <div className="mt-4">*/}
      {/*        <label className="label">질문</label>*/}
      {/*        <textarea*/}
      {/*          {...register("question", { required: "질문을 입력해주세요." })}*/}
      {/*          rows={10}*/}
      {/*          placeholder="지원자에 대해 궁금한 점을 작성해주세요."*/}
      {/*          className="input"*/}
      {/*        />*/}
      {/*        <ErrorMessage message={errors?.question?.message} />*/}
      {/*      </div>*/}

      {/*      <div className="mt-4">*/}
      {/*        <label className="label">마감일</label>*/}
      {/*        <input type="date" {...register("deadline")} className="input" />*/}
      {/*        <ErrorMessage message={errors?.deadline?.message} />*/}
      {/*      </div>*/}

      {/*      <div className="mt-4">*/}
      {/*        <label className="label">선정 답변 수</label>*/}
      {/*        <div className="mt-1">*/}
      {/*          <SelectBox name={"rewardNum"} options={rewardNums} />*/}
      {/*          <ErrorMessage message={errors?.rewardNum?.message} />*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div className="mt-4">*/}
      {/*        <label className="label">선정 답변 당 보상금</label>*/}
      {/*        <div className="mt-1">*/}
      {/*          <SelectBox name={"rewardAmount"} options={rewardAmounts} />*/}
      {/*          <ErrorMessage message={errors?.rewardAmount?.message} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="pt-8">*/}
      {/*      <h3 className="h3 mb-4">결제 금액</h3>*/}

      {/*      <dl className="mt-4 p-4 bg-gray-100 rounded-lg divide-y divide-gray-300 font-medium text-sm sm:text-lg lg:mt-0 lg:col-span-5">*/}
      {/*        <div className="pb-4 flex items-center justify-between">*/}
      {/*          <dt className="text-gray-500">선정 답변에 대한 총 보상금</dt>*/}
      {/*          <dd className="text-gray-900">{`${(*/}
      {/*            rewardNum * rewardAmount*/}
      {/*          ).toLocaleString()} 원`}</dd>*/}
      {/*        </div>*/}
      {/*        <div className="py-4 flex items-center justify-between">*/}
      {/*          <dt className="text-gray-500">답변 선정 보증금 (10%)</dt>*/}
      {/*          <dd className="text-gray-900">{`${(*/}
      {/*            rewardNum **/}
      {/*            rewardAmount **/}
      {/*            0.1*/}
      {/*          ).toLocaleString()} 원`}</dd>*/}
      {/*        </div>*/}
      {/*        <div className="py-4 flex items-center justify-between">*/}
      {/*          <dt className="text-gray-500">부가가치세 (10%)</dt>*/}
      {/*          <dd className="text-gray-900">{`${(*/}
      {/*            rewardNum **/}
      {/*            rewardAmount **/}
      {/*            0.1*/}
      {/*          ).toLocaleString()} 원`}</dd>*/}
      {/*        </div>*/}
      {/*        <div className="pt-4 flex items-center justify-between">*/}
      {/*          <dt className="text-gray-900">총 결제금액</dt>*/}
      {/*          <dd className="text-cc-green">{`${(*/}
      {/*            rewardNum **/}
      {/*            rewardAmount **/}
      {/*            1.2*/}
      {/*          ).toLocaleString()} 원`}</dd>*/}
      {/*        </div>*/}
      {/*      </dl>*/}
      {/*    </div>*/}

      {/*    <div className="mt-8 pt-8 border-t border-gray-300">*/}
      {/*      <button type="submit" className="button">*/}
      {/*        결제 및 등록하기*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</FormProvider>*/}
    </div>
  );
};

export default RequestReferenceRegisterPage;
