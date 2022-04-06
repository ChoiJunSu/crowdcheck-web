import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IRequestCorporate, requestStatusMapper } from "@api/RequestApi/type";
import { IReferenceCorporate } from "@api/ReferenceApi/type";
import RequestApi from "@api/RequestApi";
import PageHeader from "@components/base/PageHeader";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import RangeSlider from "@components/form/RangeSlider";

const RequestDetailPage = () => {
  const { type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [request, setRequest] = useState<IRequestCorporate | null>(null);
  const [nominationReferenceList, setNominationReferenceList] = useState<
    Array<IReferenceCorporate>
  >([]);
  const [blindReferenceList, setBlindReferenceList] = useState<
    Array<IReferenceCorporate>
  >([]);
  if (type !== "corporate" || !requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const updateRequest = useCallback(async () => {
    const requestDetailCorporateResponse = await RequestApi.detailCorporate({
      requestId: parseInt(requestId!),
    });
    if (!requestDetailCorporateResponse.ok) {
      alert(requestDetailCorporateResponse.error);
      navigate(-1);
    }
    setRequest(requestDetailCorporateResponse.request);
    setNominationReferenceList(
      requestDetailCorporateResponse.nominationReferences
    );
    setBlindReferenceList(requestDetailCorporateResponse.blindReferences);
  }, []);

  useEffect(() => {
    (async () => {
      await updateRequest();
    })();
  }, [requestId]);

  return (
    <div className="mx-auto sm:max-w-4xl">
      {request?.candidateName && (
        <PageHeader title={`${request.candidateName}님에 대한 의뢰`} />
      )}
      <div className="bg-white overflow-hidden">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
            <dt className="text-gray-500">의뢰 상태</dt>
            <dd className="text-gray-900 col-span-3">
              {request?.status && requestStatusMapper[request?.status]}
              {request?.status !== "registered" && (
                <Link
                  to={`/request/agree?requestId=${requestId}`}
                  className="ml-6 text-gray-500 hover:text-cc-green"
                >
                  지원자 동의 조회
                </Link>
              )}
            </dd>
          </div>

          <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
            <dt className="text-gray-500">등록일</dt>
            <dd className="text-gray-900 col-span-3">
              {request?.createdAt &&
                new Date(request.createdAt).toLocaleDateString()}
            </dd>
          </div>

          <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
            <dt className="text-gray-500">마감일</dt>
            <dd className="text-gray-900 col-span-3">
              {request?.deadline &&
                new Date(request.deadline).toLocaleDateString()}
            </dd>
          </div>

          <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
            <dt className="text-gray-500">현재 답변</dt>
            <dd className="text-gray-900 col-span-3">
              {request?.referenceCount} 명
            </dd>
          </div>

          <div className="py-4 sm:py-6">
            <h3 className="text-xl sm:text-2xl leading-6 font-medium text-gray-900">
              지원자가 직접 요청한 평판
              <span className="ml-2 text-cc-green">
                {nominationReferenceList.length}건
              </span>
            </h3>
          </div>

          {nominationReferenceList.map((reference, index) => (
            <Disclosure as="div" key={index} className="py-4 sm:py-6">
              {({ open }) => (
                <>
                  <dt className="text-lg sm:text-xl font-medium group">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start">
                      <span
                        className={`${
                          open ? "text-cc-green" : "text-gray-900"
                        } group-hover:text-cc-green`}
                      >
                        {reference.corporateName}에서 함께 일한 분의 답변
                      </span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={`${
                            open
                              ? "-rotate-180 text-cc-green"
                              : "rotate-0 text-gray-500"
                          } h-6 w-6 transform group-hover:text-cc-green`}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 py-4 rounded-md">
                    <>
                      <div className="items-center text-md sm:text-lg font-medium">
                        <div className="my-1 p-2 text-gray-900 border border-gray-200 rounded-md">
                          <div className="my-1 p-2 text-gray-900 sm:mt-0">
                            <div
                              key={index}
                              className="py-4 sm:py-6 items-center text-md sm:text-lg font-medium"
                            >
                              <label className="text-gray-500">
                                지원자와의 관계
                              </label>
                              <div className="my-2 p-2 text-gray-900 border border-gray-200 rounded-md">
                                <div className="my-1 p-2 text-gray-900 sm:mt-0">
                                  {reference.relationship}
                                </div>
                              </div>
                            </div>
                          </div>
                          {reference.details.map((detail, index) => (
                            <div
                              key={index}
                              className="px-2 py-4 sm:py-6 items-center text-md sm:text-lg font-medium"
                            >
                              <label className="text-gray-500">
                                {detail.question
                                  .split("\n")
                                  .map((line, index) => (
                                    <span key={index}>
                                      {line}
                                      <br />
                                    </span>
                                  ))}
                              </label>
                              <div className="my-2 p-2 text-gray-900 border border-gray-200 rounded-md">
                                {detail.score && (
                                  <RangeSlider
                                    name="workExperience"
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={detail.score}
                                  />
                                )}
                                <div className="my-1 p-2 text-gray-900 sm:mt-0">
                                  {detail.answer
                                    .split("\n")
                                    .map((line, index) => (
                                      <span key={index}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}

          {nominationReferenceList.length === 0 && (
            <p className="text-gray-500 text-center sm:text-xl py-4">
              등록된 답변이 없습니다.
            </p>
          )}

          <div className="py-4 sm:py-6">
            <h3 className="text-xl sm:text-2xl leading-6 font-medium text-gray-900">
              블라인드 평판
              <span className="ml-2 text-cc-green">
                {blindReferenceList.length}건
              </span>
            </h3>
          </div>

          {blindReferenceList.map((reference, index) => (
            <Disclosure as="div" key={index} className="py-4 sm:py-6">
              {({ open }) => (
                <>
                  <dt className="text-lg sm:text-xl font-medium group">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start">
                      <span
                        className={`${
                          open ? "text-cc-green" : "text-gray-900"
                        } group-hover:text-cc-green`}
                      >
                        {reference.corporateName}에서 함께 일한 분의 답변
                      </span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={`${
                            open
                              ? "-rotate-180 text-cc-green"
                              : "rotate-0 text-gray-500"
                          } h-6 w-6 transform group-hover:text-cc-green`}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 py-4 rounded-md">
                    <>
                      <div className="items-center text-md sm:text-lg font-medium">
                        <div className="my-1 p-2 text-gray-900 border border-gray-200 rounded-md">
                          <div className="my-1 p-2 text-gray-900 sm:mt-0">
                            <div
                              key={index}
                              className="py-4 sm:py-6 items-center text-md sm:text-lg font-medium"
                            >
                              <label className="text-gray-500">
                                지원자와의 관계
                              </label>
                              <div className="my-2 p-2 text-gray-900 border border-gray-200 rounded-md">
                                <div className="my-1 p-2 text-gray-900 sm:mt-0">
                                  {reference.relationship}
                                </div>
                              </div>
                            </div>
                          </div>
                          {reference.details.map((detail, index) => (
                            <div
                              key={index}
                              className="px-2 py-4 sm:py-6 items-center text-md sm:text-lg font-medium"
                            >
                              <label className="text-gray-500">
                                {detail.question
                                  .split("\n")
                                  .map((line, index) => (
                                    <span key={index}>
                                      {line}
                                      <br />
                                    </span>
                                  ))}
                              </label>
                              <div className="my-2 p-2 text-gray-900 border border-gray-200 rounded-md">
                                {detail.score && (
                                  <RangeSlider
                                    name="workExperience"
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={detail.score}
                                  />
                                )}
                                <div className="my-1 p-2 text-gray-900 sm:mt-0">
                                  {detail.answer
                                    .split("\n")
                                    .map((line, index) => (
                                      <span key={index}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}

          {blindReferenceList.length === 0 && (
            <p className="text-gray-500 text-center sm:text-xl py-4">
              등록된 답변이 없습니다.
            </p>
          )}
        </dl>
      </div>
    </div>
  );
};

export default RequestDetailPage;
