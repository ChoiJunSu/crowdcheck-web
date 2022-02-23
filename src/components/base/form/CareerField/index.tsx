import { useFieldArray, useFormContext } from "react-hook-form";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ICorporate } from "@api/CorporateApi/type";
import CorporateApi from "@api/CorporateApi";
import { ICareerFieldProps } from "@components/base/form/CareerField/type";
import ErrorMessage from "@components/base/form/ErrorMessage";
import UserApi from "@api/UserApi";
import { TCareerStatus } from "@api/AuthApi/type";
import { Transition, Dialog } from "@headlessui/react";

const CareerField = ({ mode, careers }: ICareerFieldProps) => {
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
    Array<{ verifiedAt: Date | null; careerId: number }>
  >([]);

  useEffect(() => {
    if (!mode || !careers || careers.length === 0) return;
    const newCareerStatusList: Array<{
      verifiedAt: Date | null;
      careerId: number;
    }> = [];
    careers.forEach(
      (
        {
          id,
          corporateId,
          corporateName,
          department,
          startAt,
          endAt,
          verifiedAt,
        },
        index
      ) => {
        handleAppendCareer();
        setValue(`agrees.${index}.corporateId`, corporateId);
        setValue(`careers.${index}.corporateName`, corporateName);
        setValue(`careers.${index}.department`, department);
        setValue(`careers.${index}.startAt`, startAt.substring(0, 10));
        if (endAt) setValue(`careers.${index}.endAt`, endAt.substring(0, 10));
        newCareerStatusList.push({ verifiedAt, careerId: id });
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

  const handleCloseModal = useCallback(() => {
    setModalMode(null);
    setCorporateList([]);
    setSearchCorporateWord("");
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
      if (!value || value.length < 2) {
        setCorporateList([]);
        return;
      }
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
    const { verifiedAt, careerId } = careerStatusList[careerFocusIndex];
    if (verifiedAt) {
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
    newCareerStatusList[careerFocusIndex].verifiedAt = new Date();
    setCareerStatusList(newCareerStatusList);
    alert("저장되었습니다. 증빙자료 검토 후 인증이 완료됩니다.");
    setModalMode(null);
  }, [careerFocusIndex, careerStatusList]);

  return (
    <div className="flex flex-col">
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <div className="bg-white rounded-md shadow-sm grid grid-cols-4 sm:grid-cols-7 grid-flow-row-dense rounded-md border border-gray-300">
            <div className="col-span-3 flex-1 min-w-0 flex justify-between border-b border-gray-300">
              <span className="w-1/4 inline-flex items-center justify-center rounded-tl-md bg-gray-50 text-gray-500 text-sm sm:text-md">
                기업이름
              </span>
              <input
                type="text"
                {...register(`careers.${index}.corporateName` as const, {
                  required: "기업이름을 입력해주세요.",
                })}
                onClick={() => {
                  setCareerFocusIndex(index);
                  handleOpenModal("corporate", index);
                }}
                disabled={mode === "candidate"}
                className="flex-1 min-w-0 block w-full px-3 py-2 border-0 focus:ring-cc-green focus:border-cc-green disabled:bg-gray-200 sm:text-sm"
              />
            </div>
            <div className="col-span-3 flex-1 min-w-0 flex justify-between border-b border-gray-300">
              <span className="w-1/4 inline-flex items-center justify-center px-3 bg-gray-50 text-gray-500 text-sm sm:text-md">
                부서
              </span>
              <input
                type="text"
                {...register(`careers.${index}.department` as const)}
                disabled={mode === "candidate"}
                className="flex-1 min-w-0 block w-full px-3 py-2 border-0 focus:ring-cc-green focus:border-cc-green disabled:bg-gray-200 sm:text-sm"
              />
            </div>
            <div className="col-span-3 flex-1 min-w-0 flex justify-between border-b sm:border-0 border-gray-300">
              <span className="w-1/4 inline-flex items-center justify-center rounded-bl-md px-3 bg-gray-50 text-gray-500 text-sm sm:text-md">
                입사일
              </span>
              <input
                type="date"
                {...register(`careers.${index}.startAt` as const, {
                  required: "입사일을 입력해주세요.",
                })}
                disabled={mode === "candidate"}
                className="flex-1 min-w-0 block w-full px-3 py-2 border-0 focus:ring-cc-green focus:border-cc-green disabled:bg-gray-200 sm:text-sm"
              />
            </div>
            <div className="col-span-3 flex-1 min-w-0 flex justify-between">
              <span className="w-1/4 inline-flex items-center justify-center px-3 rounded-bl-md sm:rounded-none bg-gray-50 text-gray-500 text-sm sm:text-md">
                퇴사일
              </span>
              <input
                type="date"
                {...register(`careers.${index}.endAt` as const)}
                placeholder="퇴사일"
                disabled={mode === "candidate"}
                className="flex-1 min-w-0 block w-full px-3 py-2 border-0 focus:ring-cc-green focus:border-cc-green disabled:bg-gray-200 sm:text-sm"
              />
            </div>
            <div className="row-span-4 sm:row-span-2 flex place-content-center rounded-r-md bg-gray-50 text-gray-500 text-sm sm:text-md font-normal">
              {mode === "edit" && careerStatusList[index] && (
                <div className="w-full">
                  <div className="w-full h-1/2 grid border-b border-white">
                    {!careerStatusList[index].verifiedAt && (
                      <button
                        type="button"
                        onClick={() => handleOpenModal("verify", index)}
                        className="rounded-tr-md bg-cc-green hover:bg-cc-green-dark text-white"
                      >
                        인증하기
                      </button>
                    )}
                    {careerStatusList[index].verifiedAt && (
                      <span className="place-self-center">인증 완료</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCareer(index)}
                    className="w-full h-1/2 rounded-br-md bg-cc-green hover:bg-cc-green-dark text-white"
                  >
                    삭제하기
                  </button>
                </div>
              )}

              {mode !== "candidate" && !careerStatusList[index] && (
                <button
                  type="button"
                  onClick={() => handleRemoveCareer(index)}
                  className="w-full rounded-r-md bg-cc-green hover:bg-cc-green-dark text-white"
                >
                  삭제하기
                </button>
              )}

              {mode === "candidate" && (
                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      type="text"
                      {...register(`agrees.${index}.corporateId`)}
                      hidden={true}
                    />
                    <input
                      type="checkbox"
                      {...register(`agrees.${index}.agreed`)}
                      defaultChecked={true}
                      className="focus:ring-cc-green h-4 w-4 text-cc-green border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={`agrees.${index}.agreed`}
                      className="font-medium text-gray-700"
                    >
                      동의하기
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ErrorMessage
            message={
              errors.careers?.[index]?.corporateName?.message ||
              errors.careers?.[index]?.startAt?.message
            }
          />
        </div>
      ))}

      {mode !== "candidate" && (
        <div>
          <button
            type="button"
            onClick={() => handleAppendCareer()}
            className="button"
          >
            추가하기
          </button>

          <input type="file" {...register("certificate")} hidden={true} />

          <Transition.Root show={modalMode === "corporate"} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={handleCloseModal}
            >
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full sm:p-6">
                    <div>
                      <div className="mt-3 text-left sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          기업 검색
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            onChange={handleSearchCorporate}
                            placeholder="기업이름을 입력하세요."
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                          />
                          <ul className="z-10 w-full bg-white shadow-lg rounded-md text-sm ring-1 ring-black ring-opacity-5 overflow-auto">
                            {corporateList.map(({ id, name }, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() =>
                                  handleSelectCorporate({ id, name })
                                }
                                className="w-full py-2 px-4 flex justify-between border hover:bg-cc-green hover:text-white"
                              >
                                <li>{name}</li>
                              </button>
                            ))}
                            {searchCorporateWord.length < 2 && (
                              <li className="text-red-600 py-2 px-4 flex justify-between border">
                                검색어를 두 글자 이상 입력하세요.
                              </li>
                            )}
                            {searchCorporateWord.length >= 2 &&
                              corporateList.length < 10 && (
                                <li className="py-2 px-4 text-sm">
                                  찾으시는 기업이 없다면
                                  <div className="flex justify-between">
                                    <input
                                      type="text"
                                      ref={addCorporateRef}
                                      placeholder="등록할 기업이름을 입력하세요."
                                      className="shrink my-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green"
                                    />
                                    <button
                                      onClick={handleAddCorporate}
                                      className="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-cc-green hover:bg-cc-green-dark"
                                    >
                                      등록하기
                                    </button>
                                  </div>
                                </li>
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="button"
                        onClick={handleCloseModal}
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <Transition.Root show={modalMode === "verify"} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={handleCloseModal}
            >
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full sm:p-6">
                    <div>
                      <div className="mt-3 text-left sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          경력 인증
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="file"
                            onChange={handleUploadCertificate}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="button"
                        onClick={handleVerifyCareer}
                      >
                        저장하기
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
    </div>
  );
};

export default CareerField;
