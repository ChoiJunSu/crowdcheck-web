import { useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { ICorporateRequest } from "@api/RequestApi/type";
import { Link } from "react-router-dom";

const RequestListCorporateView = () => {
  const [requestList, setRequestList] = useState<Array<ICorporateRequest>>([]);
  const requestStatusMapper = {
    registered: "동의를 기다리는 중",
    agreed: "평가를 기다리는 중",
    closed: "종료됨",
  };

  useEffect(() => {
    (async () => {
      const listCorporateResponse = await RequestApi.listCorporate({});
      if (!listCorporateResponse.ok) return;
      setRequestList(listCorporateResponse.requests);
    })();
  }, []);

  return (
    <div>
      <h1>의뢰 목록</h1>
      <ul>
        {requestList.map(({ id, candidateName, status, receivers }, index) => (
          <li key={index}>
            {candidateName}님에 대한 의뢰 | {requestStatusMapper[status]}
            {status !== "registered" && (
              <Link to={`/request/answer?requestId=${id}`}>답변보기</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestListCorporateView;
