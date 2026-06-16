import React, { useState, useEffect } from 'react';
import { Download, Filter, Printer } from 'lucide-react';
import api from '../services/api';
import { GradingResult } from '../types';
import { formatDate, getGradeColor } from '../utils/formatting';
import toast from 'react-hot-toast';

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<GradingResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<GradingResult[]>([]);
  const [filterGrade, setFilterGrade] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    if (filterGrade === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter((r) => r.grade === filterGrade));
    }
  }, [filterGrade, results]);

  const fetchResults = async () => {
    try {
      const data = await api.getResults();
      setResults(data);
    } catch (error) {
      toast.error('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    // Simple PDF export simulation
    const content = filteredResults
      .map(
        (r) =>
          `Student ID: ${r.studentId}\nCourse: ${r.courseId}\nScore: ${r.score}%\nGrade: ${r.grade}\nFeedback: ${r.feedback}\n---\n`
      )
      .join('');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'results.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Results exported!');
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="text-center py-12">Loading results...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Results</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{filteredResults.length} results</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer size={18} />
            Print
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex items-center gap-4">
          <Filter size={20} className="text-gray-600 dark:text-gray-400" />
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Grades</option>
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
            <option value="D">Grade D</option>
            <option value="F">Grade F</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Course ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Grade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Similarity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{result.studentId}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{result.courseId}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{result.score}%</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{result.similarityScore}%</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {result.createdAt ? formatDate(result.createdAt) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;