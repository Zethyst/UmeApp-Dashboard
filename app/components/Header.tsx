import React from "react";
import { Search, Bell, User } from "lucide-react";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Header() {
  return (
    <header className="bg-white  border-b px-6 py-4 ml-64">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <div className="flex items-center space-x-4">
          <div className="relative bg-gray-100 rounded-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-14 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md relative">
            <NotificationsIcon className="w-5 h-5 text-gray-800 " />
            <div className="absolute right-2.5 top-3 bg-red-500 rounded-full p-1"></div>
          </button>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 font-semibold">Vijayabala</span>
              <span className="text-xs text-gray-500 text-right">Admin</span>
            </div>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
