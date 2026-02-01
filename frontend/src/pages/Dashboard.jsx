import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, AlertCircle, Search } from 'lucide-react';
import StatCard from '../components/StatCard';
import CompetitorTable from '../components/CompetitorTable';
import OptimizationList from '../components/OptimizationList';

const Dashboard = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fake chart data to match Writesonic
  const historyData = [
    { name: 'Jul 22', you: 40, competitor: 65 },
    { name: 'Jul 23', you: 55, competitor: 62 },
    { name: 'Jul 24', you: 78, competitor: 68 },
    { name: 'Jul 25', you: 60, competitor: 70 },
    { name: 'Jul 26', you: 75, competitor: 72 },
    { name: 'Jul 27', you: 88, competitor: 75 },
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get('/projects'); 
        // Hackathon logic: find the project by ID from the list
        const found = response.data.data.find(p => p.id === id);
        setProject(found);
      } catch (err) {
        console.error("Error loading project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center text-indigo-600 font-bold">Loading Dashboard...</div>;
  if (!project) return <div className="p-10 text-center text-red-500">Project not found</div>;

  const analysis = project.Analysis?.recommendations || { score: 0, missing_topics: [], recommendations: [] };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-gray-500 mt-1">AI Search Analysis for: <span className="font-semibold text-indigo-600">{project.url}</span></p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition">Download Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Visibility" value={`${analysis.score}%`} change="+5%" trend="up" icon={Zap} />
        <StatCard title="Market Position" value="#1" change="Top Rank" trend="neutral" icon={TrendingUp} />
        <StatCard title="Citations" value="1,912" change="+592" trend="up" icon={AlertCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Visibility trends over time</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>You</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>Competitors</div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="you" stroke="#4F46E5" strokeWidth={3} dot={{r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="competitor" stroke="#D1D5DB" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-1">
          <CompetitorTable />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OptimizationList recommendations={analysis.recommendations} />
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">AI Conversation Preview</h3>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-64 overflow-y-auto">
             <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                  <Search className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-500 mb-1">USER QUERY</p>
                   <p className="text-sm font-medium text-gray-900">"{project.target_query}"</p>
                </div>
             </div>
             <div className="pl-11">
                <p className="text-xs font-bold text-gray-500 mb-1">AI RESPONSE</p>
                <div className="prose prose-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  {project.Analysis?.ai_response || "Waiting for AI..."}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;