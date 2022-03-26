const GuideRefereePage = () => {
  return (
    <div className="sm:max-w-4xl mx-auto px-2">
      <h1 className="h1 mt-10">평판 제공자 가이드</h1>
      <div className="mt-10 flex flex-col gap-10">
        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">1. 개인 회원으로 가입</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            먼저 개인 회원으로 가입해주세요. <br />
            지원자의 요청을 받아 평판을 작성하러 오신 경우, 해당 지원자와 함께
            일했던 경력은 꼭 입력해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">2. 내 의뢰 확인</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            내 의뢰 목록을 확인합니다. <br />
            현재 평판 조회가 진행 중인 지원자와 겹치는 경력을 입력하셨다면,
            자동으로 해당 지원자에 대한 의뢰가 도착합니다. <br />
            도착한 의뢰의 상세보기 페이지로 이동해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">3. 경력 인증</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            의뢰에 답변하려면 우선 해당 지원자와 함께 일했던 경력에 대한 인증이
            필요합니다. <br />내 정보 메뉴로 이동하여 해당 경력의 인증하기
            버튼을 눌러 증빙서류를 업로드 해주세요. <br />
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">4. 지원자 전화번호 검증 및 답변</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            마지막으로 지원자의 전화번호로 지원자와의 관계를 검증합니다. <br />
            지원자의 전화번호를 정확하게 입력하신 경우 답변 페이지로 이동합니다.{" "}
            <br />
            작성하신 답변은 철저한 익명으로 전달됩니다. 또한 지원자는 답변
            내용을 조회할 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideRefereePage;
