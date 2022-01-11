import { IErrorProps } from "@components/base/form/ErrorMessage/type";

const ErrorMessage = ({ message }: IErrorProps) => {
  return (
    <div>
      <span className="text-red-600">{message}</span>
    </div>
  );
};

export default ErrorMessage;
