import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';
import { Search, Globe, ArrowRight, Loader2 } from 'lucide-react';

const ProjectSetup = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await createProject(url, query);
      if (data.success) {
        navigate(`/dashboard/${data.data.id}`);
      }
    } catch (err) {
      setError('Failed to start analysis. Check backend console.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Generative Engine Optimization</h2>
        <p className="text-gray-600 text-lg">See how AI search engines view your content compared to competitors.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Website URL</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="url" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Search Query</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="text" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., How to integrate payment gateway?" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg">
            {loading ? <><Loader2 className="animate-spin h-5 w-5" /><span>Initializing Engine...</span></> : <><span >Start Analysis</span><ArrowRight className="h-5 w-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectSetup;