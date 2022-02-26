import { useEffect, useState } from "react";
import { IRequestResumeCorporate } from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import { Link } from "react-router-dom";
import { ChatAlt2Icon } from "@heroicons/react/outline";

const RequestResumeListCorporateView = () => {
  const [requestList, setRequestList] = useState<
    Array<IRequestResumeCorporate>
  >([]);
  const requestStatusMapper = {
    registered: "답변 중",
    agreed: "답변 중",
    closed: "종료됨",
  };

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
    <div className="sm:mx-auto sm:w-full sm:max-w-2xl flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm sm:text-lg font-medium text-gray-500 uppercase tracking-wider"
                  >
                    메모
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm sm:text-lg font-medium text-gray-500 uppercase tracking-wider"
                  >
                    의뢰 상태
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requestList.map(({ id, memo, status, receivers }, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-900">
                        {memo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-500">
                        {requestStatusMapper[status]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-500">
                        <Link
                          to={`/request/resume/answer?requestId=${id}`}
                          className="inline-flex items-center gap-1 hover:text-cc-green"
                        >
                          <ChatAlt2Icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          답변보기
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestResumeListCorporateView;
