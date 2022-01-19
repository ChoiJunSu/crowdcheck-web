import { useCallback, useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IReceiverRequest } from "@api/RequestApi/type";
import { Link } from "react-router-dom";

const RequestListReceiverView = () => {
  const [requestList, setRequestList] = useState<Array<IReceiverRequest>>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const receiverStatusMapper = {
    arrived: "답변을 기다리는 중",
    verified: "답변을 기다리는 중",
    rejected: "거절됨",
    answered: "답변 완료",
    closed: "종료됨",
  };

  const handleReject = useCallback(
    async (requestId: number) => {
      const rejectResponse = await RequestApi.reject({ requestId });
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
      const listReceiverResponse = await RequestApi.listReceiver({});
      if (!listReceiverResponse.ok) return;
      setRequestList(listReceiverResponse.requests);
    })();
  }, [update]);

  return (
    <div>
      <h1>의뢰 목록</h1>
      <ul>
        {requestList.map(
          ({ id, corporateName, candidateName, status }, index) => (
            <li key={index}>
              {corporateName}에서 {candidateName}님에 대한 의뢰 |{" "}
              {receiverStatusMapper[status]}
              {status === "arrived" && (
                <div>
                  <Link to={`/request/verify?requestId=${id}`}>답변하기</Link>
                  <button onClick={() => handleReject(id)}>거절하기</button>
                </div>
              )}
              {status === "verified" && (
                <div>
                  <Link to={`/request/answer?requestId=${id}`}>답변하기</Link>
                  <button onClick={() => handleReject(id)}>거절하기</button>
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default RequestListReceiverView;
