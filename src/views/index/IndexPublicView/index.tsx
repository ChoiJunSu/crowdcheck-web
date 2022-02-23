import { Link } from "react-router-dom";

const IndexPublicView = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-6 sm:py-12 px-6 sm:px-10">
        <h1 className="text-2xl sm:text-4xl leading-6 font-extrabold text-gray-900">
          간편하고 정확한 온라인 평판 조회
        </h1>
      </div>

      <div className="bg-gray-100 rounded-md mt-6 sm:mt-10">
        <div className="max-w-2xl mx-auto py-6 sm:py-10 px-6 sm:px-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold">
              지원자의 평판이 궁금하다면
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-normal">
              <div>
                평판 조회 동의부터 이전 직장 동료들의 정확한 평판까지{" "}
                <div className="hidden sm:inline">
                  <br />
                </div>
                온라인으로 간편하게 받아보세요.
              </div>
            </div>
            <div className="mt-10">
              <Link to={"/auth/register/corporate"} className="button">
                기업회원으로 시작하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-md mt-6 sm:mt-10">
        <div className="max-w-2xl mx-auto py-6 sm:py-10 px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold">
            함께 일했던 동료에 대해 알려주고 싶다면
          </h2>
          <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-normal">
            <p>
              함께 일했던 동료에 대해 알려주세요. <br />
              온라인으로 간편하게 답변할 수 있습니다.
            </p>
          </div>
          <div className="mt-10">
            <Link to={"/auth/register/personal"} className="button">
              개인회원으로 시작하기
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-md mt-6 sm:mt-10">
        <div className="max-w-2xl mx-auto py-6 sm:py-10 px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold">
            함께했던 동료에게 평판을 요청하고 싶다면
          </h2>
          <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-normal">
            <p>
              이력보다 든든한 평판, 함께 일했던 동료들에게
              <br /> 온라인으로 간편하게 요청하세요.
            </p>
          </div>
          <div className="mt-10">
            <Link to={"/auth/register/personal"} className="button">
              개인회원으로 시작하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPublicView;
