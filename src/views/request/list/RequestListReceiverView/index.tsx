import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IReceiverRequest } from "@api/RequestApi/type";
import { Link } from "react-router-dom";
import { BanIcon, ChatAlt2Icon, PencilAltIcon } from "@heroicons/react/outline";

const RequestListReceiverView = () => {
  const [requestList, setRequestList] = useState<Array<IReceiverRequest>>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const receiverStatusMapper = {
    arrived: "답변을 기다리는 중",
    verified: "답변을 기다리는 중",
    rejected: "거절됨",
    answered: "답변 완료",
    closed: "종료됨",
  };

  const handleReject = useCallback(
    async (requestId: number) => {
      const rejectResponse = await RequestApi.reject({ requestId });
      if (!rejectResponse.ok) {
        alert(rejectResponse.error);
        return;
      }
      alert("의뢰가 거절되었습니다.");
      setUpdate(!update);
    },
    [update]
  );

  useEffect(() => {
    (async () => {
      const listReceiverResponse = await RequestApi.listReceiver({});
      if (!listReceiverResponse.ok) return;
      setRequestList(listReceiverResponse.requests);
    })();
  }, [update]);

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
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    기업 이름
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    지원자 이름
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    의뢰 상태
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requestList.map(
                  ({ id, corporateName, candidateName, status }, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {corporateName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {candidateName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {receiverStatusMapper[status]}
                      </td>
                      {status === "arrived" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          <div>
                            <Link
                              to={`/request/verify?requestId=${id}`}
                              className="inline-flex items-center gap-1 hover:text-cc-green"
                            >
                              <PencilAltIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                              답변하기
                            </Link>
                          </div>
                          <div>
                            <button
                              onClick={() => handleReject(id)}
                              className="inline-flex items-center gap-1 hover:text-cc-green"
                            >
                              <BanIcon className="h-6 w-6" aria-hidden="true" />
                              거절하기
                            </button>
                          </div>
                        </td>
                      )}
                      {status === "verified" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          <div>
                            <Link
                              to={`/request/answer?requestId=${id}`}
                              className="inline-flex items-center gap-1 hover:text-cc-green hover:text-cc-green"
                            >
                              <PencilAltIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                              답변하기
                            </Link>
                          </div>
                          <div>
                            <button
                              onClick={() => handleReject(id)}
                              className="inline-flex items-center gap-1 hover:text-cc-green hover:text-cc-green"
                            >
                              <BanIcon className="h-6 w-6" aria-hidden="true" />
                              거절하기
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestListReceiverView;
