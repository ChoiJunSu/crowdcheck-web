import {
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterPersonalRequest } from "@api/AuthApi/type";
import { useCallback, useEffect, useState } from "react";
import Loading from "@components/base/Loading";
import CorporateApi from "@api/CorporateApi";
import {
  ICorporate,
  ICorporateSearchRequest,
  ICorporateSearchResponse,
} from "@api/CorporateApi/type";
import ErrorMessage from "@components/base/form/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IRequestRegisterFormData } from "@components/request/register/RequestRegisterForm/type";
import RequestApi from "@api/RequestApi";
import { IRequestRegisterRequest } from "@api/RequestApi/type";

const RequestRegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestRegisterFormData>({
    defaultValues: {
      career: [
        {
          name: "",
          startAt: new Date(),
          endAt: null,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "career",
  });
  const watchCareer = watch("career");
  const [careerFocusIndex, setCareerFocusIndex] = useState<number>(0);
  const [corporates, setCorporates] = useState<Array<ICorporate>>([]);
  const [isCareerNameDisabled, setIsCareerNameDisabled] = useState<
    Array<boolean>
  >([false]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      careerFocusIndex === undefined ||
      isCareerNameDisabled[careerFocusIndex] ||
      !watchCareer[careerFocusIndex]?.name
    ) {
      setCorporates([]);
      return;
    }
    (async () => {
      const searchResult: ICorporateSearchResponse = await CorporateApi.search({
        word: watchCareer[careerFocusIndex].name,
      } as ICorporateSearchRequest);
      if (!searchResult.ok) alert(searchResult.error);
      setCorporates(searchResult.corporates);
    })();
  }, [careerFocusIndex, watchCareer[careerFocusIndex]?.name]);

  const handleAddCorporate = useCallback(() => {}, []);

  const handleSelectCareerName = useCallback(
    ({ id, name }: ICorporate, careerIndex: number) => {
      setCorporates([]);
      setIsCareerNameDisabled([
        ...isCareerNameDisabled.slice(0, careerIndex),
        true,
        ...isCareerNameDisabled.slice(careerIndex + 1),
      ]);
      setValue(`career.${careerIndex}.name`, name);
    },
    [isCareerNameDisabled]
  );

  const handleAppendCareer = useCallback(() => {
    setIsCareerNameDisabled([...isCareerNameDisabled, false]);
    append({
      name: "",
      startAt: new Date(),
      endAt: null,
    });
  }, [isCareerNameDisabled]);

  const handleRemoveCareer = useCallback(
    (careerIndex: number) => {
      setIsCareerNameDisabled([
        ...isCareerNameDisabled.slice(0, careerIndex),
        ...isCareerNameDisabled.slice(careerIndex + 1),
      ]);
      remove(careerIndex);
    },
    [isCareerNameDisabled]
  );

  const handleRequestRegister: SubmitHandler<IRequestRegisterFormData> =
    useCallback(async (data) => {
      setIsLoading(true);
      const requestRegisterResponse = await RequestApi.register(
        data as IRequestRegisterRequest
      );
      if (requestRegisterResponse.ok) {
        alert("의뢰가 등록되었습니다.");
        navigate("/request/list");
      } else {
        alert(requestRegisterResponse.error);
        setIsLoading(false);
      }
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
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
        <table>
          <thead>
            <tr>
              <th>기업이름</th>
              <th>부서</th>
              <th>입사일</th>
              <th>퇴사일</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr key={field.id}>
                  <td>
                    <input
                      type="text"
                      {...register(`career.${index}.name` as const, {
                        required: "기업이름을 입력해주세요.",
                      })}
                      onFocus={() => setCareerFocusIndex(index)}
                      disabled={isCareerNameDisabled[index]}
                    />
                    {index === careerFocusIndex && (
                      <ul>
                        {corporates?.map((corporate, corporateIndex) => {
                          return (
                            <li key={corporateIndex}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSelectCareerName(corporate, index)
                                }
                              >
                                {corporate.name}
                              </button>
                            </li>
                          );
                        })}
                        {corporates?.length > 0 && corporates?.length < 10 && (
                          <button type="button" onClick={handleAddCorporate}>
                            새 기업 등록하기
                          </button>
                        )}
                      </ul>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      {...register(`career.${index}.department` as const)}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`career.${index}.startAt` as const}
                      rules={{ required: "입사일을 입력해주세요." }}
                      render={({ field: { onChange, onBlur, value } }) => {
                        return (
                          <DatePicker
                            onChange={onChange}
                            onSelect={onChange}
                            onBlur={onBlur}
                            selected={value}
                          />
                        );
                      }}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`career.${index}.endAt` as const}
                      render={({ field: { onChange, onBlur, value } }) => {
                        return (
                          <DatePicker
                            onChange={onChange}
                            onSelect={onChange}
                            onBlur={onBlur}
                            selected={value}
                          />
                        );
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveCareer(index)}
                    >
                      삭제하기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="button" onClick={() => handleAppendCareer()}>
          추가하기
        </button>
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
        <Controller
          control={control}
          name={"deadline"}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <DatePicker
                onChange={onChange}
                onSelect={onChange}
                onBlur={onBlur}
                selected={value}
              />
            );
          }}
        />
        <br />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default RequestRegisterForm;
