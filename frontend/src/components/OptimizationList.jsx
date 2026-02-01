import React from 'react';
import { ArrowRight } from 'lucide-react';

const OptimizationList = ({ recommendations }) => {
  const items = recommendations.length > 0 ? recommendations : [
    "Improve visibility on 'marketing tools'",
    "Get cited on Forbes.com",
    "Optimize answers for 'AI platforms'"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Instant Optimization Suggestions</h3>
      <div className="space-y-3">
        {items.map((rec, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{typeof rec === 'string' ? rec : rec.text}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-600 rounded">High Impact</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded">Low Effort</span>
                </div>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center">
              Fix Now <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationList;