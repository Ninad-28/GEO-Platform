import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const StatCard = ({ title, value, change, trend = 'neutral', icon: Icon }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-50' : 'bg-gray-50'}`}>
          <Icon className={`w-6 h-6 ${trendColor}`} />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`flex items-center text-sm font-medium ${trendColor}`}>
          <TrendIcon className="w-4 h-4 mr-1" />
          {change}
        </span>
        <span className="text-gray-400 text-sm">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;