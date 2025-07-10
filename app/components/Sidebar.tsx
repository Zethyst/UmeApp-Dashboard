import React from "react";
import {
  Search,
  Bell,
  User,
  MoreHorizontal,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  MessageSquare,
  CreditCard,
  Settings,
  Eye,
  Blocks,
} from "lucide-react";

function Sidebar({ activeTab, setActiveTab, sidebarRef }: any) {
  const menuItems = [
    {
      icon: <Blocks className="w-5 h-5" />,
      label: "Dashboard",
      id: "dashboard",
    },
    { icon: <BookOpen className="w-5 h-5" />, label: "Courses", id: "courses" },
    { icon: <Users className="w-5 h-5" />, label: "Students", id: "students" },
    { icon: <User className="w-5 h-5" />, label: "Trainers", id: "trainers" },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Message",
      id: "message",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payment",
      id: "payment",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      id: "settings",
    },
  ];

  return (
    <div ref={sidebarRef} className="w-64 bg-[#5067bb] text-white h-screen fixed left-0 top-0 hidden lg:block">
      <div className="p-6 ">
        <div className="flex flex-col items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-[#bfd0ff] font-bold text-4xl">BB</span>
          </div>
          <span className="font-semibold text-xs">BB Institute</span>
        </div>
      </div>

      <nav className="mt-8 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-[85%] flex rounded-r-md my-1 items-center space-x-3 px-6 py-3 text-left hover:bg-white hover:text-[#5067bb] cursor-pointer transition-colors ${
              activeTab === item.id
                ? "bg-white text-[#5067bb]"
                : "text-white/90 hover:text-[#5067bb]"
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
