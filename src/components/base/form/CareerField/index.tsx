import { useFieldArray, useFormContext } from "react-hook-form";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ICorporate } from "@api/CorporateApi/type";
import CorporateApi from "@api/CorporateApi";
import Modal from "react-modal";
import { ICareerFieldProps } from "@components/base/form/CareerField/type";
import ErrorMessage from "@components/base/form/ErrorMessage";

const CareerField = ({ careers }: ICareerFieldProps) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "careers",
  });
  const [careerFocusIndex, setCareerFocusIndex] = useState<number>(0);
  const [corporates, setCorporates] = useState<Array<ICorporate>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchCorporateWord, setSearchCorporateWord] = useState<string>("");
  const addCorporateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!careers || careers.length === 0) return;
    careers.forEach(({ corporateName, department, startAt, endAt }, index) => {
      handleAppendCareer();
      setValue(`careers.${index}.corporateName`, corporateName);
      setValue(`careers.${index}.department`, department);
      setValue(`careers.${index}.startAt`, startAt.substring(0, 10));
      if (endAt) setValue(`careers.${index}.endAt`, endAt.substring(0, 10));
    });
    handleRemoveCareer(careers.length);
  }, [careers]);

  const handleAppendCareer = useCallback(() => {
    append({
      corporateName: "",
      startAt: new Date().toISOString().substring(0, 10),
      endAt: null,
    });
  }, []);

  const handleRemoveCareer = useCallback((careerIndex: number) => {
    remove(careerIndex);
  }, []);

  const handleOpenModal = useCallback((careerIndex: number) => {
    setCorporates([]);
    setCareerFocusIndex(careerIndex);
    setIsModalOpen(true);
  }, []);

  const handleSearchCorporate = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      setSearchCorporateWord(value);
      if (!value || value.length < 2) return;
      const searchResponse = await CorporateApi.search({ word: value });
      if (!searchResponse.ok) alert(searchResponse.error);
      setCorporates(searchResponse.corporates);
    },
    []
  );

  const handleSelectCorporate = useCallback(
    ({ id, name }: ICorporate) => {
      setCorporates([]);
      setValue(`careers.${careerFocusIndex}.corporateName`, name);
      setIsModalOpen(false);
    },
    [careerFocusIndex]
  );

  const handleAddCorporate = useCallback(() => {
    if (!addCorporateRef.current || !addCorporateRef.current.value) {
      alert("등록할 기업 이름을 입력하세요.");
      return;
    }
    setValue(
      `careers.${careerFocusIndex}.corporateName`,
      addCorporateRef.current.value
    );
    setIsModalOpen(false);
  }, [careerFocusIndex, addCorporateRef]);

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
            <tr key={index}>
              <td>
                <input
                  type="text"
                  {...register(`careers.${index}.corporateName` as const, {
                    required: "기업이름을 입력해주세요.",
                  })}
                  onFocus={() => setCareerFocusIndex(index)}
                  disabled={true}
                />
                <ErrorMessage
                  message={errors.careers?.[index]?.corporateName?.message}
                />
                <button type="button" onClick={() => handleOpenModal(index)}>
                  검색
                </button>
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
                <ErrorMessage
                  message={errors.careers?.[index]?.startAt?.message}
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
      <Modal isOpen={isModalOpen}>
        <h2>기업 검색</h2>
        <input type="text" onChange={handleSearchCorporate} />
        <ul>
          {corporates.map(({ id, name }, index) => (
            <li key={index}>
              {name}{" "}
              <button
                type="button"
                onClick={() => handleSelectCorporate({ id, name })}
              >
                선택
              </button>
            </li>
          ))}
          {searchCorporateWord.length < 2 && (
            <li>검색어를 두 글자 이상 입력하세요.</li>
          )}
          {searchCorporateWord.length >= 2 && corporates.length < 10 && (
            <li>
              찾으시는 회사가 없다면
              <input type="text" ref={addCorporateRef} />
              <button onClick={handleAddCorporate}>등록</button>
            </li>
          )}
        </ul>
        <button onClick={() => setIsModalOpen(false)}>닫기</button>
      </Modal>
    </div>
  );
};

export default CareerField;
