import { useCallback, useState } from "react";
import AuthApi from "@api/AuthApi";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@components/form/ErrorMessage";

const PhoneField = () => {
  const {
    register,
    getValues,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useFormContext();
  const [isPhoneSent, setIsPhoneSent] = useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  const handlePhoneSend = useCallback(async () => {
    const phone = getValues("phone");
    if (!phone) {
      setError("phone", {
        type: "required",
        message: "전화번호를 입력해주세요.",
      });
      return;
    }
    clearErrors();
    setIsPhoneSent(true);
    const phoneSendResponse = await AuthApi.phoneSend({ phone });
    if (!phoneSendResponse.ok) {
      alert(phoneSendResponse.error);
      setIsPhoneSent(false);
      return;
    }
    alert("인증번호가 발송되었습니다. 5분 안에 인증을 완료해주세요.");
    setFocus("code");
  }, []);

  const handlePhoneVerify = useCallback(async () => {
    const phone = getValues("phone");
    const code = getValues("code");
    if (!phone) {
      setError("phone", {
        type: "required",
        message: "전화번호를 입력해주세요.",
      });
      return;
    } else if (!isPhoneSent) {
      alert("인증번호 발송 버튼을 눌러주세요.");
      return;
    } else if (!code) {
      setError("code", {
        type: "required",
        message: "인증번호를 입력해주세요.",
      });
      return;
    }
    clearErrors();
    const phoneVerifyResponse = await AuthApi.phoneVerify({
      phone,
      code,
    });
    if (!phoneVerifyResponse.ok) {
      alert(phoneVerifyResponse.error);
      return;
    }
    setIsPhoneVerified(true);
    alert("성공적으로 인증되었습니다.");
  }, [isPhoneSent]);

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          {...register("phone", {
            required: "전화번호를 입력해주세요.",
            pattern: { value: /^\d*$/, message: "숫자만 입력해주세요." },
          })}
          placeholder="'-'를 제외한 숫자만 입력하세요."
          disabled={isPhoneSent}
          className="w-full sm:w-2/3 min-w-0 shrink focus:ring-cc-green focus:border-cc-green disabled:bg-gray-300 shadow-sm text-sm sm:text-lg rounded-md border-gray-300"
        />
        {!isPhoneSent && (
          <div className="ml-1 sm:ml-2 w-1/3 inline-flex justify-end sm:justify-start">
            <button
              type="button"
              onClick={handlePhoneSend}
              className="whitespace-nowrap inline-flex items-center justify-center px-2 py-2 border border-transparent rounded-md shadow-sm text-sm sm:text-lg font-medium text-white bg-cc-green hover:bg-cc-green-dark"
            >
              인증번호 받기
            </button>
          </div>
        )}
      </div>
      <ErrorMessage message={errors?.phone?.message} />
      {isPhoneSent && !isPhoneVerified && (
        <div className="sm:w-2/3">
          <div className="flex justify-between">
            <input
              type="text"
              {...register("code", {
                required: "인증번호를 입력해주세요.",
              })}
              disabled={isPhoneVerified}
              className="w-full shrink min-w-0 focus:ring-cc-green focus:border-cc-green shadow-sm text-sm sm:text-lg rounded-md border-gray-300"
            />
            <div className="sm:ml-2 w-1/3 flex justify-end">
              <button
                type="button"
                onClick={handlePhoneVerify}
                className="whitespace-nowrap inline-flex items-center justify-center px-2 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cc-green hover:bg-cc-green-dark"
              >
                인증하기
              </button>
            </div>
          </div>
          <ErrorMessage message={errors?.code?.message} />
        </div>
      )}
    </div>
  );
};

export default PhoneField;
