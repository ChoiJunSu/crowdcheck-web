import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  IRequestResumeAnswerCorporate,
  IRequestResumeDetailCorporate,
} from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import PageHeader from "@components/base/PageHeader";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import RangeSlider from "@components/form/RangeSlider";
import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { useForm, useWatch } from "react-hook-form";
import { IRequestResumeRewardFormData } from "@pages/request/resume/reward/type";

const RequestResumeRewardPage = () => {
  const { type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [request, setRequest] = useState<IRequestResumeDetailCorporate | null>(
    null
  );
  const [answerList, setAnswerList] = useState<
    Array<IRequestResumeAnswerCorporate>
  >([]);
  const [leftRewardNum, setLeftRewardNum] = useState<number>(0);
  const { register, control, handleSubmit } =
    useForm<IRequestResumeRewardFormData>();
  const watchReceivers = useWatch({ control, name: "receivers" });

  useEffect(() => {
    if (!requestId || type !== "corporate") {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
    (async () => {
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
      setLeftRewardNum(requestResumeDetailCorporateResponse.request.rewardNum);
      if (requestResumeDetailCorporateResponse.request.status !== "closed") {
        alert("먼저 의뢰를 마감해주세요.");
        navigate(-1);
      }
    })();
  }, [requestId]);

  useEffect(() => {
    if (!request?.rewardNum || !watchReceivers) return;
    setLeftRewardNum(
      request.rewardNum -
        watchReceivers.reduce((prev, cur) => prev + (cur.checked ? 1 : 0), 0)
    );
  }, [request, leftRewardNum, watchReceivers]);

  const handleRequestResumeReward = useCallback(
    async (data: IRequestResumeRewardFormData) => {
      if (leftRewardNum < 0) {
        alert("선정하신 답변 수가 너무 많습니다.");
        return;
      } else if (
        leftRewardNum > 0 &&
        !confirm(
          "선정하실 수 있는 답변 수가 남았습니다. 이대로 확정하시겠습니까?"
        )
      )
        return;
      else if (!confirm("답변을 선정하시겠습니까?")) return;
      const receivers: Array<{ id: number }> = [];
      for (const { id, checked } of watchReceivers) {
        if (checked) receivers.push({ id });
      }
      const requestResumeRewardResponse = await RequestApi.resumeReward({
        requestId: parseInt(requestId!),
        receivers,
      });
      if (!requestResumeRewardResponse.ok) {
        alert(requestResumeRewardResponse.error);
        return;
      }
      alert("답변 선정이 완료되었습니다.");
      navigate(-1);
    },
    [leftRewardNum, watchReceivers]
  );

  return (
    <div className="mx-auto sm:max-w-4xl">
      <form onSubmit={handleSubmit(handleRequestResumeReward)}>
        {request?.memo && <PageHeader title={request.memo} />}
        <div className="bg-white overflow-hidden">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-6 flex justify-between">
              <h3 className="text-xl sm:text-2xl leading-6 font-medium text-gray-900">
                답변 목록
              </h3>
              <div className="text-md sm:text-xl font-medium text-gray-500">
                <span>남은 선정 답변</span>
                <span className="ml-2 text-cc-green">{leftRewardNum}</span>
              </div>
            </div>

            {answerList.map((answer, index) => (
              <Disclosure as="div" key={index} className="py-4 sm:py-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg sm:text-xl font-medium flex justify-between">
                      <span
                        className={`${
                          open ? "text-cc-green" : "text-gray-900"
                        }`}
                      >
                        {answer.receiverName}님의 답변
                      </span>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 h-5">
                          <input
                            type="checkbox"
                            {...register(`receivers.${index}.checked`)}
                            className="focus:ring-cc-green h-4 w-4 text-cc-green border-gray-300 rounded"
                          />
                          <input
                            defaultValue={answer.receiverId}
                            {...register(`receivers.${index}.id`)}
                            hidden
                          />
                          <span className="text-gray-900">선정</span>
                        </div>
                        <Disclosure.Button className="text-left">
                          <span className="ml-10 h-7 flex items-center">
                            <ChevronDownIcon
                              className={`${
                                open
                                  ? "-rotate-180 text-cc-green"
                                  : "rotate-0 text-gray-500"
                              } h-6 w-6 transform hover:text-cc-green`}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </div>
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

          <div className="mt-8 flex gap-4">
            <button type="submit" className="button">
              답변 선정하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestResumeRewardPage;
