import { IPageHeaderProps } from "@components/base/PageHeader/type";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/outline";

const PageHeader = ({ title }: IPageHeaderProps) => {
  return (
    <div className="flex gap-1">
      <Link
        to=".."
        className="inline-flex text-md sm:text-lg font-medium text-gray-500 hover:text-cc-green"
      >
        <ChevronLeftIcon className="self-center flex-shrink-0 sm:mr-2 h-6 sm:h-8 w-6 sm:w-8" />
      </Link>
      <h3 className="my-4 sm:my-6 text-2xl sm:text-3xl leading-6 font-semibold text-gray-900">
        {title}
      </h3>
    </div>
  );
};

export default PageHeader;
