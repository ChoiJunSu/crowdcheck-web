const navItems = [
  { name: "이용약관" },
  { name: "개인정보처리방침" },
  { name: "문의하기" },
];

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto">
        <div className="py-10 bg-white border-t-2 border-gray-100 lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
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
          <div className={`mt-8 lg:mt-0 flex flex-row justify-around`}>
            {navItems.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-400">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
