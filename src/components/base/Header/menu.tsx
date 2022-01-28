import { Popover, Transition } from "@headlessui/react";
import {
  ClipboardIcon,
  MenuIcon,
  PencilAltIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Fragment, useCallback } from "react";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { IHeaderMenuProps } from "@components/base/Header/type";
import { ReactComponent as HeaderLogo } from "@assets/logo.svg";

const menuItems = {
  personal: [
    {
      icon: ClipboardIcon,
      text: "의뢰 목록",
      to: "/request/list",
    },
    {
      icon: UserIcon,
      text: "정보 수정",
      to: "/user/edit",
    },
  ],
  corporate: [
    {
      icon: ClipboardIcon,
      text: "의뢰 목록",
      to: "/request/list",
    },
    {
      icon: PencilAltIcon,
      text: "의뢰 등록",
      to: "/request/register",
    },
    {
      icon: UserIcon,
      text: "정보 수정",
      to: "/user/edit",
    },
  ],
  candidate: [
    {
      icon: ClipboardIcon,
      text: "의뢰 목록",
      to: "/request/list",
    },
  ],
};

const HeaderMenu = ({ type }: IHeaderMenuProps) => {
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginAtom);

  const handleLogout = useCallback(() => {
    setLoginState({
      isLoggedIn: false,
      authToken: null,
      name: null,
      type: null,
    });
    localStorage.removeItem(LOCAL_AUTH_TOKEN);
    navigate("/");
  }, []);

  return (
    <div>
      <div className="-mr-2 -my-2 md:hidden">
        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cc-green">
          <span className="sr-only">Open menu</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </Popover.Button>
      </div>
      <Popover.Group
        as="nav"
        className="hidden md:flex md:items-center space-x-10"
      >
        {menuItems[type].map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            {item.text}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="whitespace-nowrap inline-flex items-center justify-center px-2 md:px-4 py-1 md:py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cc-green hover:bg-cc-green"
        >
          로그아웃
        </button>
      </Popover.Group>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <HeaderLogo className="h-6 w-auto sm:h-7" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cc-green">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {menuItems[type].map((item, index) => (
                    <Popover.Button key={index}>
                      <Link
                        to={item.to}
                        className="group -m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <item.icon
                          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-400 group-hover:text-gray-500">
                          {item.text}
                        </span>
                      </Link>
                    </Popover.Button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cc-green hover:bg-cc-green"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </div>
  );
};

export default HeaderMenu;
