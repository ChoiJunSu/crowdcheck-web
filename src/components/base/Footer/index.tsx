const navItems = [{ name: "이용약관" }, { name: "개인정보처리방침" }];

const Footer = () => {
  return (
    <footer
      className="bg-white border-t-2 border-gray-100"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="space-y-8">
          <p className="text-sm text-gray-400">
            (주)크라우드체크 | 대표 최준수
            <br />
            사업자등록번호: 597-86-02466
            <br />
            서울시 서대문구 연세로 50 공학원 212B호
            <br />
            <br />
            &copy; 2022 CrowdCheck Inc. All rights reserved.
          </p>
        </div>
        <div
          className={`mt-12 grid grid-cols-${navItems.length} gap-8 lg:mt-0`}
        >
          {navItems.map((item, index) => (
            <p key={index} className="text-sm text-gray-400">
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
