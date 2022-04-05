import { ChangeEvent, Fragment, useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import AuthApi from "@api/AuthApi";
import { IAuthRegisterCorporateRequest } from "@api/AuthApi/type";
import Loading from "@components/base/Loading";
import ErrorMessage from "@components/form/ErrorMessage";
import { IRegisterCorporateFormData } from "@pages/auth/register/corporate/type";
import { useNavigate } from "react-router-dom";
import PhoneField from "@components/form/PhoneField";
import { Dialog, Transition } from "@headlessui/react";
import { ICorporate } from "@api/CorporateApi/type";
import CorporateApi from "@api/CorporateApi";
import PolicyField from "@components/form/PolicyField";

const AuthRegisterCorporatePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [corporateList, setCorporateList] = useState<Array<ICorporate>>([]);
  const [searchCorporateWord, setSearchCorporateWord] = useState<string>("");
  const addCorporateRef = useRef<HTMLInputElement>(null);
  const methods = useForm<IRegisterCorporateFormData>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setCorporateList([]);
    setSearchCorporateWord("");
  }, []);

  const handleOpenModal = useCallback(() => {
    setCorporateList([]);
    setModalOpen(true);
  }, []);

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

  const handleSelectCorporate = useCallback(({ id, name }: ICorporate) => {
    setValue("name", name);
    setCorporateList([]);
    setSearchCorporateWord("");
    setModalOpen(false);
  }, []);

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

  const handleAddCorporate = useCallback(() => {
    if (!addCorporateRef.current || !addCorporateRef.current.value) {
      alert("등록할 기업 이름을 입력하세요.");
      return;
    }
    setValue("name", addCorporateRef.current.value);
    setModalOpen(false);
  }, [addCorporateRef.current]);

  const handleRegisterCorporate: SubmitHandler<IRegisterCorporateFormData> =
    useCallback(async (data) => {
      if (getValues("password") !== getValues("passwordConfirm")) {
        setError("passwordConfirm", {
          type: "validate",
          message: "비밀번호와 일치하지 않습니다.",
        });
        return;
      }
      if (!getValues("certificate")) {
        setError("certificate", {
          type: "required",
          message: "사업자등록증을 업로드 해주세요.",
        });
        return;
      }
      clearErrors();
      setIsLoading(true);
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      const registerCorporateResponse = await AuthApi.registerCorporate({
        formData,
      } as IAuthRegisterCorporateRequest);
      setIsLoading(false);
      if (!registerCorporateResponse.ok) {
        alert(registerCorporateResponse.error);
        return;
      }
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      navigate("/auth/login");
    }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegisterCorporate)} className="form">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="h3">기본 정보</h3>
              </div>

              <div className="mt-4 flex flex-col gap-y-4 ">
                <div className="sm:w-1/2">
                  <label htmlFor="name" className="label">
                    기업 이름
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("name", {
                        required: "이름을 입력해주세요.",
                      })}
                      onClick={handleOpenModal}
                      className="input"
                    />
                    <ErrorMessage message={errors?.name?.message} />
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <label htmlFor="certificate" className="label">
                    사업자등록증
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      onChange={handleUploadCertificate}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cc-green focus:border-cc-green sm:text-sm"
                    />
                    <ErrorMessage message={errors?.certificate?.message} />
                  </div>
                </div>

                <div className="sm:w-3/4">
                  <label htmlFor="phone" className="label">
                    전화번호
                  </label>
                  <div className="mt-1">
                    <PhoneField />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="h3">로그인 정보</h3>
              </div>

              <div className="mt-4 flex flex-col gap-y-4 ">
                <div className="sm:w-1/2">
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

                <div className="sm:w-1/2">
                  <label htmlFor="password" className="label">
                    비밀번호
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                        minLength: {
                          value: 8,
                          message: "8자 이상 입력해주세요.",
                        },
                      })}
                      placeholder="8자 이상 입력하세요."
                      className="input"
                    />
                    <ErrorMessage message={errors?.password?.message} />
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <label htmlFor="passwordConfirm" className="label">
                    비밀번호 확인
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      {...register("passwordConfirm", {
                        required: "비밀번호 확인을 입력해주세요.",
                        minLength: {
                          value: 8,
                          message: "8자 이상 입력해주세요.",
                        },
                      })}
                      className="input"
                    />
                    <ErrorMessage message={errors?.passwordConfirm?.message} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="h3">정책 동의</h3>
              </div>
              <div className="mt-4">
                <PolicyField mode="authRegister" />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-300">
              <button type="submit" className="button">
                가입하기
              </button>
            </div>
          </div>
        </form>
      </FormProvider>

      <Transition.Root show={modalOpen} as={Fragment}>
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
                            onClick={() => handleSelectCorporate({ id, name })}
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
    </div>
  );
};

export default AuthRegisterCorporatePage;
