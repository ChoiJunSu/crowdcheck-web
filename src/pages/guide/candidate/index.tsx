const GuideCandidatePage = () => {
  return (
    <div className="sm:max-w-4xl mx-auto px-2">
      <h1 className="h1 mt-10">지원자 가이드</h1>
      <div className="mt-10 flex flex-col gap-10">
        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">1. 개인 회원으로 가입</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            먼저 개인 회원으로 가입해주세요. <br />
            경력 정보를 정확하게 입력해주셔야 이전 동료에게 평판 작성을 요청할
            수 있습니다.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">2. 평판 조회 요청 확인</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            평판 조회 요청 메뉴로 이동하시면 기업에서 등록한 평판 조회 의뢰
            목록을 확인하실 수 있습니다. <br />
            해당 의뢰의 동의하기 페이지로 이동해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">3. 평판 조회 동의</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            모든 평판 조회는 지원자 본인의 동의 후 진행됩니다. <br />
            현재 재직 중 등의 사유로 동의하기 어려운 경력은 제외하고 동의하실 수
            있습니다. <br />
            위의 경우 기업에서 참고할 수 있도록 비동의 사유를 입력해주세요.
          </p>
        </div>

        <div className="rounded-md p-6 sm:p-10 bg-gray-100">
          <h2 className="h2">4. 평판 작성 요청</h2>
          <p className="mt-2 sm:text-xl text-gray-900">
            기업에서 요청하였거나 지원자님께서 원하시는 평판 작성자를 모집하실
            수 있습니다. <br />
            평판 조회 요청 목록에서 동의가 완료된 의뢰에는 평판 작성 요청 문구
            복사하기 버튼이 표시됩니다. <br />
            해당 문구를 평판 작성자에게 전달해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideCandidatePage;
