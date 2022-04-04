import { IPageHeaderProps } from "@components/base/PageHeader/type";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/outline";

const PageHeader = ({ title }: IPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
        className="inline-flex text-md sm:text-lg font-medium text-gray-500 hover:text-cc-green"
      >
        <ChevronLeftIcon className="self-center flex-shrink-0 sm:mr-2 h-6 sm:h-8 w-6 sm:w-8" />
      </button>
      <h3 className="my-4 sm:my-6 text-2xl sm:text-3xl leading-6 font-semibold text-gray-900">
        {title}
      </h3>
    </div>
  );
};

export default PageHeader;
