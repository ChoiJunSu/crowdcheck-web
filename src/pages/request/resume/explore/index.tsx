import { useEffect, useState } from "react";
import { IRequestResumeExpert } from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import {
  CalendarIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const RequestResumeExplorePage = () => {
  const [requestList, setRequestList] = useState<Array<IRequestResumeExpert>>(
    []
  );
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const resumeExploreResponse = await RequestApi.resumeExplore({ page });
      if (!resumeExploreResponse.ok) return;
      setRequestList(resumeExploreResponse.requests);
    })();
  }, [page]);

  return (
    <div className="sm:mx-auto sm:max-w-4xl bg-white shadow overflow-hidden rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {requestList.map((request, index) => (
          <li key={index}>
            <div className="block">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-xl sm:text-2xl font-medium text-gray-900 truncate">
                    {request.corporateName}의 의뢰
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
                    <CurrencyDollarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>선정 보상금</span>
                    <span className="mx-2 text-cc-green">
                      {request.rewardAmount.toLocaleString()}원
                    </span>
                  </p>
                  <p className="mt-2 sm:col-span-3 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                    <UsersIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
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
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>마감일</span>
                    <span className="mx-2 text-cc-green">
                      {request.deadline
                        ? `${new Date(request.deadline).toLocaleDateString()}`
                        : "없음"}
                    </span>
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

export default RequestResumeExplorePage;
