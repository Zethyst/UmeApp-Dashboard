"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

import {
  User,
  MoreHorizontal,
  Calendar,
  Clock,
  Eye,
  Blocks,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import WebinarCard from "./components/WebinarCard";
import StudentTable from "./components/StudentTable";

// Mock data for charts
const revenueData = [
  { month: "Jan", income: 85000, expenses: 72000 },
  { month: "Feb", income: 92000, expenses: 78000 },
  { month: "Mar", income: 78000, expenses: 65000 },
  { month: "Apr", income: 105000, expenses: 88000 },
  { month: "May", income: 95000, expenses: 82000 },
  { month: "Jun", income: 110000, expenses: 95000 },
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const placementData = [
  { month: "Jan-Mar", studentsPlaced: 450, companiesVisited: 320 },
  { month: "Apr-Jun", studentsPlaced: 520, companiesVisited: 380 },
  { month: "Jul-Sep", studentsPlaced: 580, companiesVisited: 420 },
  { month: "Oct-Dec", studentsPlaced: 610, companiesVisited: 450 },
];

const studentData = [
  {
    name: "Vijayabala",
    status: "Enrolled",
    course: "UI/UX Design",
    enrolled: "10/06/2023",
    progress: 85,
  },
  {
    name: "Praveen",
    status: "Enrolled",
    course: "Full Stack Development",
    enrolled: "10/06/2023",
    progress: 72,
  },
  {
    name: "Arjit",
    status: "Enrolled",
    course: "Front-End Development",
    enrolled: "07/06/2023",
    progress: 68,
  },
  {
    name: "Ajith",
    status: "Enrolled",
    course: "Back-End Development",
    enrolled: "25/05/2023",
    progress: 91,
  },
  {
    name: "Mandeep",
    status: "Enrolled",
    course: "UI/UX Design",
    enrolled: "20/05/2023",
    progress: 55,
  },
  {
    name: "Arjit",
    status: "Unenrolled",
    course: "Front-End Development",
    enrolled: "01/04/2023",
    progress: 0,
  },
];

const trainers = [
  { name: "Arjit", role: "Full Stack Developer", avatar: "👨‍💻" },
  { name: "Saranya", role: "Front-End Development", avatar: "👩‍💻" },
  { name: "Ravi", role: "UI/UX Designer", avatar: "👨‍🎨" },
  { name: "Saranya", role: "Front-End Development", avatar: "👩‍💻" },
];

const profiles = [
  {
    id: 1,
    name: "Annie",
    role: "Full Stack Developer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: 2,
    name: "Saranya",
    role: "FinTech Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: 3,
    name: "Mia",
    role: "UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: 4,
    name: "Saranya",
    role: "Front-End Developer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
  },
];

const courses = [
  {
    id: 1,
    name: "UI/UX Design",
    lessons: 25,
    avatar:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Full Stack Development",
    lessons: 30,
    avatar:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Front-End Development",
    lessons: 20,
    avatar:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=150&h=150&fit=crop&crop=center",
  },
];

// Card Component
const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
    {children}
  </div>
);

// Progress Bar Component
const ProgressBar = ({ progress }: any) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = () => {
    const today = new Date(currentDate);
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(firstDay.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };

  const weekDates = getWeekDates();
  const today = new Date();

  const isSelected = (date: Date) => {
    return weekDates.indexOf(date) === 3;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Header />
      <div className="flex justify-center items-start">
        <main className="ml-64 p-6 flex flex-col space-y-6 ">
          <Stats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Revenue</h3>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Income & Expenses Comparison
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="1"
                    stroke="#EF4444"
                    fill="#EF4444"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Placement Data Chart */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Placement Data</h3>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Placed Students: 1500
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={placementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="studentsPlaced" fill="#3B82F6" />
                  <Bar dataKey="companiesVisited" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Student Details Table */}
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold tracking-wide">
                  Student Details
                </h3>
                <button className="text-gray-600 text-sm hover:underline">
                  See all
                </button>
              </div>

              <div className="flex mb-4">
                <button className="px-8 py-2 bg-[#5067bb] text-white rounded-l-4xl text-sm">
                  View all
                </button>
                <button className="px-8 py-2 border text-gray-600  text-sm">
                  Enrolled
                </button>
                <button className="px-8 py-2 border text-gray-600  text-sm">
                  Active now
                </button>
                <button className="px-8 py-2 border text-gray-600 rounded-r-4xl text-sm">
                  Unenrolled
                </button>
              </div>

              <div className="overflow-x-auto">
                <StudentTable />
              </div>
            </Card>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="space-y-6 mt-7 px-3 min-w-96">
          <Card>
            <h3 className="text-lg font-bold mb-4">Active Trainers</h3>
            <div className="grid grid-cols-7 gap-1">
              {weekDates.map((date, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    {daysOfWeek[index]}
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors
                ${
                  isSelected(date)
                    ? "bg-[#5067bb] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-2">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-3 bg-[#eff3fb] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {profile.name}
                      </h3>
                      <p className="text-sm text-gray-600">{profile.role}</p>
                    </div>
                  </div>

                  <button className="p-2 bg-white rounded-md text-gray-400 hover:text-gray-600 transition-colors">
                    <MessageSquare size={20} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Active Courses</h3>
              <button className="text-gray-600 text-sm hover:underline">
                See all
              </button>
            </div>
            <div className="space-y-2 mt-2">
              {courses.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between px-2 py-3 bg-[#eff3fb] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">
                        {profile.name}
                      </h3>
                      <p className="text-[10px] text-gray-600">
                        {profile.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-xs hover:underline">
                    View More
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <WebinarCard />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
