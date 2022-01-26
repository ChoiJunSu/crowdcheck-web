import { useCallback, useState } from "react";
import AuthApi from "@api/AuthApi";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@components/base/form/ErrorMessage";

const PhoneField = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [isPhoneSent, setIsPhoneSent] = useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  const handlePhoneSend = useCallback(async () => {
    const phone = getValues("phone");
    if (!phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    setIsPhoneSent(true);
    const phoneSendResponse = await AuthApi.phoneSend({ phone });
    if (!phoneSendResponse.ok) {
      alert(phoneSendResponse.error);
      return;
    }
    alert("인증번호가 발송되었습니다. 5분 안에 인증을 완료해주세요.");
  }, []);

  const handlePhoneVerify = useCallback(async () => {
    const phone = getValues("phone");
    const code = getValues("code");
    if (!phone) {
      alert("전화번호를 입력해주세요.");
      return;
    } else if (!isPhoneSent) {
      alert("인증번호 발송 버튼을 눌러주세요.");
      return;
    } else if (!code) {
      alert("인증번호를 입력해주세요.");
      return;
    }
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
      <input
        type="text"
        {...register("phone", {
          required: "전화번호를 입력해주세요.",
          pattern: { value: /^\d*$/, message: "숫자만 입력해주세요." },
        })}
        placeholder="'-'를 제외한 숫자만 입력하세요."
        disabled={isPhoneSent}
      />
      {!isPhoneSent && (
        <button type="button" onClick={handlePhoneSend}>
          인증번호 받기
        </button>
      )}
      <br />
      <ErrorMessage message={errors?.phone?.message} />
      <br />
      {isPhoneSent && !isPhoneVerified && (
        <div>
          <input
            type="text"
            {...register("code", {
              required: "인증번호를 입력해주세요.",
            })}
            disabled={isPhoneVerified}
          />
          <button type="button" onClick={handlePhoneVerify}>
            인증하기
          </button>
          <br />
        </div>
      )}
    </div>
  );
};

export default PhoneField;
