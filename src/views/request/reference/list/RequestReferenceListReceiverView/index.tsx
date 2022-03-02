import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IRequestReferenceReceiver } from "@api/RequestApi/type";
import { Link } from "react-router-dom";
import { BanIcon, PencilAltIcon } from "@heroicons/react/outline";

const RequestReferenceListReceiverView = () => {
  const [requestList, setRequestReferenceList] = useState<
    Array<IRequestReferenceReceiver>
  >([]);
  const [update, setUpdate] = useState<boolean>(false);
  const receiverStatusMapper = {
    received: "답변 중",
    verified: "답변 중",
    rejected: "거절됨",
    answered: "답변 완료",
    closed: "종료됨",
  };

  const handleReject = useCallback(
    async (requestId: number) => {
      if (!confirm("정말로 거절하시겠습니까?")) return;
      const rejectResponse = await RequestApi.referenceReject({ requestId });
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
      const referenceListReceiverResponse =
        await RequestApi.referenceListReceiver({});
      if (!referenceListReceiverResponse.ok) return;
      setRequestReferenceList(referenceListReceiverResponse.requests);
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
                    className="px-4 py-3 text-sm sm:text-lg font-medium text-gray-500 uppercase tracking-wider"
                  >
                    기업 이름
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm sm:text-lg font-medium text-gray-500 uppercase tracking-wider"
                  >
                    지원자 이름
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm sm:text-lg font-medium text-gray-500 uppercase tracking-wider"
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-900">
                        {corporateName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-900">
                        {candidateName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-500">
                        {receiverStatusMapper[status]}
                      </td>
                      {status === "received" && (
                        <td className="grid grid-rows-2 px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-500">
                          <Link
                            to={`/request/reference/verify?requestId=${id}`}
                            className="inline-flex items-center gap-1 hover:text-cc-green"
                          >
                            <PencilAltIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            답변하기
                          </Link>
                          <button
                            onClick={() => handleReject(id)}
                            className="inline-flex items-center gap-1 hover:text-cc-green"
                          >
                            <BanIcon className="h-6 w-6" aria-hidden="true" />
                            거절하기
                          </button>
                        </td>
                      )}
                      {status === "verified" && (
                        <td className="grid grid-rows-2 px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-medium text-gray-500">
                          <Link
                            to={`/request/reference/answer?requestId=${id}`}
                            className="inline-flex items-center gap-1 hover:text-cc-green"
                          >
                            <PencilAltIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            답변하기
                          </Link>
                          <button
                            onClick={() => handleReject(id)}
                            className="inline-flex items-center gap-1hover:text-cc-green"
                          >
                            <BanIcon className="h-6 w-6" aria-hidden="true" />
                            거절하기
                          </button>
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

export default RequestReferenceListReceiverView;
