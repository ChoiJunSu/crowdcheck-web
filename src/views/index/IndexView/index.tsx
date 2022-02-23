import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { Link } from "react-router-dom";
import { menuItems } from "@components/base/Header/menu";

const IndexView = () => {
  const { name, type } = useRecoilValue(loginAtom);

  return (
    <div className="mt-8">
      {type && (
        <div className="sm:max-w-xl mx-auto border border-gray-300 divide-y divide-gray-300 shadow-md rounded-md">
          {menuItems[type].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="grid grid-cols-3 place-items-center py-4 sm:py-6 text-lg sm:text-2xl text-gray-500 rounded-md group hover:bg-cc-green hover:text-white"
            >
              <item.icon className="col-span-1 w-8 sm:w-12 h-8 sm:h-12 mx-auto text-gray-500 group-hover:text-white" />
              <p className="col-span-2">{item.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndexView;
