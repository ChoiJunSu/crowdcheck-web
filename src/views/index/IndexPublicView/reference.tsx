import { Link } from "react-router-dom";
import { ReactComponent as LandingReferenceImage } from "@assets/images/landing_reference.svg";
import { ReactComponent as LandingReferenceMobileImage } from "@assets/images/landing_reference_mobile.svg";
import { ReactComponent as LandingResumeImage } from "@assets/images/landing_resume.svg";
import { ReactComponent as LandingResumeMobileImage } from "@assets/images/landing_resume_mobile.svg";

const IndexPublicReferenceView = () => {
  return (
    <div className="mx-auto max-w-6xl px-2 mt-6 sm:mt-10">
      <h1 className="text-2xl sm:text-4xl leading-8 text-center font-extrabold text-gray-900">
        간편하고 정확한{" "}
        <div className="inline sm:hidden">
          <br />
        </div>
        온라인 평판 조회
      </h1>

      <div className="mt-10 sm:mt-20">
        <LandingReferenceImage className="w-full hidden sm:block" />
        <LandingReferenceMobileImage className="w-full sm:hidden -my-32" />
      </div>

      <div className="sm:flex sm:gap-10 sm:px-10">
        <div className="sm:w-1/2 mt-10 sm:mt-20 bg-gray-100 rounded-md p-6 sm:p-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold">
              지원자의 평판이 궁금하다면
            </h2>
            <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
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
                기업 회원으로 가입하기
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:w-1/2 mt-10 sm:mt-20 bg-gray-100 rounded-md p-6 sm:p-10">
          <h2 className="text-xl sm:text-3xl font-bold">
            함께 일했던 동료에 대해 알려주고 싶다면
          </h2>
          <div className="mt-2 flex items-center text-lg sm:text-xl text-gray-500 font-medium">
            <div>
              <p>
                함께 일했던 동료에 대해 알려주세요. <br />
                온라인으로 간편하게 답변할 수 있습니다.
              </p>
            </div>
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

export default IndexPublicReferenceView;
