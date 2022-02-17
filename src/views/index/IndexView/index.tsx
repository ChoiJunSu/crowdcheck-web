import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { Link } from "react-router-dom";
import { menuItems } from "@components/base/Header/menu";

const IndexView = () => {
  const { name, type } = useRecoilValue(loginAtom);

  return (
    <div>
      <div className="max-w-lg mx-auto py-6 sm:py-10 sm:px-12">
        <h2 className="ml-2 sm:ml-0 text-xl sm:text-2xl leading-6 font-bold text-gray-900">
          어서오세요 {name}님
        </h2>
      </div>

      {type && (
        <div className="sm:w-1/2 mx-auto border border-gray-300 divide-y divide-gray-300 shadow-md rounded-md">
          {menuItems[type].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex place-content-center py-4 sm:py-6 gap-6 sm:gap-10 text-lg sm:text-2xl text-gray-500 rounded-md group hover:bg-cc-green hover:text-white"
            >
              <item.icon className="w-8 sm:w-12 h-8 sm:h-12 text-gray-500 group-hover:text-white" />
              <p className="self-center">{item.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndexView;
