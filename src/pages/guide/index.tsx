import { Link } from "react-router-dom";

const GuidePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-2 mt-6 sm:mt-10">
      <h1 className="h1">서비스 가이드</h1>
      <h2 className="h2 text-center mt-4 sm:mt-6">
        어떤 목적으로 방문하셨나요?
      </h2>

      <div className="lg:flex lg:gap-10 sm:px-10">
        <div className="lg:w-1/2 mt-10 sm:mt-20 shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              기업 회원
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
              지원자의 평판이 궁금하시다면
            </div>
          </div>
          <Link to={"/guide/corporate"} className="button">
            기업 회원 가이드
          </Link>
        </div>

        <div className="lg:w-1/2 mt-10 sm:mt-20 shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              평판 작성자
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
              평판 작성을 요청 받으셨거나
              <br /> 나중에 동료가 이직할 때 평판을 제공하고 싶으시다면
            </div>
          </div>
          <Link to={"/guide/referee"} className="button">
            평판 작성자 가이드
          </Link>
        </div>

        <div className="lg:w-1/2 mt-10 sm:mt-20 shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              지원자
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
              지원하신 기업에서 평판 조회 요청을 받으셨다면
            </div>
          </div>
          <Link to={"/guide/candidate"} className="button">
            지원자 가이드
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
