import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import {
  IRequestReferenceDetailReceiver,
  TReceiverStatus,
} from "@api/RequestApi/type";
import PageHeader from "@components/base/PageHeader";

const requestStatusMapper = {
  registered: "동의 대기 중",
  agreed: "답변 대기 중",
  closed: "답변 선정 중",
  rewarded: "종료됨",
};

const RequestReferenceDetailReceiverView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [request, setRequest] =
    useState<IRequestReferenceDetailReceiver | null>(null);
  const [receiverStatus, setReceiverStatus] =
    useState<TReceiverStatus>("received");
  const [update, setUpdate] = useState<boolean>(false);

  const handleReject = useCallback(async () => {
    if (!requestId || !confirm("정말로 거절하시겠습니까?")) return;
    const rejectResponse = await RequestApi.referenceReject({
      requestId: parseInt(requestId),
    });
    if (!rejectResponse.ok) {
      alert(rejectResponse.error);
      return;
    }
    alert("의뢰가 거절되었습니다.");
    setUpdate(!update);
  }, [requestId, update]);

  useEffect(() => {
    if (!requestId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
    (async () => {
      const requestReferenceDetailReceiverResponse =
        await RequestApi.referenceDetailReceiver({
          requestId: parseInt(requestId!),
        });
      if (!requestReferenceDetailReceiverResponse.ok) {
        alert(requestReferenceDetailReceiverResponse.error);
        navigate(-1);
      }
      setRequest(requestReferenceDetailReceiverResponse.request);
      setReceiverStatus(requestReferenceDetailReceiverResponse.receiverStatus);
    })();
  }, [requestId, update]);

  return (
    <div className="mx-auto sm:max-w-4xl">
      {request?.corporateName && request?.candidateName && (
        <PageHeader
          title={`${request.corporateName}님의 ${request.candidateName}님에 대한 의뢰`}
        />
      )}
      <div className="bg-white overflow-hidden">
        <div>
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
              <dt className="text-gray-500">의뢰 상태</dt>
              <dd className="text-gray-900 col-span-3">
                {request?.status && requestStatusMapper[request?.status]}
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
                {request?.deadline
                  ? new Date(request.deadline).toLocaleDateString()
                  : "없음"}
              </dd>
            </div>
            <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
              <dt className="text-gray-500">선정 답변</dt>
              <dd className="text-gray-900 col-span-3">
                {request?.rewardNum} 명
              </dd>
            </div>
            <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
              <dt className="text-gray-500">현재 답변</dt>
              <dd className="text-gray-900 col-span-3">
                {request?.receiverCount} 명
              </dd>
            </div>
            <div className="py-4 sm:py-6 grid grid-cols-4 gap-4 items-center text-md sm:text-lg font-medium">
              <dt className="text-gray-500">선정 보상금</dt>
              <dd className="text-gray-900 col-span-3">
                {request?.rewardAmount.toLocaleString()} 원
              </dd>
            </div>
            <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
              <dt className="text-gray-500">질문</dt>
              <dd className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3 border border-gray-200 rounded-md">
                {request?.question.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        {(receiverStatus === "received" || receiverStatus === "verified") && (
          <div className="flex gap-4">
            <Link
              to={`/request/reference/answer?requestId=${requestId}`}
              className="button"
            >
              답변하러 가기
            </Link>
            <button
              onClick={handleReject}
              className="button bg-red-500 hover:bg-red-700"
            >
              거절하기
            </button>
          </div>
        )}
        {receiverStatus === "rejected" && (
          <div className="w-full flex place-content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-lg font-medium text-gray-900 bg-gray-300">
            거절됨
          </div>
        )}
        {receiverStatus === "answered" && (
          <div className="w-full flex place-content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-lg font-medium text-gray-900 bg-gray-300">
            답변 완료
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestReferenceDetailReceiverView;
