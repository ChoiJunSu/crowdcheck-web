import { useFieldArray, useFormContext } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import {
  ICorporate,
  ICorporateSearchRequest,
  ICorporateSearchResponse,
} from "@api/CorporateApi/type";
import CorporateApi from "@api/CorporateApi";

const CareerField = () => {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "careers",
  });
  const watchCareer = watch("careers");
  const [careerFocusIndex, setCareerFocusIndex] = useState<number>(0);
  const [corporates, setCorporates] = useState<Array<ICorporate>>([]);
  const [isCareerNameDisabled, setIsCareerNameDisabled] = useState<
    Array<boolean>
  >([false]);

  useEffect(() => {
    if (
      careerFocusIndex === undefined ||
      isCareerNameDisabled[careerFocusIndex] ||
      !watchCareer[careerFocusIndex]?.corporateName
    ) {
      setCorporates([]);
      return;
    }
    (async () => {
      const searchResult: ICorporateSearchResponse = await CorporateApi.search({
        word: watchCareer[careerFocusIndex].corporateName,
      } as ICorporateSearchRequest);
      if (!searchResult.ok) alert(searchResult.error);
      setCorporates(searchResult.corporates);
    })();
  }, [careerFocusIndex, watchCareer[careerFocusIndex]?.corporateName]);

  const handleAddCorporate = useCallback(() => {}, []);

  const handleSelectCareerName = useCallback(
    ({ id, name }: ICorporate, careerIndex: number) => {
      setCorporates([]);
      setIsCareerNameDisabled([
        ...isCareerNameDisabled.slice(0, careerIndex),
        true,
        ...isCareerNameDisabled.slice(careerIndex + 1),
      ]);
      setValue(`careers.${careerIndex}.corporateName`, name);
    },
    [isCareerNameDisabled]
  );

  const handleAppendCareer = useCallback(() => {
    setIsCareerNameDisabled([...isCareerNameDisabled, false]);
    append({
      corporateName: "",
      startAt: new Date().toISOString().substring(0, 10),
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

  return (
    <div>
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
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <input
                  type="text"
                  {...register(`careers.${index}.corporateName` as const, {
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
                  </ul>
                )}
              </td>
              <td>
                <input
                  type="text"
                  {...register(`careers.${index}.department` as const)}
                />
              </td>
              <td>
                <input
                  type="date"
                  {...register(`careers.${index}.startAt` as const, {
                    required: "입사일을 입력해주세요.",
                  })}
                />
              </td>
              <td>
                <input
                  type="date"
                  {...register(`careers.${index}.endAt` as const)}
                />
              </td>
              <td>
                <button type="button" onClick={() => handleRemoveCareer(index)}>
                  삭제하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => handleAppendCareer()}>
        추가하기
      </button>
    </div>
  );
};

export default CareerField;
