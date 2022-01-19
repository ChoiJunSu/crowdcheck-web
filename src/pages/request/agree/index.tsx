import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  IRequestGetCandidateRequest,
  IRequestGetCandidateResponse,
} from "@api/RequestApi/type";
import { ICareer } from "@api/AuthApi/type";
import { useForm } from "react-hook-form";
import RequestApi from "@api/RequestApi";
import { IRequestAgreeFormDate } from "@pages/request/agree/type";

const RequestAgreePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");
  if (!requestId) {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [corporateName, setCorporateName] = useState<string>("");
  const [careerList, setCareerList] = useState<Array<ICareer>>([]);

  useEffect(() => {
    (async () => {
      const getRequestResponse: IRequestGetCandidateResponse =
        await RequestApi.getCandidate({
          requestId: parseInt(requestId as string),
        } as IRequestGetCandidateRequest);
      if (!getRequestResponse.ok) {
        alert("의뢰 정보가 없습니다.");
        navigate(-1);
      }
      setCorporateName(getRequestResponse.corporateName);
      setCareerList(getRequestResponse.careers);
    })();
  }, []);

  const { register, handleSubmit } = useForm<IRequestAgreeFormDate>();

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
      <h1>지원자 의뢰 조회 페이지</h1>
      {corporateName && <h2>{corporateName}의 의뢰</h2>}
      <form onSubmit={handleSubmit(handleAgree)}>
        <table>
          {careerList.length > 0 && (
            <thead>
              <tr>
                <th>기업이름</th>
                <th>부서</th>
                <th>입사일</th>
                <th>퇴사일</th>
                <th>선택</th>
              </tr>
            </thead>
          )}
          <tbody>
            {careerList.map(
              (
                { corporateId, corporateName, department, startAt, endAt },
                index
              ) => {
                return (
                  <tr key={index}>
                    <td>{corporateName}</td>
                    <td>{department}</td>
                    <td>{startAt}</td>
                    <td>{endAt}</td>
                    <td>
                      <input
                        type="text"
                        {...register(`agrees.${index}.corporateId`, {
                          value: corporateId,
                        })}
                        hidden
                      />
                      <input
                        type="checkbox"
                        {...register(`agrees.${index}.agreed`)}
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <label>비동의 사유</label>
        <input type="text" {...register("agreeDescription")} />
        <button type="submit">동의하기</button>
      </form>
    </div>
  );
};

export default RequestAgreePage;
