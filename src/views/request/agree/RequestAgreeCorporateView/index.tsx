import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IAgree, IRequestGetCandidateRequest } from "@api/RequestApi/type";
import RequestApi from "@api/RequestApi";
import { FormProvider, useForm } from "react-hook-form";
import { IRequestAgreeFormDate } from "@views/request/agree/RequestAgreeCandidateView/type";
import { ChatAlt2Icon, CheckCircleIcon } from "@heroicons/react/outline";

const RequestAgreeCorporateView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [candidateName, setCandidateName] = useState<string>("");
  const [agreeList, setAgreeList] = useState<Array<IAgree>>([]);
  const methods = useForm<IRequestAgreeFormDate>();
  const { register, handleSubmit, setValue } = methods;

  useEffect(() => {
    (async () => {
      const getRequestResponse = await RequestApi.getCorporateAgree({
        requestId: parseInt(requestId as string),
      } as IRequestGetCandidateRequest);
      if (!getRequestResponse.ok) {
        alert(getRequestResponse.error);
        navigate(-1);
      }
      setCandidateName(getRequestResponse.candidateName);
      setAgreeList(getRequestResponse.agrees);
      setValue("agreeDescription", getRequestResponse.agreeDescription);
    })();
  }, []);

  const handleAgree = useCallback(async (data) => {
    const agreeResponse = await RequestApi.agree({
      ...data,
      requestId,
    });
    if (!agreeResponse.ok) {
      alert(agreeResponse.error);
      return;
    }
    alert("의뢰 동의가 완료되었습니다.");
    navigate("/request/list");
  }, []);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAgree)} className="form">
          <div className="my-4">
            {candidateName && (
              <h2 className="text-xl leading-6 font-medium text-gray-900">
                {candidateName}님에 대한 의뢰
              </h2>
            )}
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                동의 정보
              </h3>
            </div>
            <div className="mt-4">
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
                              동의 여부
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {agreeList.map(({ corporateName, agreed }, index) => (
                            <tr key={index} className="text-center">
                              <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-normal text-gray-900">
                                {corporateName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-lg font-normal text-gray-500">
                                {agreed ? "동의 완료" : "비동의"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                비동의 사유
              </h3>
            </div>
            <div className="mt-4">
              <textarea
                {...register("agreeDescription")}
                rows={10}
                placeholder="입력된 비동의 사유가 없습니다."
                className="input"
                disabled={true}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RequestAgreeCorporateView;
