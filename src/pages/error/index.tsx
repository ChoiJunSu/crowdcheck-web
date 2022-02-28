import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-5xl font-extrabold text-cc-green sm:text-8xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="mt-2 sm:border-l-2 sm:border-gray-300 sm:pl-6">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                페이지를 찾을 수 없습니다.
              </h1>
              <p className="mt-1 sm:mt-2 text-lg sm:text-xl text-gray-500">
                주소창를 확인하고 다시 시도해주세요.
              </p>
              <Link
                to="/"
                className="mt-4 sm:mt-6 inline-flex items-center px-4 py-2 border border-transparent text-md sm:text-lg font-medium rounded-md shadow-sm text-white bg-cc-green hover:bg-cc-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cc-green"
              >
                홈으로 돌아가기
              </Link>
            </div>
            <div className="pt-6 flex space-x-3 sm:border-l-2 sm:border-transparent sm:pl-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ErrorPage;
