import { useEffect, useState } from "react";
import RequestApi from "@api/RequestApi";
import { IReceiverRequest } from "@api/RequestApi/type";
import { Link } from "react-router-dom";

const RequestListReceiverView = () => {
  const [requestList, setRequestList] = useState<Array<IReceiverRequest>>([]);
  const receiverStatusMapper = {
    arrived: "답변을 기다리는 중",
    verified: "답변을 기다리는 중",
    rejected: "거절됨",
    answered: "답변 완료",
    closed: "종료됨",
  };

  useEffect(() => {
    (async () => {
      const listReceiverResponse = await RequestApi.listReceiver({});
      if (!listReceiverResponse.ok) return;
      setRequestList(listReceiverResponse.request);
    })();
  }, []);

  return (
    <div>
      <h1>의뢰 목록</h1>
      <ul>
        {requestList.map(
          ({ id, corporateName, candidateName, status }, index) => (
            <li key={index}>
              {corporateName}에서 {candidateName}님에 대한 의뢰 |{" "}
              {receiverStatusMapper[status]}
              {(status === "arrived" || status === "verified") && (
                <Link to={`/request/verify?requestId=${id}`}>답변하기</Link>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default RequestListReceiverView;
