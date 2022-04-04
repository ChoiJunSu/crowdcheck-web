const GuideCorporatePage = () => {
  return (
    <div className="sm:max-w-4xl mx-auto px-2">
      <h1 className="h1 mt-10">기업 회원 가이드</h1>
      <div className="mt-10 flex flex-col gap-10">
        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">1. 기업 회원 가입</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            기업 인증을 위해 사업자등록증을 준비해주세요. <br />
            전화번호는 카카오톡 또는 문자 인증을 진행할 수 있는 번호를
            입력해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">2. 의뢰 등록</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            의뢰 등록 메뉴에서 지원자의 이름과 전화번호를 입력해주세요. <br />
            이후의 평판 조회 동의와 평판 작성자 모집은 크라우드체크가
            진행합니다. <br />
            추가적으로 지원자의 사수 등 평판 조회를 원하는 대상이 있으실 경우
            해당 인원을 포함해달라고 지원자에게 전달해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">3. 답변 조회</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            내 의뢰 목록에서 각 의뢰의 답변 보기 페이지로 이동하면 작성된 답변을
            보실 수 있습니다. <br />
            평판 작성자는 지원자와 경력이 겹치며, 지원자의 전화번호를 알고 있는
            개인 회원입니다. <br />
            평판 작성자의 경력은 크라우드체크가 검증을 진행합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideCorporatePage;
