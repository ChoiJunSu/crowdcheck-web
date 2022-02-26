import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { Link } from "react-router-dom";
import { menuItems } from "@components/base/Header/menu";

const IndexView = () => {
  const { name, type } = useRecoilValue(loginAtom);

  return (
    <div className="mt-8">
      {type && (
        <div className="sm:max-w-md mx-auto border border-gray-300 divide-y divide-gray-300 shadow-md rounded-md">
          {menuItems[type].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="grid grid-cols-4 place-items-center py-4 sm:py-6 text-lg sm:text-2xl font-medium text-gray-500 rounded-md group hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="col-span-1 justify-self-end w-8 sm:w-12 h-8 sm:h-12" />
              <p className="col-span-3">{item.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndexView;
