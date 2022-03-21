import { useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IRequestReferenceCorporate } from "@api/RequestApi/type";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";

const requestStatusMapper = {
  registered: "동의 대기",
  agreed: "답변 중",
  closed: "답변 선정 중",
  rewarded: "종료됨",
};

const RequestReferenceListCorporateView = () => {
  const [requestList, setRequestReferenceList] = useState<
    Array<IRequestReferenceCorporate>
  >([]);

  useEffect(() => {
    (async () => {
      const referenceListCorporateResponse =
        await RequestApi.referenceListCorporate({});
      if (!referenceListCorporateResponse.ok) return;
      setRequestReferenceList(referenceListCorporateResponse.requests);
    })();
  }, []);

  return (
    <div className="sm:mx-auto sm:max-w-4xl bg-white shadow overflow-hidden rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {requestList.map((request, index) => (
          <li key={index}>
            <div className="block">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-xl sm:text-2xl font-medium text-gray-900 truncate">
                    {request.candidateName}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <Link
                      to={`/request/reference/detail?requestId=${request.id}`}
                      className="px-2 inline-flex text-md sm:text-lg leading-5 rounded-full font-medium text-gray-600 hover:text-cc-green"
                    >
                      상세보기
                      <ChevronRightIcon className="self-center flex-shrink-0 mr-1.5 h-5 w-5" />
                    </Link>
                  </div>
                </div>
                <div className="mt-2 sm:grid-cols-6 text-md sm:text-lg text-gray-500">
                  <p className="sm:col-span-1 flex sm:inline-flex items-center">
                    <UsersIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>선정 답변</span>
                    <span className="mx-2 text-cc-green">
                      {request.rewardNum}명
                    </span>
                    <span>현재 답변</span>
                    <span className="mx-2 text-cc-green">
                      {request.receiverCount}명
                    </span>
                  </p>
                  <p className="mt-2 sm:col-span-2 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                    <InformationCircleIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>상태</span>
                    <span className="mx-2 text-cc-green">
                      {requestStatusMapper[request.status]}
                    </span>
                  </p>
                  <p className="mt-2 sm:col-span-3 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>등록일</span>
                    <span className="mx-2 text-cc-green">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
        {requestList.length === 0 && (
          <li className="text-gray-500 text-center sm:text-xl py-10">
            의뢰가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RequestReferenceListCorporateView;
