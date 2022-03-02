import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IRequestResumeDetailExpert } from "@api/RequestApi/type";
import PageHeader from "@components/base/PageHeader";

const requestStatusMapper = {
  registered: "답변 대기 중",
  agreed: "",
  closed: "답변 선정 중",
  rewarded: "종료됨",
};

const RequestResumeDetailExpertView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [request, setRequest] = useState<IRequestResumeDetailExpert | null>(
    null
  );
  const [answered, setAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (!requestId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
    (async () => {
      const requestResumeDetailExpertResponse =
        await RequestApi.resumeDetailExpert({
          requestId: parseInt(requestId!),
        });
      if (!requestResumeDetailExpertResponse.ok) {
        alert(requestResumeDetailExpertResponse.error);
        navigate(-1);
      }
      setRequest(requestResumeDetailExpertResponse.request);
      setAnswered(requestResumeDetailExpertResponse.answered);
    })();
  }, [requestId]);

  return (
    <div className="mx-auto sm:max-w-4xl">
      {request?.corporateName && <PageHeader title={request.corporateName} />}
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
              <dt className="text-gray-500">참고사항</dt>
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
        {request?.status === "registered" && !answered && (
          <Link
            to={`/request/resume/answer?requestId=${request.id}`}
            className="button"
          >
            답변하러 가기
          </Link>
        )}
        {answered && (
          <div className="w-full flex place-content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-lg font-medium text-gray-900 bg-gray-300">
            답변 완료
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestResumeDetailExpertView;