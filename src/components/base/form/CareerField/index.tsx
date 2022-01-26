import { useFieldArray, useFormContext } from "react-hook-form";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ICorporate } from "@api/CorporateApi/type";
import CorporateApi from "@api/CorporateApi";
import Modal from "react-modal";
import { ICareerFieldProps } from "@components/base/form/CareerField/type";
import ErrorMessage from "@components/base/form/ErrorMessage";
import UserApi from "@api/UserApi";
import { TCareerStatus } from "@api/AuthApi/type";

const CareerField = ({ careers }: ICareerFieldProps) => {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "careers",
  });
  const [modalMode, setModalMode] = useState<null | "corporate" | "verify">(
    null
  );
  const [careerFocusIndex, setCareerFocusIndex] = useState<number>(0);
  const [corporateList, setCorporateList] = useState<Array<ICorporate>>([]);
  const [searchCorporateWord, setSearchCorporateWord] = useState<string>("");
  const addCorporateRef = useRef<HTMLInputElement>(null);
  const [careerStatusList, setCareerStatusList] = useState<
    Array<{ status: TCareerStatus; careerId: number }>
  >([]);

  useEffect(() => {
    if (!careers || careers.length === 0) return;
    const newCareerStatusList: Array<{
      status: TCareerStatus;
      careerId: number;
    }> = [];
    careers.forEach(
      ({ id, corporateName, department, startAt, endAt, status }, index) => {
        handleAppendCareer();
        setValue(`careers.${index}.corporateName`, corporateName);
        setValue(`careers.${index}.department`, department);
        setValue(`careers.${index}.startAt`, startAt.substring(0, 10));
        if (endAt) setValue(`careers.${index}.endAt`, endAt.substring(0, 10));
        if (status) newCareerStatusList.push({ status, careerId: id });
      }
    );
    setCareerStatusList(newCareerStatusList);
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

  const handleOpenModal = useCallback(
    (mode: "corporate" | "verify", careerIndex: number) => {
      setCorporateList([]);
      setCareerFocusIndex(careerIndex);
      setModalMode(mode);
    },
    []
  );

  const handleSearchCorporate = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      setSearchCorporateWord(value);
      if (!value || value.length < 2) return;
      const searchResponse = await CorporateApi.search({ word: value });
      if (!searchResponse.ok) alert(searchResponse.error);
      setCorporateList(searchResponse.corporates);
      if (addCorporateRef.current) addCorporateRef.current.value = value;
    },
    [addCorporateRef.current]
  );

  const handleSelectCorporate = useCallback(
    ({ id, name }: ICorporate) => {
      setCorporateList([]);
      setSearchCorporateWord("");
      setValue(`careers.${careerFocusIndex}.corporateName`, name);
      setModalMode(null);
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
    setModalMode(null);
  }, [careerFocusIndex, addCorporateRef]);

  const handleUploadCertificate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files },
      } = event;
      if (!files || !files[0]) return;
      setValue("certificate", files[0]);
    },
    []
  );

  const handleVerifyCareer = useCallback(async () => {
    const { status, careerId } = careerStatusList[careerFocusIndex];
    if (status !== "registered") {
      alert("잘못된 접근입니다.");
      setModalMode(null);
      return;
    } else if (!getValues("certificate")) {
      alert("증빙자료를 업로드 해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("careerId", careerId.toString());
    formData.append("certificate", getValues("certificate"));
    const careerVerifyResponse = await UserApi.careerVerify({
      formData,
    });
    if (!careerVerifyResponse.ok) {
      alert(careerVerifyResponse.error);
      return;
    }
    const newCareerStatusList = [...careerStatusList];
    newCareerStatusList[careerFocusIndex].status = "reviewed";
    setCareerStatusList(newCareerStatusList);
    alert("저장되었습니다. 증빙자료 검토 후 인증이 완료됩니다.");
    setModalMode(null);
  }, [careerFocusIndex, careerStatusList]);

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
                  {...register(`careers.${index}.corporateName` as const)}
                  onFocus={() => setCareerFocusIndex(index)}
                  disabled={true}
                />
                <ErrorMessage
                  message={errors.careers?.[index]?.corporateName?.message}
                />
                <button
                  type="button"
                  onClick={() => handleOpenModal("corporate", index)}
                >
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
                  {...register(`careers.${index}.startAt` as const)}
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
                {careerStatusList[index] &&
                  careerStatusList[index].status === "registered" && (
                    <button
                      type="button"
                      onClick={() => handleOpenModal("verify", index)}
                    >
                      인증하기
                    </button>
                  )}
                {careerStatusList[index] &&
                  careerStatusList[index].status === "reviewed" && (
                    <a>검토 중</a>
                  )}
                {careerStatusList[index] &&
                  careerStatusList[index].status === "verified" && (
                    <a>인증 완료</a>
                  )}
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
      <input type="file" {...register("certificate")} hidden={true} />
      <Modal isOpen={modalMode !== null}>
        {modalMode === "corporate" && (
          <div>
            <h2>기업 검색</h2>
            <input type="text" onChange={handleSearchCorporate} />
            <ul>
              {corporateList.map(({ id, name }, index) => (
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
              {searchCorporateWord.length >= 2 && corporateList.length < 10 && (
                <li>
                  찾으시는 회사가 없다면
                  <input type="text" ref={addCorporateRef} />
                  <button onClick={handleAddCorporate}>등록</button>
                </li>
              )}
            </ul>
          </div>
        )}
        {modalMode === "verify" && (
          <div>
            <h2>경력인증</h2>
            <label>증빙자료</label>
            <input type="file" onChange={handleUploadCertificate} />
            <button type="button" onClick={handleVerifyCareer}>
              저장하기
            </button>
          </div>
        )}
        <button type="button" onClick={() => setModalMode(null)}>
          닫기
        </button>
      </Modal>
    </div>
  );
};

export default CareerField;
