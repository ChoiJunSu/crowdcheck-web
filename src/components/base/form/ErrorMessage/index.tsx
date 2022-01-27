import { IErrorProps } from "@components/base/form/ErrorMessage/type";

const ErrorMessage = ({ message }: IErrorProps) => {
  return (
    <div className="block h-4 mt-1">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;
