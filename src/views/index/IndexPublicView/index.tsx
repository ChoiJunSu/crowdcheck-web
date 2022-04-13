import { ReactComponent as LandingReferencePCImage } from "@assets/images/landing_pc.svg";
import { ReactComponent as LandingReferenceMobileImage } from "@assets/images/landing_mobile.svg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const IndexPublicView = () => {
  return (
    <div className="mx-auto px-2">
      <div className="mt-4 sm:mt-10 flex flex-col lg:flex-row gap-4 justify-center">
        <h1 className="h1">간편하고 정확한</h1>
        <h1 className="h1 text-cc-green">온라인 평판 조회</h1>
      </div>

      <div className="sm:mt-20">
        <div className="lg:flex lg:gap-10 sm:px-10">
          <div className="mt-6 lg:w-1/2 items-center shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-start gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              간편하게 평판 조회
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 font-medium">
              지원자의 이름과 전화번호만 입력하면 끝<br />
              평판 조회 동의부터 평판 작성 요청까지
              <br />
              나머지는 크라우드체크가 알아서
            </p>
          </div>
          <div className="mt-6 lg:w-1/2 items-center shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-start gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              무료니까 부담 없이
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 font-medium">
              평판 조회 자동화는 완전 무료
              <br />
              어떤 직급이든 평판은 궁금하니까
            </p>
          </div>
          <div className="mt-6 lg:w-1/2 items-center shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-start gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              믿을 수 있는 진짜 평판
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 font-medium">
              지원자가 볼 수 없는 익명 평판
              <br />
              그러나 경력 검증은 철저하게
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-32 w-full sm:w-1/2 lg:w-1/3 mx-auto">
          <HashLink
            to="#start"
            className="w-full flex place-content-center py-2 sm:py-4 px-4 border border-transparent rounded-md shadow-sm text-xl sm:text-2xl font-semibold text-white bg-cc-green hover:bg-cc-green-dark"
          >
            지금 바로 시작하기
          </HashLink>
        </div>
      </div>

      <div className="mt-20 sm:mt-60">
        <h2 className="text-2xl sm:text-5xl font-semibold text-center mt-4 sm:mt-6">
          <span className="text-cc-green">크라우드체크</span>의 평판 조회
          프로세스
        </h2>
        <div className="-my-8 sm:my-0 lg:my-20">
          <LandingReferencePCImage className="w-full hidden sm:block" />
          <LandingReferenceMobileImage className="w-full sm:hidden" />
        </div>
      </div>

      <div id="start" className="lg:flex lg:gap-10 lg:px-10">
        <div className="mx-auto lg:w-2/5 mt-10 sm:mt-20 shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-between gap-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold">
              지원자의 평판이 궁금하다면
              <br />
              <br />
            </h2>
            <div className="-mt-6 sm:mt-6 flex items-center text-lg sm:text-2xl text-gray-500 font-medium">
              <div>
                함께 일했던 동료들의 진짜 평판을 <br />
                무료로 간편하게 확인해보세요.
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-end">
              <Link
                to={"/guide/corporate"}
                className="font-medium text-md sm:text-xl text-gray-500 hover:text-cc-green underline"
              >
                기업 회원에 대해 자세히 알아보기
              </Link>
            </div>
            <Link to={"/auth/register/corporate"} className="button mt-6">
              기업 회원으로 가입하기
            </Link>
          </div>
        </div>

        <div className="mx-auto lg:w-2/5 mt-10 sm:mt-20 shadow-md sm:shadow-lg rounded-md p-6 sm:p-10 flex flex-col justify-between gap-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold">
              함께 일했던 동료에 대해 <br />
              알려주고 싶다면
            </h2>
            <div className="mt-2 sm:mt-6 flex items-center text-lg sm:text-2xl text-gray-500 font-medium">
              <div>
                <p>
                  함께 일했던 동료에 대해 알려주세요. <br />
                  등록하신 경력을 기반으로 요청드리며 <br />
                  철저한 익명으로 전달됩니다.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <Link
                to={"/guide/referee"}
                className="font-medium text-md sm:text-xl text-gray-500 hover:text-cc-green underline"
              >
                평판 제공자에 대해 자세히 알아보기
              </Link>
            </div>
            <div className="flex justify-end">
              <Link
                to={"/guide/candidate"}
                className="font-medium text-md sm:text-xl text-gray-500 hover:text-cc-green underline"
              >
                지원자에 대해 자세히 알아보기
              </Link>
            </div>
            <Link to={"/auth/register/personal"} className="button mt-6">
              개인 회원으로 가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPublicView;
