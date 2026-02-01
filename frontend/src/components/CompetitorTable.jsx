import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const CompetitorTable = () => {
  const competitors = [
    { rank: 1, name: 'Your Brand', visibility: '75%', change: '+5%', status: 'up' },
    { rank: 2, name: 'Adobe Firefly', visibility: '57%', change: '+5%', status: 'up' },
    { rank: 3, name: 'Figma', visibility: '25%', change: '-2%', status: 'down' },
    { rank: 4, name: 'VistaCreate', visibility: '14%', change: '+3%', status: 'up' },
    { rank: 5, name: 'Piktochart', visibility: '6%', change: '-1%', status: 'down' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-6">AI Visibility Leaderboard</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <th className="pb-3">Brand</th>
            <th className="pb-3 text-right">Visibility</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {competitors.map((comp) => (
            <tr key={comp.rank} className="group hover:bg-gray-50 transition-colors">
              <td className="py-4 flex items-center">
                <span className="text-gray-400 font-mono w-6 text-sm">{comp.rank}</span>
                <div className={`w-2 h-2 rounded-full mr-3 ${comp.name.includes('Your') ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                <span className={`text-sm font-medium ${comp.name.includes('Your') ? 'text-indigo-900' : 'text-gray-700'}`}>{comp.name}</span>
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <span className={`text-xs font-medium ${comp.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>{comp.change}</span>
                  <span className="text-sm font-bold text-gray-900">{comp.visibility}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorTable;