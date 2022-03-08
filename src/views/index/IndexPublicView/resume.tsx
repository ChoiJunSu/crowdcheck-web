import { Link } from "react-router-dom";
import { ReactComponent as LandingResumeImage } from "@assets/images/landing_resume.svg";
import { ReactComponent as LandingResumeMobileImage } from "@assets/images/landing_resume_mobile.svg";

const IndexPublicResumeView = () => {
  return (
    <div className="mx-auto max-w-6xl px-2 mt-6 sm:mt-10">
      <h1 className="text-2xl sm:text-4xl leading-8 text-center font-extrabold text-gray-900">
        간편하고 정확한{" "}
        <div className="inline sm:hidden">
          <br />
        </div>
        온라인 이력서 검토
      </h1>

      <div className="mt-10 sm:mt-20">
        <LandingResumeImage className="w-full hidden sm:block" />
        <LandingResumeMobileImage className="w-full sm:hidden -my-32" />
      </div>

      <div className="sm:flex sm:gap-10 sm:px-10">
        <div className="sm:w-1/2 mt-10 sm:mt-20 bg-gray-100 rounded-md p-6 sm:p-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold">
              지원자의 이력서를 검토받고 싶다면
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
              <div>
                여러 전문가의 체계적인 평가를
                <br />
                온라인으로 빠르고 간편하게 받아보세요.
              </div>
            </div>
            <div className="mt-10">
              <Link to={"/auth/register/corporate"} className="button">
                기업 회원으로 가입하기
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:w-1/2 mt-10 sm:mt-20 bg-gray-100 rounded-md p-6 sm:p-10">
          <h2 className="text-xl sm:text-3xl font-bold">
            이력서를 검토할 수 있는 경력자라면
          </h2>
          <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
            <div>
              온라인으로 간편하게 평가해주세요.
              <br />
              답변이 채택되면 보상금을 수령하실 수 있습니다.
            </div>
          </div>
          <div className="mt-10">
            <Link to={"/auth/register/expert"} className="button">
              전문가 회원으로 가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPublicResumeView;
