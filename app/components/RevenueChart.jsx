import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const RevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const revenueData = [
    { month: 'Sun', income: 876.00, expenses: 654.00, revenue: 1200.00 },
    { month: 'Mon', income: 1240.00, expenses: 890.00, revenue: 1450.00 },
    { month: 'Tue', income: 980.00, expenses: 720.00, revenue: 1650.00 },
    { month: 'Wed', income: 1450.00, expenses: 1100.00, revenue: 1800.00 },
    { month: 'Thu', income: 1200.00, expenses: 950.00, revenue: 1920.00 },
    { month: 'Fri', income: 1380.00, expenses: 1020.00, revenue: 2100.00 },
    { month: 'Sat', income: 1520.00, expenses: 1180.00, revenue: 2250.00 }
  ];

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'revenue' ? 'Revenue' : 
               entry.dataKey === 'income' ? 'Income' : 'Expenses'}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const periods = ['Week', 'Month', 'Quarter', 'Year'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Revenue</h2>
          <p className="text-sm text-gray-600">Income & Expenses Comparison</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="text-sm font-medium">{selectedPeriod}</span>
            <ChevronDown size={16} className="text-gray-600" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-24 bg-white border rounded-lg shadow-lg z-10">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                    selectedPeriod === period ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar 
            dataKey="income" 
            fill="#5067bb" 
            name="Income"
            radius={[2, 2, 0, 0]}
            barSize={40}
          />
          <Bar 
            dataKey="expenses" 
            fill="#be6988" 
            name="Expenses"
            radius={[2, 2, 0, 0]}
            barSize={40}
          />

          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#5067bb" 
            strokeWidth={2}
            dot={{ fill: '#5067bb', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#5067bb' }}
            name="Revenue"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center items-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pink-600 rounded-sm"></div>
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;