import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@components/form/ErrorMessage";

const PolicyField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="flex flex-col sm:text-lg">
        <div>
          <div className="mt-1 flex justify-between items-center gap-2">
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
          <div className="mt-1 flex justify-between items-center">
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
                {...register("termsAgree", { required: "동의가 필요합니다." })}
                className="w-full h-full text-cc-green border-gray-400 rounded focus:ring-cc-green"
              />
            </div>
          </div>
          <ErrorMessage message={errors.termsAgree?.message} />
        </div>
      </div>
    </div>
  );
};

export default PolicyField;
