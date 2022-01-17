import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestApi from "@api/RequestApi";
import { ICandidateRequest } from "@api/RequestApi/type";

const RequestListCandidateView = () => {
  const [requestList, setRequestList] = useState<Array<ICandidateRequest>>([]);
  const navigate = useNavigate();
  const requestStatusMapper = {
    registered: "동의를 기다리는 중",
    agreed: "평가를 기다리는 중",
    closed: "종료됨",
  };

  useEffect(() => {
    (async () => {
      const listCandidateResponse = await RequestApi.listCandidate({});
      if (!listCandidateResponse.ok) return;
      setRequestList(listCandidateResponse.request);
    })();
  }, []);

  const handleGetRequest = useCallback((id: number) => {
    navigate(`/request/agree?requestId=${id}`);
  }, []);

  return (
    <div>
      <h1>지원자 의뢰 목록 페이지</h1>
      <table>
        {requestList.length > 0 && (
          <thead>
            <tr>
              <th>기업이름</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
        )}
        {requestList.map(({ id, corporateName, status }, index) => {
          return (
            <tr key={index}>
              <td>{corporateName}</td>
              <td>{requestStatusMapper[status]}</td>
              <td>
                <button onClick={() => handleGetRequest(id)}>상세보기</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default RequestListCandidateView;
