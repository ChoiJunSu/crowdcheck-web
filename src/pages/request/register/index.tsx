import { useState } from "react";
import { TRequestType } from "@api/RequestApi/type";
import RequestRegisterReferenceView from "@views/request/register/RequestRegisterReferenceView";

const RequestRegisterPage = () => {
  const [mode, setMode] = useState<TRequestType>("reference");

  return <div>{mode === "reference" && <RequestRegisterReferenceView />}</div>;
};

export default RequestRegisterPage;
