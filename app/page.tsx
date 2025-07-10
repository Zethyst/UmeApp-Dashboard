"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RevenueChart from "./components/RevenueChart";
import { MessageSquare } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import WebinarCard from "./components/WebinarCard";
import StudentTable from "./components/StudentTable";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const placementData = [
  { month: "Jan-Mar", studentsPlaced: 450, companiesVisited: 320 },
  { month: "Apr-Jun", studentsPlaced: 520, companiesVisited: 380 },
  { month: "Jul-Sep", studentsPlaced: 580, companiesVisited: 420 },
  { month: "Oct-Dec", studentsPlaced: 610, companiesVisited: 450 },
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

const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
    {children}
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const trainersRef = useRef<HTMLDivElement>(null);
  const graphBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const profileItems = Array.from(trainersRef.current?.children || []);
    gsap.set(profileItems, { x: 100, opacity: 0 });

    gsap.to(profileItems, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "bounce.out",
      stagger: {
        amount: 0.4,
        from: "start",
      },
    });
    const children = Array.from(asideRef.current?.children || []);
    gsap.set(children, { x: 100, opacity: 0 });

    gsap.to(children, {
      x: 0,
      opacity: 1,
      duration: 1.4,
      ease: "bounce.inOut",
      stagger: {
        amount: 0.5,
        from: "start",
      },
    });

    tl.from(sidebarRef.current, {
      x: -200,
      duration: 1,
      opacity: 0,
      ease: "power2.out",
      delay: 0.2,
    })
      .from(
        headerRef.current,
        {
          y: -100,
          duration: 0.8,
          opacity: 0,
          ease: "power2.out",
          delay: 0.1,
        },
        "<"
      )
      .from(
        asideRef.current,
        {
          x: 200,
          duration: 0.9,
          opacity: 0,
          ease: "power2.out",
          delay: 0.2,
        },
        "<"
      );

    const stats = Array.from(dataRef.current?.children || []);
    const graphs = Array.from(graphBoxRef.current?.children || []);

    gsap.set(stats, { opacity: 0, y: 200 });
    gsap.set(graphs, { opacity: 0, y: 200 });

    tl.to(
      stats,
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
      },
      "+=0.2"
    ).to(
      graphs,
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
      },
      "<"
    );

    gsap.from(studentRef.current, {
      y: 200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: studentRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      <Sidebar
        sidebarRef={sidebarRef}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Header headerRef={headerRef} />
      <div className="flex flex-col md:flex-row justify-center items-start">
        <main className="lg:ml-64 p-6 flex flex-col space-y-6 ">
          <Stats dataRef={dataRef} students={students} />

          <div
            ref={graphBoxRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          >
            <RevenueChart />
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
                  <Bar dataKey="studentsPlaced" fill="#5067bb" />
                  <Bar dataKey="companiesVisited" fill="#be6988 " />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div ref={studentRef} className="grid grid-cols-1 gap-6">
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
                <button className="px-2 lg:px-8 py-2 bg-[#5067bb] text-white rounded-l-4xl text-xs md:text-sm">
                  View all
                </button>
                <button className="px-2 lg:px-8 py-2 border text-gray-600  text-xs md:text-sm">
                  Enrolled
                </button>
                <button className="px-2 lg:px-8 py-2 border text-gray-600  text-xs md:text-sm">
                  Active now
                </button>
                <button className="px-2 lg:px-8 py-2 border text-gray-600 rounded-r-4xl text-xs md:text-sm">
                  Unenrolled
                </button>
              </div>

              <div className="overflow-x-auto">
                <StudentTable students={students} setStudents={setStudents} />
              </div>
            </Card>
          </div>
        </main>

        <aside ref={asideRef} className="space-y-6 mt-7 px-3 md:min-w-96">
          <div
            ref={trainersRef}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
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

            <div ref={trainersRef} className="space-y-2 mt-2">
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
          </div>

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
