import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IRequestAgree,
  IRequestGetAgreeCorporateRequest,
} from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import { Disclosure } from "@headlessui/react";
import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import PageHeader from "@components/base/PageHeader";

const RequestAgreeCorporateView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [candidateName, setCandidateName] = useState<string>("");
  const [agreeList, setAgreeList] = useState<Array<IRequestAgree>>([]);

  useEffect(() => {
    (async () => {
      const getRequestResponse = await RequestApi.getAgreeCorporate({
        requestId: parseInt(requestId as string),
      } as IRequestGetAgreeCorporateRequest);
      if (!getRequestResponse.ok) {
        alert(getRequestResponse.error);
        navigate(-1);
      }
      setCandidateName(getRequestResponse.candidateName);
      setAgreeList(getRequestResponse.agrees);
    })();
  }, []);

  return (
    <div className="sm:max-w-4xl mx-auto">
      {candidateName && (
        <PageHeader title={`${candidateName}님의 평판 조회 동의 현황`} />
      )}
      <div className="bg-white overflow-hidden">
        <dl className="divide-y divide-gray-200">
          {agreeList.map(({ career, agreed, disagreeReason }, index) => (
            <Disclosure as="div" key={index} className="py-4 sm:py-6">
              {({ open }) => (
                <>
                  <dt className="text-lg sm:text-xl font-medium group">
                    <Disclosure.Button className="text-left w-full">
                      <div className="block">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-xl sm:text-2xl font-medium text-gray-900 truncate">
                              {career.corporateName}
                            </p>

                            {!agreed && disagreeReason && (
                              <div className="ml-6 h-7 flex flex-row gap-4 items-center group-hover:text-cc-green">
                                <span>비동의 사유</span>
                                <ChevronDownIcon
                                  className={`${
                                    open
                                      ? "-rotate-180 text-cc-green"
                                      : "rotate-0 text-gray-500"
                                  } h-6 w-6 transform group-hover:text-cc-green`}
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                          </div>

                          <div className="mt-2 sm:grid-cols-6 text-md sm:text-lg text-gray-500">
                            <p className="mt-2 sm:col-span-2 flex sm:inline-flex items-center sm:mt-0">
                              <CheckCircleIcon
                                className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>동의 여부</span>
                              <span className="mx-2 text-cc-green">
                                {agreed ? "동의" : "비동의"}
                              </span>
                            </p>
                            <p className="mt-2 sm:col-span-3 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                              <CalendarIcon
                                className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>입사일</span>
                              <span className="mx-2 text-cc-green">
                                {new Date(career.startAt).toLocaleDateString()}
                              </span>
                            </p>
                            <p className="mt-2 sm:col-span-3 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                              <CalendarIcon
                                className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>퇴사일</span>
                              <span className="mx-2 text-cc-green">
                                {career.endAt
                                  ? new Date(career.endAt).toLocaleDateString()
                                  : "재직 중"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Disclosure.Button>
                  </dt>

                  {disagreeReason && (
                    <Disclosure.Panel
                      as="dd"
                      className="mt-2 pl-2 pr-4 sm:pr-8 py-4 rounded-md"
                    >
                      <>
                        <div className="sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                          <div className="my-1 p-2 text-gray-900 col-span-3 border border-gray-200 rounded-md">
                            <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3">
                              <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                                <label className="text-gray-500">
                                  {disagreeReason
                                    .split("\n")
                                    .map((line, index) => (
                                      <span key={index}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))}

          {agreeList.length === 0 && (
            <p className="text-gray-500 text-center sm:text-xl py-4">
              등록된 경력이 없습니다.
            </p>
          )}
        </dl>
      </div>
    </div>
  );
};

export default RequestAgreeCorporateView;
