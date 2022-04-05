const navItems = [
  {
    name: "이용약관",
    onClick: () => {
      location.href = "/terms";
    },
  },
  {
    name: "개인정보처리방침",
    onClick: () => {
      location.href = "/privacy";
    },
  },
  {
    name: "문의하기",
    onClick: () => {
      location.href = "mailto:dev.crowdcheck@gmail.com";
    },
  },
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
              서울시 구로구 디지털로 273 309호
              <br />
              사업자등록번호: 597-86-02466
              <br />
              전화번호: 070-4283-0275
              <br />
              <br />
              &copy; 2022 CrowdCheck Inc. All rights reserved.
            </p>
          </div>
          <div className={`mt-8 lg:mt-0 flex flex-row justify-around`}>
            {navItems.map((item, index) => (
              <div key={index}>
                <button
                  className="text-sm text-gray-400 hover:text-cc-green"
                  onClick={item.onClick}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
