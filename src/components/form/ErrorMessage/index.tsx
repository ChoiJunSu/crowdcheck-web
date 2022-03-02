import { IErrorProps } from "@components/form/ErrorMessage/type";

const ErrorMessage = ({ message }: IErrorProps) => {
  return (
    <div className="block h-4 my-1">
      <p className="text-sm text-red-600 font-medium">{message}</p>
    </div>
  );
};

export default ErrorMessage;
