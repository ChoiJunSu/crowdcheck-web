import { useEffect, useState } from "react";
import { IRequestResumeCorporate } from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import {
  CalendarIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const requestStatusMapper = {
  registered: "등록됨",
  agreed: "등록됨",
  closed: "마감됨",
};

const RequestResumeListCorporateView = () => {
  const [requestList, setRequestList] = useState<
    Array<IRequestResumeCorporate>
  >([]);

  useEffect(() => {
    (async () => {
      const resumeListCorporateResponse = await RequestApi.resumeListCorporate(
        {}
      );
      if (!resumeListCorporateResponse.ok) return;
      setRequestList(resumeListCorporateResponse.requests);
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
                    {request.memo}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <Link
                      to={`/request/resume/detail?requestId=${request.id}`}
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
                    선정 답변: {request.rewardNum}명 | 현재 답변:{" "}
                    {request.receiverCount}명
                  </p>
                  <p className="mt-2 sm:col-span-2 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                    <InformationCircleIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    상태: {requestStatusMapper[request.status]}
                  </p>
                  <p className="mt-2 sm:col-span-3 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    등록일: {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestResumeListCorporateView;
