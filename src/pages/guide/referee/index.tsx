const GuideRefereePage = () => {
  return (
    <div className="sm:max-w-4xl mx-auto px-2">
      <h1 className="h1 mt-10">평판 작성자 가이드</h1>
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
          <h2 className="h2">2. 평판 작성 요청 확인</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            평판 작성 요청 메뉴에서 의뢰 목록을 확인합니다. <br />
            현재 평판 조회가 진행 중인 지원자와 겹치는 경력을 입력하셨다면,
            자동으로 해당 지원자에 대한 의뢰가 도착합니다. <br />
            도착한 의뢰의 답변하러 가기 페이지로 이동해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">3. 답변 전 검증</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            의뢰에 답변하려면 우선 검증이 필요합니다. <br />
            지원자의 전화번호와 해당 기업에서 재직한 사실을 증빙할 수 있는
            자료를 업로드 해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">4. 평판 작성</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            답변 전 검증을 성공적으로 완료하시면 평판 작성 페이지로 이동됩니다.{" "}
            <br />
            작성하신 평판은 철저한 익명으로 전달되며 지원자는 답변 내용을 조회할
            수 없습니다.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">5. 다른 동료에게 평판 작성 요청 (선택)</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            답변을 작성하신 후에는 지원자를 아는 다른 동료들에게도 알려주세요.{" "}
            <br />
            다른 동료가 내 추천인 코드를 입력하여 가입한 후 평판 작성을 완료하면
            보상이 지급됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideRefereePage;
