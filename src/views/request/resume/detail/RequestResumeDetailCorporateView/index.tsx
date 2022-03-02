import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import {
  IRequestResumeAnswerCorporate,
  IRequestResumeDetailCorporate,
} from "@api/RequestApi/type";
import PageHeader from "@components/base/PageHeader";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import RangeSlider from "@components/form/RangeSlider";

const requestStatusMapper = {
  registered: "답변 대기 중",
  agreed: "",
  closed: "답변 선정 중",
  rewarded: "종료됨",
};

const RequestResumeDetailCorporateView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [request, setRequest] = useState<IRequestResumeDetailCorporate | null>(
    null
  );
  const [answerList, setAnswerList] = useState<
    Array<IRequestResumeAnswerCorporate>
  >([]);

  const updateRequest = useCallback(async () => {
    const requestResumeDetailCorporateResponse =
      await RequestApi.resumeDetailCorporate({
        requestId: parseInt(requestId!),
      });
    if (!requestResumeDetailCorporateResponse.ok) {
      alert(requestResumeDetailCorporateResponse.error);
      navigate(-1);
    }
    setRequest(requestResumeDetailCorporateResponse.request);
    setAnswerList(requestResumeDetailCorporateResponse.answers);
  }, []);

  useEffect(() => {
    if (!requestId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
    (async () => {
      await updateRequest();
    })();
  }, [requestId]);

  const handleRequestResumeClose = useCallback(async () => {
    if (!confirm("의뢰를 마감하시겠습니까?")) return;
    const requestResumeCloseResponse = await RequestApi.resumeClose({
      requestId: parseInt(requestId!),
    });
    if (!requestResumeCloseResponse.ok) {
      alert(requestResumeCloseResponse.error);
      return;
    }
    alert("의뢰가 마감되었습니다.");
    await updateRequest();
  }, []);

  const handleRequestResumeReward = useCallback(async () => {
    if (request?.status !== "closed") {
      alert("먼저 의뢰를 마감해주세요.");
      return;
    }
  }, []);

  return (
    <div className="mx-auto sm:max-w-4xl">
      {request?.memo && <PageHeader title={request.memo} />}
      <div className="bg-white overflow-hidden">
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

          <div className="py-4 sm:py-6">
            <h3 className="text-xl sm:text-2xl leading-6 font-medium text-gray-900">
              답변 목록
            </h3>
          </div>

          {answerList.map((answer, index) => (
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
                        {answer.receiverName}님의 답변
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
                  <Disclosure.Panel
                    as="dd"
                    className="mt-2 pl-2 pr-4 sm:pr-8 py-4 rounded-md"
                  >
                    <>
                      <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                        <label className="text-gray-500">직무 경험</label>
                        <div className="my-1 p-2 text-gray-900 col-span-3 border border-gray-200 rounded-md">
                          <RangeSlider
                            name="workExperience"
                            min={1}
                            max={10}
                            step={1}
                            value={answer.workExperience}
                          />
                          <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3">
                            {answer.workExperienceDescription
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

                      <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                        <label className="text-gray-500">업무 적합성</label>
                        <div className="my-1 p-2 text-gray-900 col-span-3 border border-gray-200 rounded-md">
                          <RangeSlider
                            name="workExperience"
                            min={1}
                            max={10}
                            step={1}
                            value={answer.roleFit}
                          />
                          <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3">
                            {answer.roleFitDescription
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

                      <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                        <label className="text-gray-500">협업 능력</label>
                        <div className="my-1 p-2 text-gray-900 col-span-3 border border-gray-200 rounded-md">
                          <RangeSlider
                            name="workExperience"
                            min={1}
                            max={10}
                            step={1}
                            value={answer.collaborationAbility}
                          />
                          <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3">
                            {answer.collaborationAbilityDescription
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

                      <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                        <label className="text-gray-500">성실성</label>
                        <div className="my-1 p-2 text-gray-900 col-span-3 border border-gray-200 rounded-md">
                          <RangeSlider
                            name="workExperience"
                            min={1}
                            max={10}
                            step={1}
                            value={answer.hardWorking}
                          />
                          <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3">
                            {answer.hardWorkingDescription
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

                      <div className="py-4 sm:py-6 sm:grid sm:grid-cols-4 sm:gap-4 items-center text-md sm:text-lg font-medium">
                        <label className="text-gray-500">적정 연봉</label>
                        <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3 border border-gray-200 rounded-md">
                          <div className="my-1 p-2 text-gray-900 sm:mt-0 sm:col-span-3">
                            {answer.recommendedSalary}
                          </div>
                        </div>
                      </div>
                    </>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>

        {request?.status !== "rewarded" && (
          <div className="mt-8 flex gap-4">
            {request?.status !== "closed" && (
              <button
                type="button"
                onClick={handleRequestResumeClose}
                className="button"
              >
                의뢰 마감하기
              </button>
            )}
            <Link
              to={`/request/resume/reward?requestId=${requestId}`}
              className="button"
            >
              답변 선정하러 가기
            </Link>
          </div>
        )}
        {request?.status === "rewarded" && (
          <div className="mt-8 w-full flex place-content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-lg font-medium text-gray-900 bg-gray-300">
            종료됨
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestResumeDetailCorporateView;
