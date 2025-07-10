import React from "react";
import { Clock, Calendar } from "lucide-react";

const WebinarCard = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 text-white overflow-hidden ">
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-8 left-4 w-8 h-8 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/2 right-0 w-12 h-12 bg-white/5 rounded-full"></div>

      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Webinar</h2>
          <p className="text-white/90 text-sm leading-relaxed">
            Turn Your IT Strategy Into a<br />
            Reality With Our Reliable
            <br />
            Blueprint
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-white/80" />
            <span className="text-sm text-white/90">45 Minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-white/80" />
            <span className="text-sm text-white/90">16 Jan 2024</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32"></div>

      <div className="absolute top-6 left-1/2 w-2 h-2 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-1/3 left-8 w-1 h-1 bg-white/30 rounded-full"></div>
    </div>
  );
};

export default WebinarCard;
