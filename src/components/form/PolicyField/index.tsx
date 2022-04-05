import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@components/form/ErrorMessage";
import { IPolicyFieldProps } from "@components/form/PolicyField/type";

const PolicyField = ({ mode }: IPolicyFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {mode === "authRegister" && (
        <div className="flex flex-col sm:text-lg">
          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                <Link
                  to="/privacy"
                  target="_blank"
                  className="hover:text-cc-green underline"
                >
                  개인정보처리방침
                </Link>
                에 따른 개인정보 수집 및 이용에 동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("privacyAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.privacyAgree?.message} />
          </div>

          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                <Link
                  to="/terms"
                  target="_blank"
                  className="hover:text-cc-green underline"
                >
                  이용약관
                </Link>
                을 확인하였으며 이에 동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("termsAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.termsAgree?.message} />
          </div>

          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                입력하신 전화번호로 문자 또는 카카오톡 등의 수단을 통해 평판
                조회 서비스와 관련된 알림 수신에 동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("alarmAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.alarmAgree?.message} />
          </div>
        </div>
      )}

      {mode === "requestRegister" && (
        <div className="flex flex-col sm:text-lg">
          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                본 서비스를 통한 평판 조회 진행을 위해 지원자의 이름과
                전화번호를 제공하며, 가입 안내가 문자 또는 카카오톡 등의
                수단으로 전달됨을 지원자에게 고지하였습니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("candidateAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.candidateAgree?.message} />
          </div>

          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                평판 조회는 지원자가 개인 회원으로 가입하여 평판 조회 요청에
                동의한 후 진행되며, 지원자의 평판은 의뢰 등록일로부터 15일 동안
                제공됨을 확인하였습니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("expireAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.expireAgree?.message} />
          </div>

          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                지원자의 평판은 채용과 관련된 목적으로만 사용할 수 있으며,
                제3자에게 유출하는 등 부적절한 행위에 대한 책임은 모두 본인에게
                있습니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("purposeAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.purposeAgree?.message} />
          </div>
        </div>
      )}

      {mode === "agree" && (
        <div className="flex flex-col sm:text-lg">
          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                평판 조회 의뢰를 등록한 기업 회원에게 본인의 평판(업무능력,
                대인관계, 성격/인성, 이직사유 등)이 채용과 관련된 목적으로
                제공됨에 동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("expireAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.expireAgree?.message} />
          </div>

          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                평판 조회에 동의하신 경력에 대해 동일한 기업에 겹치는 기간 동안
                재직하였다고 등록한 임의의 개인 회원에게 이름, 전화번호, 함께
                재직했던 기업·부서명과 평판 작성 요청이 전달됨에
                동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("receiveAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.receiveAgree?.message} />
          </div>
        </div>
      )}

      {mode === "answer" && (
        <div className="flex flex-col sm:text-lg">
          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                작성하신 평판은 현재 진행 중인 의뢰를 포함하여 이후 해당
                지원자에 대한 평판 조회 의뢰가 진행될 때마다 의뢰를 등록한 기업
                회원에게 익명으로 제공됨에 동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("referenceAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.referenceAgree?.message} />
          </div>
        </div>
      )}

      {mode === "careerVerify" && (
        <div className="flex flex-col sm:text-lg">
          <div>
            <div className="mt-1 flex gap-8 justify-between items-center">
              <span>
                제공하신 자료를 경력 인증과 관련된 목적으로 활용함에
                동의합니다.(필수)
              </span>
              <div className="shrink-0 flex items-center h-5 w-5">
                <input
                  type="checkbox"
                  {...register("certificateAgree", {
                    required: "동의가 필요합니다.",
                  })}
                  className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
                />
              </div>
            </div>
            <ErrorMessage message={errors.certificateAgree?.message} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyField;
