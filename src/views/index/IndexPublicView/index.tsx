import { ReactComponent as LandingReferencePCImage } from "@assets/images/landing_pc.svg";
import { ReactComponent as LandingReferenceMobileImage } from "@assets/images/landing_mobile.svg";
import { Link } from "react-router-dom";

const IndexPublicView = () => {
  return (
    <div className="mx-auto sm:max-w-6xl px-2 -mt-16 sm:mt-0 lg:mt-10">
      <div>
        <LandingReferencePCImage className="w-full hidden sm:block" />
        <LandingReferenceMobileImage className="w-full sm:hidden" />
      </div>

      <div className="sm:flex sm:gap-10 sm:px-10">
        <div className="sm:w-1/2 mt-10 sm:mt-20 bg-gray-100 rounded-md p-6 sm:p-10 flex flex-col justify-between gap-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold">
              지원자의 평판이 궁금하다면
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
              <div>
                평판 조회 동의부터 <br />
                함께 일했던 동료들의 정확한 평판까지 <br />
                무료로 자동화해보세요.
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-end">
              <Link
                to={"/guide/corporate"}
                className="font-medium text-md sm:text-lg text-gray-500 hover:text-cc-green underline"
              >
                기업 회원에 대해 자세히 알아보기
              </Link>
            </div>
            <Link to={"/auth/register/corporate"} className="button mt-6">
              기업 회원으로 가입하기
            </Link>
          </div>
        </div>

        <div className="sm:w-1/2 mt-10 sm:mt-20 bg-gray-100 rounded-md p-6 sm:p-10 flex flex-col justify-between gap-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold">
              함께 일했던 동료에 대해 <br />
              알려주고 싶다면
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
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
                className="font-medium text-md sm:text-lg text-gray-500 hover:text-cc-green underline"
              >
                평판 작성자에 대해 자세히 알아보기
              </Link>
            </div>
            <div className="flex justify-end">
              <Link
                to={"/guide/candidate"}
                className="font-medium text-md sm:text-lg text-gray-500 hover:text-cc-green underline"
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
