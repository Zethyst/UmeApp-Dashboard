import React from "react";

const Card = ({ children, className = "" }: any) => (
  <div className={` rounded-lg shadow-md border p-6 ${className}`}>
    {children}
  </div>
);
const StatCard = ({ title, value, bgColor }: any) => (
  <Card className={`${bgColor} border-0`}>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm opacity-90">{title}</div>
  </Card>
);

function Stats({students}: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total User"
        value={students.length}
        bgColor="bg-[#e9f0fe]"
      />
      <StatCard
        title="Total Students"
        value={students.length}
        bgColor="bg-[#e0ffdb]"
      />
      <StatCard
        title="New Students"
        value="1001"
        bgColor="bg-[#f9d6db]"
      />
      <StatCard
        title="Trained Students"
        value="881"
        bgColor="bg-[#fcfed9]"
      />
    </div>
  );
}

export default Stats;
