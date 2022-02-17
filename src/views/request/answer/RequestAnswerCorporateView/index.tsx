import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IAnswer } from "@api/RequestApi/type";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const RequestAnswerCorporateView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [candidateName, setCandidateName] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answerList, setAnswerList] = useState<Array<IAnswer>>([]);
  const receiverStatusMapper = {
    arrived: "답변을 기다리는 중",
    verified: "답변을 기다리는 중",
    rejected: "거절됨",
    answered: "답변 완료",
    closed: "종료됨",
  };

  useEffect(() => {
    (async () => {
      const getCorporateResponse = await RequestApi.getCorporate({
        requestId: parseInt(requestId!),
      });
      if (!getCorporateResponse.ok) {
        alert(getCorporateResponse.error);
        return;
      }
      setCandidateName(getCorporateResponse.candidateName);
      setQuestion(getCorporateResponse.question);
      setAnswerList(getCorporateResponse.answers);
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl leading-6 font-bold text-gray-900">
            {candidateName}님에 대한 의뢰
          </h2>
          <div className="mt-4">
            <label className="label">질문</label>
            <p className="mt-2 pl-2 pr-12 py-4 bg-gray-100 rounded-md text-base text-gray-900">
              {question}
            </p>
          </div>
        </div>
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {answerList.map(({ id, corporateName, status, answer }, index) => (
            <Disclosure as="div" key={index} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                      <div>
                        <span className="block font-medium text-gray-900">
                          {corporateName}에서 함께 일한 {id}님
                        </span>
                        <span className="text-sm text-gray-500">
                          {receiverStatusMapper[status]}
                        </span>
                      </div>
                      {status === "answered" && (
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={`${open ? "-rotate-180" : "rotate-0"}
                                  "h-6 w-6 transform"`}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel
                    as="dd"
                    className="mt-2 pl-2 pr-12 py-4 bg-gray-100 rounded-md"
                  >
                    <p className="text-base text-gray-900">{answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default RequestAnswerCorporateView;
