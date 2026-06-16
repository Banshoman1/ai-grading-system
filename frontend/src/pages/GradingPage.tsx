import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import api from '../services/api';
import { GradingResult } from '../types';
import { getGradeColor, getPerformanceColor } from '../utils/formatting';
import toast from 'react-hot-toast';

const GradingPage: React.FC = () => {
  const [results, setResults] = useState<GradingResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await api.getResults();
      setResults(data);
    } catch (error) {
      toast.error('Failed to fetch grading results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading grading results...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Grading Results</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{results.length} results found</p>
      </div>

      {results.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto text-yellow-600 mb-3" size={32} />
          <p className="text-yellow-800 dark:text-yellow-200">No grading results yet. Submit answers for grading first.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                {/* Score */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Score</p>
                  <div className="text-3xl font-bold text-primary">{result.score}%</div>
                </div>

                {/* Grade */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Grade</p>
                  <div className={`text-3xl font-bold ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </div>
                </div>

                {/* Similarity */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Similarity</p>
                  <div className="text-3xl font-bold text-blue-600">{result.similarityScore}%</div>
                </div>

                {/* Performance */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Performance</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(result.performanceLevel)}`}>
                    {result.performanceLevel}
                  </p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Question</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{result.question}</p>
              </div>

              {/* Feedback */}
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">AI Feedback</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{result.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradingPage;