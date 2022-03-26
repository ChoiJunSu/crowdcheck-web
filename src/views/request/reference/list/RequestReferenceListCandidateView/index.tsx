import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import {
  IRequestReferenceCandidate,
  requestReferenceStatusMapper,
} from "@api/RequestApi/type";
import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";

const RequestReferenceListCandidateView = () => {
  const [requestList, setRequestReferenceList] = useState<
    Array<IRequestReferenceCandidate>
  >([]);

  useEffect(() => {
    (async () => {
      const referenceListCandidateResponse =
        await RequestApi.referenceListCandidate({});
      if (!referenceListCandidateResponse.ok) return;
      setRequestReferenceList(referenceListCandidateResponse.requests);
    })();
  }, []);

  return (
    <div className="sm:mx-auto sm:max-w-4xl bg-white shadow overflow-hidden rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {requestList.map((request, index) => (
          <li key={index}>
            <div className="block">
              <div className="px-4 py-4 sm:px-6">
                <div className="sm:flex items-center justify-between">
                  <p className="text-xl sm:text-2xl font-medium text-gray-900 truncate">
                    {request.corporateName}의 평판 조회 요청
                  </p>
                  {request.status === "registered" && (
                    <div className="mt-1 sm:mt-0 sm:ml-2 flex-shrink-0 flex">
                      <Link
                        to={`/request/reference/agree?requestId=${request.id}`}
                        className="sm:px-2 inline-flex text-md sm:text-lg leading-5 rounded-full font-medium text-gray-600 hover:text-cc-green"
                      >
                        동의하러 가기
                        <ChevronRightIcon className="self-center flex-shrink-0 mr-1.5 h-5 w-5" />
                      </Link>
                    </div>
                  )}
                  {request.status === "agreed" && (
                    <div className="mt-1 sm:mt-0 sm:ml-2 flex-shrink-0 flex">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `평판 작성을 부탁드립니다.\n다음 주소로 방문하여 가이드를 확인해주세요.\nhttps://crowdcheck.io/guide/referee`
                          );
                          alert(
                            "클립보드에 복사되었습니다. 평판 제공자에게 전달해주세요."
                          );
                        }}
                        className="sm:px-2 inline-flex text-md sm:text-lg leading-5 rounded-full font-medium text-gray-600 hover:text-cc-green"
                      >
                        평판 요청 문구 복사하기
                        <ChevronRightIcon className="self-center flex-shrink-0 mr-1.5 h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-2 sm:grid-cols-6 text-md sm:text-lg text-gray-500">
                  <p className="mt-2 sm:col-span-2 flex sm:inline-flex items-center">
                    <InformationCircleIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>상태</span>
                    <span className="mx-2 text-cc-green">
                      {requestReferenceStatusMapper[request.status]}
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

export default RequestReferenceListCandidateView;
